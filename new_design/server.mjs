import http from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PORT = Number(process.env.PORT || 8771);
const ROOT = path.dirname(fileURLToPath(import.meta.url));
const sessions = new Map();
const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const rates = new Set([0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]);

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.json': 'application/json; charset=utf-8',
};

function lanHost() {
  const found = [];
  for (const list of Object.values(os.networkInterfaces())) {
    for (const net of list || []) {
      if (net.family === 'IPv4' && !net.internal) found.push(net.address);
    }
  }
  found.sort((a, b) => Number(b.startsWith('192.168.') || b.startsWith('10.')) - Number(a.startsWith('192.168.') || a.startsWith('10.')));
  return found[0] || '127.0.0.1';
}

function makeCode() {
  let code = '';
  for (let i = 0; i < 4; i += 1) code += alphabet[Math.floor(Math.random() * alphabet.length)];
  return sessions.has(code) ? makeCode() : code;
}

function sendJson(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'content-length': Buffer.byteLength(payload),
  });
  res.end(payload);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > 4096) {
        reject(new Error('too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      if (!chunks.length) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
      } catch {
        reject(new Error('invalid json'));
      }
    });
    req.on('error', reject);
  });
}

function presence(session) {
  let display = 0;
  let remotes = 0;
  for (const client of session.clients) {
    if (client.role === 'display') display += 1;
    else remotes += 1;
  }
  return { display, remotes };
}

function broadcast(session, event, data) {
  const frame = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const client of session.clients) client.res.write(frame);
}

function sanitize(command) {
  if (!command || typeof command !== 'object') return null;
  if (command.type === 'toggle' || command.type === 'play' || command.type === 'pause' || command.type === 'mute') {
    return { type: command.type };
  }
  if (command.type === 'end') return { type: 'pause' };
  if (command.type === 'seekBy') {
    const delta = Number(command.delta);
    if (!Number.isFinite(delta) || Math.abs(delta) > 120) return null;
    return { type: 'seekBy', delta };
  }
  if (command.type === 'seekTo') {
    const seconds = Number(command.seconds);
    if (!Number.isFinite(seconds) || seconds < 0 || seconds > 21600) return null;
    return { type: 'seekTo', seconds };
  }
  if (command.type === 'setRate') {
    const rate = Number(command.rate);
    if (!rates.has(rate)) return null;
    return { type: 'setRate', rate };
  }
  if (command.type === 'setVolume') {
    const volume = Math.round(Number(command.volume));
    if (!Number.isFinite(volume) || volume < 0 || volume > 100) return null;
    return { type: 'setVolume', volume };
  }
  if (command.type === 'load') {
    const videoId = String(command.videoId || '');
    if (!/^[A-Za-z0-9_-]{11}$/.test(videoId)) return null;
    const start = Number(command.start) || 0;
    if (!Number.isFinite(start) || start < 0 || start > 21600) return null;
    return { type: 'load', videoId, start, play: Boolean(command.play) };
  }
  if (command.type === 'captions') return { type: 'captions', on: Boolean(command.on) };
  return null;
}

function serveStatic(req, res, url) {
  const requested = decodeURIComponent(url.pathname);
  const relative = requested === '/' ? '/today/code.html' : requested;
  const filePath = path.normalize(path.join(ROOT, relative));
  if (!filePath.startsWith(ROOT)) {
    sendJson(res, 403, { error: 'forbidden' });
    return;
  }
  fs.readFile(filePath, (error, data) => {
    if (error) {
      sendJson(res, 404, { error: 'not found' });
      return;
    }
    res.writeHead(200, {
      'content-type': types[path.extname(filePath)] || 'application/octet-stream',
      'cache-control': 'no-store',
    });
    res.end(data);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || '127.0.0.1'}`);

  if (req.method === 'POST' && url.pathname === '/api/session') {
    const code = makeCode();
    sessions.set(code, { clients: new Set(), state: null, created: Date.now() });
    sendJson(res, 201, { code, host: lanHost(), port: PORT });
    return;
  }

  const sessionMatch = url.pathname.match(/^\/api\/session\/([A-Z0-9]{4})$/);
  if (req.method === 'GET' && sessionMatch) {
    const session = sessions.get(sessionMatch[1]);
    if (!session) {
      sendJson(res, 404, { error: 'session not found' });
      return;
    }
    sendJson(res, 200, { code: sessionMatch[1], ...presence(session) });
    return;
  }

  const eventsMatch = url.pathname.match(/^\/api\/session\/([A-Z0-9]{4})\/events$/);
  if (req.method === 'GET' && eventsMatch) {
    const session = sessions.get(eventsMatch[1]);
    if (!session) {
      sendJson(res, 404, { error: 'session not found' });
      return;
    }
    const role = url.searchParams.get('role') === 'display' ? 'display' : 'remote';
    res.writeHead(200, {
      'content-type': 'text/event-stream',
      'cache-control': 'no-store',
      connection: 'keep-alive',
    });
    const client = { res, role };
    session.clients.add(client);
    const snapshot = presence(session);
    broadcast(session, 'presence', snapshot);
    if (session.state) res.write(`event: state\ndata: ${JSON.stringify(session.state)}\n\n`);
    const heartbeat = setInterval(() => res.write(': ping\n\n'), 15000);
    req.on('close', () => {
      clearInterval(heartbeat);
      session.clients.delete(client);
      broadcast(session, 'presence', presence(session));
    });
    return;
  }

  const commandMatch = url.pathname.match(/^\/api\/session\/([A-Z0-9]{4})\/command$/);
  if (req.method === 'POST' && commandMatch) {
    const session = sessions.get(commandMatch[1]);
    if (!session) {
      sendJson(res, 404, { error: 'session not found' });
      return;
    }
    try {
      const command = sanitize(await readBody(req));
      if (!command) {
        sendJson(res, 400, { error: 'invalid command' });
        return;
      }
      broadcast(session, 'command', command);
      sendJson(res, 202, { ok: true });
    } catch {
      sendJson(res, 400, { error: 'invalid command' });
    }
    return;
  }

  const stateMatch = url.pathname.match(/^\/api\/session\/([A-Z0-9]{4})\/state$/);
  if (req.method === 'POST' && stateMatch) {
    const session = sessions.get(stateMatch[1]);
    if (!session) {
      sendJson(res, 404, { error: 'session not found' });
      return;
    }
    try {
      const state = await readBody(req);
      const videoId = String(state.videoId || '');
      session.state = {
        t: Number(state.t) || 0,
        duration: Number(state.duration) || 0,
        playing: Boolean(state.playing),
        rate: Number(state.rate) || 1,
        muted: Boolean(state.muted),
        volume: Number.isFinite(Number(state.volume)) ? Number(state.volume) : 100,
        captions: Boolean(state.captions),
        videoId: /^[A-Za-z0-9_-]{11}$/.test(videoId) ? videoId : '',
      };
      broadcast(session, 'state', session.state);
      sendJson(res, 200, { ok: true });
    } catch {
      sendJson(res, 400, { error: 'invalid state' });
    }
    return;
  }

  if (req.method === 'GET') {
    serveStatic(req, res, url);
    return;
  }

  sendJson(res, 405, { error: 'method not allowed' });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Player preview at http://127.0.0.1:${PORT}/workout_player/code.html`);
  console.log(`Phone link host ${lanHost()}:${PORT}`);
});

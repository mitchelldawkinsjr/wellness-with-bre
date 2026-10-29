var playPauseIcon = document.getElementById("play-pause-icon");
var workoutPlayer = null;
var index = 0;
var captionsOn = false;
var queueFilter = "all";
var pending = null;
var events = null;
var knownDuration = 0;
var dragging = false;
var volumeDragging = false;
var remoteOnline = false;
var displayOnline = false;

var params = new URLSearchParams(location.search);
var remoteCode = (params.get("remote") || "").toUpperCase();
var ROLE = /^[A-Z0-9]{4}$/.test(remoteCode) ? "remote" : "display";
var sessionCode = ROLE === "remote" ? remoteCode : "";

(function () {
  var requested = params.get("v");
  if (!requested) return;
  for (var i = 0; i < WWB.videos.length; i++) {
    if (WWB.videos[i].id === requested) { index = i; return; }
  }
})();

function current() { return WWB.videos[index]; }

function formatClock(seconds) {
  var total = Math.max(0, Math.floor(seconds || 0));
  var hours = Math.floor(total / 3600);
  var mins = Math.floor((total % 3600) / 60);
  var secs = total % 60;
  if (hours) return hours + ":" + String(mins).padStart(2, "0") + ":" + String(secs).padStart(2, "0");
  return String(mins).padStart(2, "0") + ":" + String(secs).padStart(2, "0");
}

function parseClock(value) {
  var parts = String(value || "").split(":").map(Number);
  if (parts.some(function (part) { return !Number.isFinite(part); })) return 0;
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return 0;
}

function escapeHtml(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

function playerReady() {
  return Boolean(workoutPlayer && typeof workoutPlayer.getPlayerState === "function");
}

function chaptersFor() {
  var chapters = current().chapters || [];
  return chapters.length > 1 ? chapters : [];
}

function chapterIndex(elapsed) {
  var chapters = chaptersFor();
  var active = 0;
  chapters.forEach(function (chapter, chapterIndex) {
    if (elapsed + 0.25 >= chapter.start) active = chapterIndex;
  });
  return active;
}

function paintChapters() {
  var row = document.getElementById("chapter-row");
  var skip = document.getElementById("chapter-skip");
  var chapters = chaptersFor();
  if (!chapters.length) {
    row.className = "hidden";
    row.innerHTML = "";
    skip.className = "hidden";
    document.getElementById("chapter-label").textContent = "";
    return;
  }
  skip.className = "flex items-center gap-2 pt-1";
  row.className = "flex flex-wrap gap-2 pt-1";
  row.innerHTML = chapters.map(function (chapter) {
    return '<button type="button" data-start="' + chapter.start + '" class="chapter-chip px-3 py-2 rounded-full font-label-sm text-label-sm bg-surface-container text-on-surface-variant">' + escapeHtml(chapter.title) + "</button>";
  }).join("");
}

function paintMeta() {
  var video = current();
  document.getElementById("now-title").textContent = video.title;
  document.getElementById("now-kind").textContent = WWB.categoryLabel(video.category) + (video.start ? " · starts at 8:22" : "");
  document.getElementById("remote-title").textContent = video.title;
  var open = document.getElementById("open-youtube-btn");
  open.href = "https://www.youtube.com/watch?v=" + encodeURIComponent(video.id) + (video.start ? "&t=" + video.start : "");
  var save = document.getElementById("favorite-cue-btn");
  var saved = WWB.isSaved(video.id);
  save.classList.toggle("text-primary", saved);
  save.classList.toggle("text-secondary", !saved);
  document.querySelectorAll("[data-video-id]").forEach(function (el) {
    var on = el.getAttribute("data-video-id") === video.id;
    el.classList.toggle("ring-2", on);
    el.classList.toggle("ring-primary", on);
  });
  paintChapters();
}

function paintClock(elapsed, duration) {
  document.getElementById("elapsed-label").textContent = formatClock(elapsed);
  document.getElementById("remote-clock").textContent = formatClock(elapsed);
  if (duration) {
    knownDuration = duration;
    document.getElementById("duration-label").textContent = formatClock(duration);
    document.getElementById("scrub-fill").style.width = Math.min(100, (elapsed / duration) * 100) + "%";
  }
  var chapters = chaptersFor();
  var active = chapters.length ? chapterIndex(elapsed) : 0;
  var label = document.getElementById("chapter-label");
  var prevChapter = document.getElementById("prev-chapter-btn");
  var nextChapter = document.getElementById("next-chapter-btn");
  if (chapters.length && label) {
    label.textContent = chapters[active].title;
    prevChapter.disabled = active <= 0;
    nextChapter.disabled = active >= chapters.length - 1;
  }
  document.querySelectorAll("#chapter-row button").forEach(function (button, chapterIndex) {
    var on = chapters.length && chapterIndex === active;
    button.className = on
      ? "chapter-chip px-3 py-2 rounded-full font-label-sm text-label-sm bg-primary text-on-primary"
      : "chapter-chip px-3 py-2 rounded-full font-label-sm text-label-sm bg-surface-container text-on-surface-variant";
  });
}

function renderQueue() {
  var videos = WWB.videos.filter(function (video) {
    return queueFilter === "all" || video.category === queueFilter;
  });
  document.getElementById("channel-list").innerHTML = videos.map(function (video) {
    return '<button type="button" data-video-id="' + video.id + '" class="w-full flex gap-3 text-left bg-surface-container-lowest rounded-xl p-3 shadow-sm">' +
      '<img alt="" class="w-28 h-[72px] rounded-lg object-cover shrink-0 bg-surface-container" src="' + WWB.thumb(video.id) + '"/>' +
      '<span class="min-w-0"><span class="block font-label-sm text-label-sm uppercase tracking-wider text-secondary">' + WWB.categoryLabel(video.category) + " · " + video.duration + "</span>" +
      '<span class="block font-body-sm text-body-sm text-on-surface font-semibold leading-snug mt-1">' + escapeHtml(video.title) + "</span></span></button>";
  }).join("");
  document.querySelectorAll("#channel-list button").forEach(function (button) {
    button.addEventListener("click", function () {
      var id = button.getAttribute("data-video-id");
      for (var i = 0; i < WWB.videos.length; i++) {
        if (WWB.videos[i].id === id) { selectVideo(i, true); return; }
      }
    });
  });
  paintMeta();
}

function renderFilters() {
  var cats = [{ id: "all", label: "All" }].concat(WWB.categories);
  var active = "shrink-0 px-3 py-1.5 rounded-full font-label-sm text-label-sm bg-primary text-on-primary";
  var idle = "shrink-0 px-3 py-1.5 rounded-full font-label-sm text-label-sm bg-surface-container text-on-surface-variant";
  document.getElementById("queue-filters").innerHTML = cats.map(function (category) {
    return '<button type="button" data-filter="' + category.id + '" class="' + (category.id === queueFilter ? active : idle) + '">' + category.label + "</button>";
  }).join("");
  document.querySelectorAll("#queue-filters button").forEach(function (button) {
    button.addEventListener("click", function () {
      queueFilter = button.getAttribute("data-filter");
      renderFilters();
      renderQueue();
    });
  });
}

function remember(videoId) {
  for (var i = 0; i < WWB.videos.length; i++) {
    if (WWB.videos[i].id === videoId) index = i;
  }
  if (queueFilter !== "all" && current().category !== queueFilter) {
    queueFilter = "all";
    renderFilters();
  }
  renderQueue();
}

function applyCaptions(on) {
  captionsOn = on;
  var button = document.getElementById("captions-btn");
  button.classList.toggle("text-primary", captionsOn);
  button.classList.toggle("text-on-surface-variant", !captionsOn);
  if (!playerReady() || typeof workoutPlayer.loadModule !== "function") return;
  try {
    workoutPlayer.loadModule("captions");
    if (captionsOn) {
      var tracks = workoutPlayer.getOption("captions", "tracklist") || [];
      workoutPlayer.setOption("captions", "track", tracks[0] || { languageCode: "en" });
    } else {
      workoutPlayer.setOption("captions", "track", {});
    }
  } catch (error) { /* this upload has no caption track */ }
}

function applyLoad(command) {
  if (!WWB.find(command.videoId)) return;
  if (ROLE === "display") history.replaceState(null, "", "?v=" + encodeURIComponent(command.videoId));
  remember(command.videoId);
  paintClock(command.start || current().start || 0, knownDuration || parseClock(current().duration));
  if (!playerReady()) {
    pending = command;
    return;
  }
  var spec = { videoId: command.videoId, startSeconds: command.start || 0 };
  if (command.play) workoutPlayer.loadVideoById(spec);
  else workoutPlayer.cueVideoById(spec);
}

function applyLocal(command) {
  if (command.type === "load") {
    applyLoad(command);
    return;
  }
  if (command.type === "captions") {
    applyCaptions(command.on);
    return;
  }
  if (!playerReady()) {
    pending = command;
    return;
  }
  if (command.type === "toggle") {
    if (workoutPlayer.getPlayerState() === YT.PlayerState.PLAYING) workoutPlayer.pauseVideo();
    else workoutPlayer.playVideo();
  } else if (command.type === "pause") {
    workoutPlayer.pauseVideo();
  } else if (command.type === "seekBy") {
    workoutPlayer.seekTo(Math.max(0, (workoutPlayer.getCurrentTime() || 0) + command.delta), true);
  } else if (command.type === "seekTo") {
    workoutPlayer.seekTo(Math.max(0, command.seconds), true);
    paintClock(command.seconds, knownDuration || parseClock(current().duration));
  } else if (command.type === "setVolume") {
    workoutPlayer.setVolume(command.volume);
    if (command.volume === 0) workoutPlayer.mute();
    else workoutPlayer.unMute();
  }
}

function snapshot() {
  var elapsed = current().start || 0;
  var duration = knownDuration || parseClock(current().duration);
  var playing = false;
  var volume = Number(document.getElementById("volume-slider").value);
  if (playerReady()) {
    var state = workoutPlayer.getPlayerState();
    var reported = workoutPlayer.getCurrentTime() || 0;
    if (!((state === -1 || state === 5) && reported < 1)) elapsed = reported;
    var readDuration = workoutPlayer.getDuration();
    if (readDuration) duration = readDuration;
    playing = state === YT.PlayerState.PLAYING;
    try { volume = workoutPlayer.getVolume(); } catch (error) { /* keep the slider value */ }
  }
  knownDuration = duration;
  return {
    videoId: current().id,
    t: elapsed,
    duration: duration,
    playing: playing,
    volume: volume,
    captions: captionsOn
  };
}

function publishState() {
  if (ROLE !== "display" || !sessionCode) return;
  var state = snapshot();
  fetch("/api/session/" + sessionCode + "/state", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(state)
  }).catch(function () {});
}

function issue(command) {
  if (ROLE === "remote") {
    if (command.type === "load") remember(command.videoId);
    if (command.type === "toggle") {
      playPauseIcon.textContent = playPauseIcon.textContent === "pause" ? "play_arrow" : "pause";
    }
    if (command.type === "seekBy") {
      var base = parseClock(document.getElementById("elapsed-label").textContent);
      paintClock(Math.max(0, base + command.delta), knownDuration || parseClock(current().duration));
    }
    if (command.type === "seekTo") paintClock(command.seconds, knownDuration || parseClock(current().duration));
    if (command.type === "captions") applyCaptions(command.on);
    if (!sessionCode) return;
    fetch("/api/session/" + sessionCode + "/command", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(command)
    }).then(function (response) {
      if (response.status === 404) {
        displayOnline = false;
        renderDevice();
      }
    }).catch(function () {
      displayOnline = false;
      renderDevice();
    });
    return;
  }
  applyLocal(command);
  publishState();
}

function playbackTime() {
  if (ROLE === "display" && playerReady()) return workoutPlayer.getCurrentTime() || 0;
  return parseClock(document.getElementById("elapsed-label").textContent);
}

function skipChapter(direction) {
  var chapters = chaptersFor();
  if (!chapters.length) return;
  var active = chapterIndex(playbackTime());
  var targetIndex = active + direction;
  if (targetIndex < 0 || targetIndex >= chapters.length) return;
  issue({ type: "seekTo", seconds: chapters[targetIndex].start });
}

function selectVideo(nextIndex, play) {
  var video = WWB.videos[(nextIndex + WWB.videos.length) % WWB.videos.length];
  issue({ type: "load", videoId: video.id, start: video.start || 0, play: play !== false });
}

function renderDevice() {
  var label = document.getElementById("device-label");
  var icon = document.getElementById("device-icon");
  var dot = document.getElementById("device-dot").firstElementChild;
  if (ROLE === "remote") {
    icon.textContent = "phonelink";
    if (!displayOnline) {
      label.innerHTML = "Code " + sessionCode + ' <span class="text-on-surface-variant font-normal">· screen disconnected</span>';
      dot.className = "relative inline-flex rounded-full h-2.5 w-2.5 bg-error";
      document.getElementById("remote-connection").textContent = "Waiting for the screen";
    } else {
      label.innerHTML = "Controlling " + sessionCode + ' <span class="text-on-surface-variant font-normal">· video is on the other screen</span>';
      dot.className = "relative inline-flex rounded-full h-2.5 w-2.5 bg-primary";
      document.getElementById("remote-connection").textContent = "Controlling the other screen";
    }
    return;
  }
  if (sessionCode && remoteOnline) {
    icon.textContent = "cast";
    label.innerHTML = "This screen <span class=\"text-on-surface-variant font-normal\">· remote " + sessionCode + " connected</span>";
    dot.className = "relative inline-flex rounded-full h-2.5 w-2.5 bg-primary";
    document.getElementById("pair-status").textContent = "A remote is connected.";
  } else if (sessionCode) {
    icon.textContent = "cast";
    label.innerHTML = "Code " + sessionCode + ' <span class="text-on-surface-variant font-normal">· waiting for a remote</span>';
    dot.className = "relative inline-flex rounded-full h-2.5 w-2.5 bg-tertiary";
    document.getElementById("pair-status").textContent = "Open this link on the phone that should be the remote.";
  } else {
    icon.textContent = "smartphone";
    label.innerHTML = 'This device <span class="text-on-surface-variant font-normal">· video and remote together</span>';
    dot.className = "relative inline-flex rounded-full h-2.5 w-2.5 bg-primary";
  }
}

function showHost(code, host, port) {
  var link = "http://" + host + ":" + port + "/workout_player/code.html?remote=" + code;
  document.getElementById("host-code").textContent = code;
  var anchor = document.getElementById("host-link");
  anchor.textContent = link;
  anchor.href = link;
  document.getElementById("host-details").classList.remove("hidden");
  document.getElementById("device-sheet").classList.remove("hidden");
}

function connectSession(code) {
  if (events) events.close();
  events = new EventSource("/api/session/" + code + "/events?role=" + ROLE);
  events.addEventListener("command", function (event) {
    if (ROLE !== "display") return;
    applyLocal(JSON.parse(event.data));
    publishState();
  });
  events.addEventListener("state", function (event) {
    if (ROLE !== "remote" || dragging) return;
    var state = JSON.parse(event.data);
    displayOnline = true;
    if (state.videoId && state.videoId !== current().id) remember(state.videoId);
    if (state.duration) knownDuration = Number(state.duration);
    paintClock(Number(state.t) || 0, knownDuration);
    playPauseIcon.textContent = state.playing ? "pause" : "play_arrow";
    if (!volumeDragging && Number.isFinite(Number(state.volume))) {
      document.getElementById("volume-slider").value = String(Math.round(Number(state.volume)));
    }
    if (Boolean(state.captions) !== captionsOn) applyCaptions(Boolean(state.captions));
    renderDevice();
  });
  events.addEventListener("presence", function (event) {
    var snapshotPresence = JSON.parse(event.data);
    displayOnline = snapshotPresence.display > 0;
    remoteOnline = snapshotPresence.remotes > 0;
    renderDevice();
  });
  events.onerror = function () {
    if (ROLE === "remote") displayOnline = false;
    renderDevice();
  };
}

function hostSession() {
  if (ROLE === "remote") {
    location.href = "code.html?v=" + encodeURIComponent(current().id);
    return;
  }
  if (sessionCode) {
    document.getElementById("device-sheet").classList.remove("hidden");
    document.getElementById("host-details").classList.remove("hidden");
    return;
  }
  fetch("/api/session", { method: "POST" }).then(function (response) {
    if (!response.ok) throw new Error("unavailable");
    return response.json();
  }).then(function (data) {
    sessionCode = data.code;
    sessionStorage.setItem("wwb-display", sessionCode);
    sessionStorage.setItem("wwb-display-host", data.host + ":" + data.port);
    showHost(sessionCode, data.host, data.port);
    connectSession(sessionCode);
    renderDevice();
    publishState();
  }).catch(function () {
    document.getElementById("host-code").textContent = "";
    document.getElementById("pair-status").textContent = "Start the preview server, then try another screen again.";
    document.getElementById("host-details").classList.remove("hidden");
    document.getElementById("device-sheet").classList.remove("hidden");
  });
}

function leaveSession() {
  if (events) events.close();
  events = null;
  sessionStorage.removeItem("wwb-display");
  sessionStorage.removeItem("wwb-display-host");
  if (ROLE === "remote") {
    location.href = "code.html?v=" + encodeURIComponent(current().id);
    return;
  }
  sessionCode = "";
  remoteOnline = false;
  document.getElementById("host-details").classList.add("hidden");
  renderDevice();
}

function onYouTubeIframeAPIReady() {
  if (ROLE !== "display") return;
  var video = current();
  workoutPlayer = new YT.Player("workout-player", {
    width: "100%",
    height: "100%",
    videoId: video.id,
    playerVars: { start: video.start || 0, rel: 0, playsinline: 1 },
    events: {
      onReady: function () {
        var duration = workoutPlayer.getDuration();
        if (duration) knownDuration = duration;
        workoutPlayer.setVolume(Number(document.getElementById("volume-slider").value));
        if (pending) {
          var command = pending;
          pending = null;
          applyLocal(command);
        }
        publishState();
      },
      onStateChange: function (event) {
        if (playPauseIcon) playPauseIcon.textContent = event.data === YT.PlayerState.PLAYING ? "pause" : "play_arrow";
        publishState();
      }
    }
  });
}

function bindControls() {
  document.getElementById("play-pause-btn").addEventListener("click", function () { issue({ type: "toggle" }); });
  document.getElementById("rewind-btn").addEventListener("click", function () { issue({ type: "seekBy", delta: -15 }); });
  document.getElementById("forward-btn").addEventListener("click", function () { issue({ type: "seekBy", delta: 30 }); });
  document.getElementById("prev-video-btn").addEventListener("click", function () { selectVideo(index - 1, true); });
  document.getElementById("next-video-btn").addEventListener("click", function () { selectVideo(index + 1, true); });
  document.getElementById("prev-chapter-btn").addEventListener("click", function () { skipChapter(-1); });
  document.getElementById("next-chapter-btn").addEventListener("click", function () { skipChapter(1); });
  document.getElementById("chapter-row").addEventListener("click", function (event) {
    var button = event.target.closest("button");
    if (!button || !button.hasAttribute("data-start")) return;
    issue({ type: "seekTo", seconds: Number(button.getAttribute("data-start")) });
  });
  var volume = document.getElementById("volume-slider");
  volume.addEventListener("pointerdown", function () { volumeDragging = true; });
  volume.addEventListener("input", function (event) {
    issue({ type: "setVolume", volume: Number(event.target.value) });
  });
  volume.addEventListener("change", function () { volumeDragging = false; });
  volume.addEventListener("pointerup", function () { volumeDragging = false; });
  var scrub = document.getElementById("scrub-bar");
  function ratioFrom(event) {
    var rect = scrub.getBoundingClientRect();
    if (!rect.width) return 0;
    return Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
  }
  scrub.addEventListener("pointerdown", function (event) {
    dragging = true;
    scrub.setPointerCapture(event.pointerId);
    var duration = knownDuration || parseClock(current().duration);
    paintClock(ratioFrom(event) * duration, duration);
  });
  scrub.addEventListener("pointermove", function (event) {
    if (!dragging) return;
    var duration = knownDuration || parseClock(current().duration);
    paintClock(ratioFrom(event) * duration, duration);
  });
  function finishScrub(event) {
    if (!dragging) return;
    dragging = false;
    var duration = knownDuration || parseClock(current().duration);
    issue({ type: "seekTo", seconds: ratioFrom(event) * duration });
  }
  scrub.addEventListener("pointerup", finishScrub);
  scrub.addEventListener("pointercancel", finishScrub);
  document.getElementById("captions-btn").addEventListener("click", function () {
    issue({ type: "captions", on: !captionsOn });
  });
  document.getElementById("favorite-cue-btn").addEventListener("click", function () {
    WWB.toggleSaved(current().id);
    paintMeta();
  });
  document.getElementById("library-btn").addEventListener("click", function () {
    document.getElementById("library").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  document.getElementById("screen-btn").addEventListener("click", function () {
    document.getElementById("device-sheet").classList.toggle("hidden");
  });
  document.getElementById("watch-here").addEventListener("click", function () {
    if (ROLE === "remote") location.href = "code.html?v=" + encodeURIComponent(current().id);
    else document.getElementById("device-sheet").classList.add("hidden");
  });
  document.getElementById("host-screen").addEventListener("click", hostSession);
  document.getElementById("join-screen").addEventListener("click", function () {
    var code = document.getElementById("join-code").value.trim().toUpperCase();
    if (!/^[A-Z0-9]{4}$/.test(code)) return;
    location.href = "code.html?remote=" + code;
  });
  document.getElementById("join-code").addEventListener("keydown", function (event) {
    if (event.key === "Enter") document.getElementById("join-screen").click();
  });
  document.getElementById("copy-link").addEventListener("click", function () {
    var link = document.getElementById("host-link").textContent;
    var button = document.getElementById("copy-link");
    navigator.clipboard.writeText(link).then(function () {
      button.textContent = "Copied";
    }).catch(function () {
      button.textContent = "Select the link above";
    });
  });
  document.getElementById("leave-screen").addEventListener("click", leaveSession);
}

function resumeDisplay() {
  var saved = sessionStorage.getItem("wwb-display");
  if (!saved) return;
  fetch("/api/session/" + saved).then(function (response) {
    if (!response.ok) {
      sessionStorage.removeItem("wwb-display");
      sessionStorage.removeItem("wwb-display-host");
      return;
    }
    sessionCode = saved;
    var storedHost = sessionStorage.getItem("wwb-display-host") || (location.hostname + ":" + (location.port || "80"));
    var splitAt = storedHost.lastIndexOf(":");
    showHost(saved, storedHost.slice(0, splitAt), storedHost.slice(splitAt + 1));
    connectSession(saved);
    renderDevice();
  }).catch(function () {});
}

bindControls();
renderFilters();
renderQueue();
paintMeta();
knownDuration = parseClock(current().duration);
paintClock(current().start || 0, knownDuration);

if (ROLE === "remote") {
  document.getElementById("stage-status").className = "absolute inset-0 z-10 flex flex-col items-center justify-center bg-surface-container text-center px-6 gap-1";
  connectSession(sessionCode);
  renderDevice();
} else {
  resumeDisplay();
  setInterval(function () {
    if (dragging || !playerReady()) return;
    var state = snapshot();
    paintClock(state.t, state.duration);
    if (playPauseIcon) playPauseIcon.textContent = state.playing ? "pause" : "play_arrow";
    publishState();
  }, 500);
}

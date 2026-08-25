import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const artifactsDir = path.join(process.cwd(), 'artifacts/issue-1');

async function captureScreenshots() {
  await mkdir(artifactsDir, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  await page.goto('http://127.0.0.1:4173/');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: path.join(artifactsDir, 'schedule-home.png'), fullPage: true });

  await page.getByTestId('start-workout-link').click();
  await page.waitForURL(/\/workout\/full-body-flow/);
  await page.screenshot({ path: path.join(artifactsDir, 'workout-companion.png'), fullPage: true });

  await page.getByTestId('play-pause-button').click();
  await page.getByTestId('log-exercise-button').click();
  await page.screenshot({ path: path.join(artifactsDir, 'workout-logged.png'), fullPage: true });

  await browser.close();
}

void captureScreenshots();

import { test, expect } from '@playwright/test';

test.describe('Workout Companion', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('shows today scheduled workout on home page', async ({ page }) => {
    await expect(page.getByTestId('daily-workout-card')).toBeVisible();
    await expect(page.getByRole('heading', { name: "Today's Workout" })).toBeVisible();
    await expect(page.getByText('Full Body Flow')).toBeVisible();
  });

  test('navigates to workout companion and displays current exercise', async ({ page }) => {
    await page.getByTestId('start-workout-link').click();

    await expect(page).toHaveURL(/\/workout\/full-body-flow/);
    await expect(page.getByTestId('current-exercise')).toContainText('Warm Up');
    await expect(page.getByTestId('youtube-player')).toBeVisible();
    await expect(page.getByTestId('exercise-list')).toBeVisible();
  });

  test('play/pause controls update player state', async ({ page }) => {
    await page.getByTestId('start-workout-link').click();

    const playPause = page.getByTestId('play-pause-button');
    await expect(page.getByTestId('player-state')).toHaveText('Paused');

    await playPause.click();
    await expect(page.getByTestId('player-state')).toHaveText('Playing');
    await expect(playPause).toHaveText('Pause');

    await playPause.click();
    await expect(page.getByTestId('player-state')).toHaveText('Paused');
    await expect(playPause).toHaveText('Play');
  });

  test('skip to next exercise updates current exercise', async ({ page }) => {
    await page.goto('/workout/full-body-flow');
    await page.evaluate(() => localStorage.clear());

    await expect(page.getByTestId('current-exercise')).toContainText('Warm Up');

    await page.getByTestId('skip-next-button').click();
    await expect(page.getByTestId('current-exercise')).toContainText('Bodyweight Squats');
  });

  test('jump to exercise via timestamp list', async ({ page }) => {
    await page.goto('/workout/full-body-flow');
    await page.evaluate(() => localStorage.clear());

    await page.getByTestId('exercise-item-push-ups').click();
    await expect(page.getByTestId('current-exercise')).toContainText('Push Ups');
  });

  test('logs completed exercises', async ({ page }) => {
    await page.goto('/workout/full-body-flow');
    await page.evaluate(() => localStorage.clear());

    const logButton = page.getByTestId('log-exercise-button');
    await expect(logButton).toHaveText('Log exercise complete');

    await logButton.click();
    await expect(logButton).toHaveText('Logged ✓');
    await expect(page.getByTestId('exercise-item-warm-up')).toContainText('✓');
    await expect(page.getByText('1 of 6 exercises logged')).toBeVisible();
  });
});

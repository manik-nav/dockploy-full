import { test, expect } from '@playwright/test';

test.describe('User List Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/users');
  });

  test('should display page header', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Team Directory');
    await expect(page.locator('.page-header p')).toHaveText('Meet our talented team members');
  });

  test('should display user cards', async ({ page }) => {
    const userCards = page.locator('.user-card');
    await expect(userCards.first()).toBeVisible();
    
    // Verify at least one user card exists
    const count = await userCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display user information in cards', async ({ page }) => {
    const firstCard = page.locator('.user-card').first();
    
    // Check that user card contains expected elements
    await expect(firstCard.locator('.card-avatar img')).toBeVisible();
    await expect(firstCard.locator('.card-name')).toBeVisible();
    await expect(firstCard.locator('.card-email')).toBeVisible();
    await expect(firstCard.locator('.card-phone')).toBeVisible();
    await expect(firstCard.locator('.card-location')).toBeVisible();
  });

  test('should navigate to user detail page when clicking a user card', async ({ page }) => {
    const firstCard = page.locator('.user-card').first();
    await firstCard.click();
    
    // Should navigate to user detail page
    await expect(page).toHaveURL(/\/users\/\d+/);
    await expect(page.locator('.user-detail-container')).toBeVisible();
  });

  test('should have accessible user card links', async ({ page }) => {
    const userCards = page.locator('.user-card');
    const firstCard = userCards.first();
    
    // User cards should be links
    await expect(firstCard).toHaveAttribute('href', /\/users\/\d+/);
  });

  test('should display user avatars with alt text', async ({ page }) => {
    const avatarImages = page.locator('.card-avatar img');
    const firstAvatar = avatarImages.first();
    
    await expect(firstAvatar).toBeVisible();
    await expect(firstAvatar).toHaveAttribute('alt', /avatar/i);
  });
});

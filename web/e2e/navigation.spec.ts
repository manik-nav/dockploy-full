import { test, expect } from '@playwright/test';

test.describe('Application Navigation', () => {
  test('should redirect root to users page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/users');
  });

  test('should navigate from user list to user detail and back', async ({ page }) => {
    // Start at user list
    await page.goto('/users');
    await expect(page.locator('h1')).toHaveText('Team Directory');
    
    // Click first user card
    await page.locator('.user-card').first().click();
    await expect(page).toHaveURL(/\/users\/\d+/);
    await expect(page.locator('.user-detail-container')).toBeVisible();
    
    // Go back to list
    await page.locator('.back-link').click();
    await expect(page).toHaveURL('/users');
    await expect(page.locator('h1')).toHaveText('Team Directory');
  });

  test('should maintain proper browser history', async ({ page }) => {
    await page.goto('/users');
    await page.locator('.user-card').first().click();
    
    // Use browser back button
    await page.goBack();
    await expect(page).toHaveURL('/users');
    
    // Use browser forward button
    await page.goForward();
    await expect(page).toHaveURL(/\/users\/\d+/);
  });
});

test.describe('Page Loading', () => {
  test('should load user list page without errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.goto('/users');
    await expect(page.locator('.user-list-container')).toBeVisible();
    
    // Filter out known non-critical errors if any
    const criticalErrors = consoleErrors.filter(
      err => !err.includes('favicon') && !err.includes('404')
    );
    expect(criticalErrors).toHaveLength(0);
  });

  test('should load user detail page without errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.goto('/users/1');
    await expect(page.locator('.user-detail-container')).toBeVisible();
    
    const criticalErrors = consoleErrors.filter(
      err => !err.includes('favicon') && !err.includes('404')
    );
    expect(criticalErrors).toHaveLength(0);
  });
});

import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('user list page should have proper heading structure', async ({ page }) => {
    await page.goto('/users');
    
    // Should have exactly one h1
    const h1Elements = page.locator('h1');
    await expect(h1Elements).toHaveCount(1);
    
    // h2 elements should be present for user names
    const h2Elements = page.locator('h2');
    const h2Count = await h2Elements.count();
    expect(h2Count).toBeGreaterThan(0);
  });

  test('user detail page should have proper heading structure', async ({ page }) => {
    await page.goto('/users/1');
    
    // Should have exactly one h1 (user name)
    const h1Elements = page.locator('h1');
    await expect(h1Elements).toHaveCount(1);
    
    // h2 elements should be present for section titles
    const h2Elements = page.locator('h2');
    const h2Count = await h2Elements.count();
    expect(h2Count).toBeGreaterThan(0);
  });

  test('all images should have alt text', async ({ page }) => {
    await page.goto('/users');
    
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('user detail page images should have descriptive alt text', async ({ page }) => {
    await page.goto('/users/1');
    
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt?.length).toBeGreaterThan(5);
    }
  });

  test('interactive elements should be keyboard accessible', async ({ page }) => {
    await page.goto('/users');
    
    // Tab to first user card
    await page.keyboard.press('Tab');
    
    // The focused element should be a user card link
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('links should have discernible text or aria-label', async ({ page }) => {
    await page.goto('/users');
    
    const links = page.locator('a');
    const count = await links.count();
    
    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      
      // Link should have either text content or aria-label
      expect(text?.trim() || ariaLabel).toBeTruthy();
    }
  });
});

test.describe('Responsive Design', () => {
  test('should display properly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/users');
    
    await expect(page.locator('.user-list-container')).toBeVisible();
    await expect(page.locator('.user-card').first()).toBeVisible();
  });

  test('should display properly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/users');
    
    await expect(page.locator('.user-list-container')).toBeVisible();
    await expect(page.locator('.user-card').first()).toBeVisible();
  });

  test('should display properly on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/users');
    
    await expect(page.locator('.user-list-container')).toBeVisible();
    await expect(page.locator('.user-card').first()).toBeVisible();
  });
});

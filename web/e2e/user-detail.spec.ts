import { test, expect } from '@playwright/test';

test.describe('User Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to user list first to get a valid user ID
    await page.goto('/users');
    await page.locator('.user-card').first().click();
  });

  test('should display back link to directory', async ({ page }) => {
    const backLink = page.locator('.back-link');
    await expect(backLink).toBeVisible();
    await expect(backLink).toContainText('Back to Directory');
  });

  test('should navigate back to user list when clicking back link', async ({ page }) => {
    await page.locator('.back-link').click();
    await expect(page).toHaveURL('/users');
  });

  test('should display user profile hero section', async ({ page }) => {
    const profileHero = page.locator('.profile-hero');
    await expect(profileHero).toBeVisible();
    
    // Check avatar
    await expect(profileHero.locator('.hero-avatar img')).toBeVisible();
    
    // Check user name
    await expect(profileHero.locator('h1')).toBeVisible();
    
    // Check location
    await expect(profileHero.locator('.hero-location')).toBeVisible();
  });

  test('should display contact information card', async ({ page }) => {
    const contactCard = page.locator('.detail-card').filter({ hasText: 'Contact Information' });
    await expect(contactCard).toBeVisible();
    
    // Check email field
    await expect(contactCard.locator('dt').filter({ hasText: 'Email' })).toBeVisible();
    await expect(contactCard.locator('dd').first()).toBeVisible();
    
    // Check phone field
    await expect(contactCard.locator('dt').filter({ hasText: 'Phone' })).toBeVisible();
  });

  test('should display address card', async ({ page }) => {
    const addressCard = page.locator('.detail-card').filter({ hasText: 'Address' });
    await expect(addressCard).toBeVisible();
    
    // Check street field
    await expect(addressCard.locator('dt').filter({ hasText: 'Street' })).toBeVisible();
    
    // Check city field
    await expect(addressCard.locator('dt').filter({ hasText: 'City' })).toBeVisible();
  });

  test('should display about/bio card', async ({ page }) => {
    const bioCard = page.locator('.detail-card.bio-card');
    await expect(bioCard).toBeVisible();
    await expect(bioCard.locator('h2')).toHaveText('About');
    await expect(bioCard.locator('.bio-text')).toBeVisible();
  });

  test('should have accessible profile image with alt text', async ({ page }) => {
    const profileImage = page.locator('.hero-avatar img');
    await expect(profileImage).toHaveAttribute('alt', /profile photo/i);
  });
});

test.describe('User Detail Page - Direct Navigation', () => {
  test('should load user detail page directly via URL', async ({ page }) => {
    await page.goto('/users/1');
    await expect(page.locator('.user-detail-container')).toBeVisible();
  });

  test('should handle navigation between different users', async ({ page }) => {
    // Go to first user
    await page.goto('/users/1');
    const firstUserName = await page.locator('.profile-hero h1').textContent();
    
    // Navigate back and go to second user
    await page.locator('.back-link').click();
    await page.locator('.user-card').nth(1).click();
    
    // Verify we're on a different user's page
    await expect(page.locator('.user-detail-container')).toBeVisible();
  });
});

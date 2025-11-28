const { test, expect } = require('@playwright/test');

test('validate title and page content on example.com', async ({ page }) => {
  // Step 1: Open page
  await page.goto('https://example.com');

  // Step 2: Verify title
  await expect(page).toHaveTitle('Example Domain');

  // Step 3: Verify main heading text
  const heading = page.locator('h1');
  await expect(heading).toHaveText('Example Domain');

  // Step 4: Verify paragraph contains specific text
  const paragraph = page.locator('p');
  await expect(paragraph.first()).toContainText('This domain is for use in documentation examples without needing permission. Avoid use in operations.');

  // Step 5: Screenshot for portfolio
  await page.screenshot({ path: 'screenshots/example-page.png', fullPage: true });
});

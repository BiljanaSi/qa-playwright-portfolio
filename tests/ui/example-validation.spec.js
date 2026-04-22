const { test, expect } = require('@playwright/test');

test('validate title and page content on example.com', async ({ page }) => {

  await page.goto('https://example.com');

 
  await expect(page).toHaveTitle('Example Domain');


  const heading = page.locator('h1');
  await expect(heading).toHaveText('Example Domain');

 
  const paragraph = page.locator('p');
  await expect(paragraph.first()).toContainText('This domain is for use in documentation examples without needing permission. Avoid use in operations.');


  await page.screenshot({ path: 'screenshots/example-page.png', fullPage: true });
});

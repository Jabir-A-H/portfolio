import { test, expect } from '@playwright/test';

test.describe('Viewport Horizontal Overflow', () => {
  const breakpoints = [
    { name: 'mobile', width: 360, height: 640 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'laptop', width: 1024, height: 768 },
    { name: 'desktop', width: 1440, height: 900 },
  ];

  for (const bp of breakpoints) {
    test(`no horizontal scroll at ${bp.name} (${bp.width}px)`, async ({ page }) => {
      await page.setViewportSize({ width: bp.width, height: bp.height });
      await page.goto('/'); // home page covers all layouts
      const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
      const clientWidth = await page.evaluate(() => document.body.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
    });
  }
});

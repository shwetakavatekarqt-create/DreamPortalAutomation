import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('Validate home page functionality', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.navigate();
  await homePage.validateLoaderBehaviour();
  await homePage.validateMainContent();

  const pages = await homePage.clickMyDreamsAndCaptureTabs();

  expect(pages.length).toBeGreaterThanOrEqual(3);

  const urls = pages.map((p) => p.url());

  expect(urls.some((u) => u.includes('dreams-diary.html'))).toBeTruthy();
  expect(urls.some((u) => u.includes('dreams-total.html'))).toBeTruthy();
});

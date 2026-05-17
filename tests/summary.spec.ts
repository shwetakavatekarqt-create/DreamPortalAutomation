import { test, expect } from '@playwright/test';
import { DreamSummaryPage } from '../pages/DreamSummaryPage';
import { DreamDiaryPage } from '../pages/DreamDiaryPage';

test('Validate summary statistics', async ({ browser }) => {
  const context1 = await browser.newContext();
  const page1 = await context1.newPage();

  const diaryPage = new DreamDiaryPage(page1);

  await diaryPage.navigate();

  const recurringDreams = await diaryPage.getRecurringDreams();

  expect(recurringDreams).toContain('Flying over mountains');
  expect(recurringDreams).toContain('Lost in maze');

  const context2 = await browser.newContext();
  const page2 = await context2.newPage();

  const summaryPage = new DreamSummaryPage(page2);

  await summaryPage.navigate();
  await summaryPage.validateStats();
});

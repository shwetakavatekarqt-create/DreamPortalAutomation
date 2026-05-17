import { test } from '@playwright/test';
import { DreamDiaryPage } from '../pages/DreamDiaryPage';

test('Validate dream diary table', async ({ page }) => {
  const diaryPage = new DreamDiaryPage(page);

  await diaryPage.navigate();
  await diaryPage.validateDreamCount();
  await diaryPage.validateDreamTypes();
  await diaryPage.validateAllColumnsFilled();
});

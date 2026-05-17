import { test, expect } from '@playwright/test';
import { DreamDiaryPage } from '../pages/DreamDiaryPage';
import { classifyDream } from '../utils/aiClassifier';

const openAiConfigured = Boolean(process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.startsWith('your_api'));

test.skip(!openAiConfigured, 'OpenAI API key not configured');

test('Validate dream type using OpenAI', async ({ page }) => {
  const diaryPage = new DreamDiaryPage(page);

  await diaryPage.navigate();

  const dreams = await diaryPage.getDreamData();

  for (const dream of dreams) {
    const aiClassification = await classifyDream(dream.name);

    expect(aiClassification).toBe(dream.type);
  }
});

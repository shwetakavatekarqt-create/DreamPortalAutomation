import { expect, Locator, Page } from '@playwright/test';

export class DreamDiaryPage {
  readonly page: Page;
  readonly tableRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.tableRows = page.locator('table tbody tr');
  }

  async navigate() {
    await this.page.goto('https://arjitnigam.github.io/myDreams/dreams-diary.html');
  }

  async validateDreamCount() {
    await expect(this.tableRows).toHaveCount(10);
  }

  async validateDreamTypes() {
    const rows = await this.tableRows.all();

    for (const row of rows) {
      const type = await row.locator('td').nth(2).textContent();
      expect(['Good', 'Bad']).toContain(type?.trim());
    }
  }

  async validateAllColumnsFilled() {
    const rows = await this.tableRows.all();

    for (const row of rows) {
      const cols = await row.locator('td').allTextContents();

      expect(cols[0].trim().length).toBeGreaterThan(0);
      expect(cols[1].trim().length).toBeGreaterThan(0);
      expect(cols[2].trim().length).toBeGreaterThan(0);
    }
  }

  async getRecurringDreams() {
    const rows = await this.tableRows.all();
    const names: string[] = [];

    for (const row of rows) {
      const name = await row.locator('td').nth(0).textContent();

      if (name) {
        names.push(name.trim());
      }
    }

    const recurring = names.filter(
      (item, index) => names.indexOf(item) !== index
    );

    return [...new Set(recurring)];
  }

  async getDreamData() {
    const rows = await this.tableRows.all();
    const data: any[] = [];

    for (const row of rows) {
      const cols = await row.locator('td').allTextContents();

      data.push({
        name: cols[0].trim(),
        daysAgo: cols[1].trim(),
        type: cols[2].trim()
      });
    }

    return data;
  }
}

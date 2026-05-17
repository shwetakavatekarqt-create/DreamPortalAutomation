import { expect, Page } from '@playwright/test';

export class DreamSummaryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://arjitnigam.github.io/myDreams/dreams-total.html');
  }

  async validateStats() {
    const bodyText = await this.page.locator('body').textContent();

    expect(bodyText).toMatch(/Good Dreams\s*6/);
    expect(bodyText).toMatch(/Bad Dreams\s*4/);
    expect(bodyText).toMatch(/Total Dreams\s*10/);
    expect(bodyText).toMatch(/Recurring Dreams\s*2/);
  }
}

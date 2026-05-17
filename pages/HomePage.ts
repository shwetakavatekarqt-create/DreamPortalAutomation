import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly loader: Locator;
  readonly mainContent: Locator;
  readonly myDreamsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loader = page.locator('#loadingAnimation');
    this.mainContent = page.locator('#mainContent');
    this.myDreamsButton = page.locator('#dreamButton');
  }

  async navigate() {
    await this.page.goto('https://arjitnigam.github.io/myDreams/index.html');
  }

  async validateLoaderBehaviour() {
    if ((await this.loader.count()) === 0) {
      return;
    }

    await expect(this.loader).toBeVisible();
    await expect(this.loader).toBeHidden({ timeout: 5000 });
  }

  async validateMainContent() {
    await expect(this.mainContent).toBeVisible();
    await expect(this.myDreamsButton).toBeVisible();
  }

  async clickMyDreamsAndCaptureTabs() {
    await this.myDreamsButton.click();

    const firstPage = await this.page.context().waitForEvent('page');
    const secondPage = await this.page.context().waitForEvent('page');

    await Promise.all([firstPage.waitForLoadState(), secondPage.waitForLoadState()]);
    return this.page.context().pages();
  }
}

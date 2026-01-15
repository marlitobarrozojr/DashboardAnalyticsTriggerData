import { Page } from '@playwright/test';

export class NavigationPage {
  readonly page: Page;
  readonly usernameInput = "//label[normalize-space(text())='User Name']/following-sibling::input";
  readonly passwordInput = "//label[normalize-space(text())='Password']/following-sibling::input";
  readonly submitButton = "//a[normalize-space(text())='Sign in']";
  readonly navPointerDownIcon = '//*[@id="pointerDown"]';
  readonly signOutButton = '//span[normalize-space(text())="Logout For Auto"]';

  constructor(page: Page) {
    this.page = page;
  }

  async logout() {
    // Wait for the pointer down icon to be visible and hover over it
    const pointerIcon = this.page.locator(this.navPointerDownIcon);
    await pointerIcon.waitFor({ state: 'visible', timeout: 5000 });
    await pointerIcon.hover();
    // Wait for the sign out button to be visible and click it
    const signOutBtn = this.page.locator(this.signOutButton);
    await signOutBtn.waitFor({ state: 'visible', timeout: 5000 });
    await signOutBtn.click();
  }
}
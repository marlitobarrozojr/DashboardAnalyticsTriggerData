import { Page } from '@playwright/test';
import { PersonaBarPage } from './PersonaBarPage';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput = "//label[normalize-space(text())='User Name']/following-sibling::input";
  readonly passwordInput = "//label[normalize-space(text())='Password']/following-sibling::input";
  readonly submitButton = "//a[normalize-space(text())='Sign in']";

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://hrportal-qa.ehr.com/smoke/login?mode=standard'); // Replace with your login URL
  }

  async login(username: string, password: string) {
    const personaBarPage = new PersonaBarPage(this.page);

    await this.goto();

    await this.page.waitForTimeout(2000);
    await personaBarPage.clickAgreeAndProceed();

    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await Promise.all([
      this.page.waitForNavigation(),
      this.page.click(this.submitButton),
    ]);

    await this.waitPageLoad();
    
    // Close any modal that might appear after login
    await this.page.keyboard.press('Escape');
  }

  // Wait until page load is complete
  async waitPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState('domcontentloaded');
  }
}
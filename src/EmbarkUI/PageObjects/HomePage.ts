import { Page } from '@playwright/test';
import { PersonaBarPage } from './PersonaBarPage';

export class HomePage {
  readonly page: Page;
  readonly usernameInput = "//label[normalize-space(text())='User Name']/following-sibling::input";
  readonly passwordInput = "//label[normalize-space(text())='Password']/following-sibling::input";
  readonly submitButton = "//a[normalize-space(text())='Sign in']";
  readonly searchTextbox = "//input[@placeholder='Search for...']";
  readonly searchCategoriesDiv = "//div[@id='embarkSearchCategories']";

  // Chat Locator
  readonly chatButton = "//div[@id='chat-button']";
  readonly chatTextbox = "//input[@placeholder='Enter a message...']";
  readonly sendChatButton = "//*[@alt='Send Message']";
  readonly chatMessageDiv = "//div[text()='Was this helpful?']";

  constructor(page: Page) {
    this.page = page;
  }

  getPageLink(linkText: string) {
    return `//span[@aria-label="${linkText}"]`;
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

    // Close any modal that might appear after login
    await this.page.keyboard.press('Escape');
  }

  async search(search: string) {
    await this.page.fill(this.searchTextbox, search);
    await this.page.keyboard.press('Enter');
  }

  async openChat() {
    await this.page.click(this.chatButton);
  }

  async sendMessageInChat(message: string) {
    await this.page.fill(this.chatTextbox, message);
    await this.page.click(this.sendChatButton);
  }

  async getLastChatMessage(): Promise<string> {
    const messages = this.page.locator(this.chatMessageDiv);
    const count = await messages.count();
    return messages.nth(count - 1).innerText();
  }
}
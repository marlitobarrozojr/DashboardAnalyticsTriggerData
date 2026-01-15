import { Page, expect } from '@playwright/test';

export class FluentHomePage {
  readonly page: Page;
  
  private readonly selectors = {
    usernameInput: "//label[normalize-space(text())='User Name']/following-sibling::input",
    passwordInput: "//label[normalize-space(text())='Password']/following-sibling::input",
    submitButton: "//a[normalize-space(text())='Sign in']",
    searchTextbox: "//input[@placeholder='Search for...']",
    searchCategoriesDiv: "//div[@id='embarkSearchCategories']",
    chatButton: "//div[@id='chat-button']",
    chatTextbox: "//input[@placeholder='Enter a message...']",
    sendChatButton: "//*[@alt='Send Message']"
  };

  constructor(page: Page) {
    this.page = page;
  }

  // Fluent interface methods - chainable
  async navigateTo(url: string = 'https://hrportal-qa.ehr.com/smoke/login?mode=standard'): Promise<FluentHomePage> {
    await this.page.goto(url);
    return this;
  }

  async waitForElement(selector: string, timeout: number = 10000): Promise<FluentHomePage> {
    await expect(this.page.locator(selector)).toBeVisible({ timeout });
    return this;
  }

  async fillCredentials(username: string, password: string): Promise<FluentHomePage> {
    await this.page.fill(this.selectors.usernameInput, username);
    await this.page.fill(this.selectors.passwordInput, password);
    return this;
  }

  async submitLogin(): Promise<FluentHomePage> {
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'networkidle' }),
      this.page.click(this.selectors.submitButton)
    ]);
    
    // Handle post-login modal dismissal
    await this.page.keyboard.press('Escape');
    return this;
  }

  async performSearch(keyword: string): Promise<FluentHomePage> {
    await this.page.fill(this.selectors.searchTextbox, keyword);
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('networkidle');
    return this;
  }

  async clickPageElement(text: string): Promise<FluentHomePage> {
    const selector = `//span[text()="${text}"]`;
    await expect(this.page.locator(selector)).toBeVisible({ timeout: 10000 });
    await this.page.click(selector);
    return this;
  }

  async clickTextLink(text: string): Promise<FluentHomePage> {
    const selector = `//a[text()="${text}"]`;
    await expect(this.page.locator(selector)).toBeVisible({ timeout: 10000 });
    await this.page.click(selector);
    return this;
  }

  async waitForSearchResults(): Promise<FluentHomePage> {
    await expect(this.page.locator(this.selectors.searchCategoriesDiv)).toBeVisible({ timeout: 50000 });
    return this;
  }

  async openChat(): Promise<FluentHomePage> {
    await this.page.click(this.selectors.chatButton);
    return this;
  }

  async sendChatMessage(message: string): Promise<FluentHomePage> {
    await this.page.fill(this.selectors.chatTextbox, message);
    await this.page.click(this.selectors.sendChatButton);
    return this;
  }

  // Assertion methods
  async shouldSeeElement(selector: string, timeout: number = 10000): Promise<FluentHomePage> {
    await expect(this.page.locator(selector)).toBeVisible({ timeout });
    return this;
  }

  async shouldSeeText(text: string, timeout: number = 10000): Promise<FluentHomePage> {
    await expect(this.page.locator(`text=${text}`)).toBeVisible({ timeout });
    return this;
  }

  async shouldBeOnPage(urlPattern: string | RegExp): Promise<FluentHomePage> {
    await expect(this.page).toHaveURL(urlPattern);
    return this;
  }

  // Utility methods
  async wait(milliseconds: number): Promise<FluentHomePage> {
    await this.page.waitForTimeout(milliseconds);
    return this;
  }

  async waitForPageLoad(): Promise<FluentHomePage> {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState('domcontentloaded');
    return this;
  }

  async takeScreenshot(name: string): Promise<FluentHomePage> {
    await this.page.screenshot({ 
      path: `test-results/screenshots/${name}-${Date.now()}.png`,
      fullPage: true 
    });
    return this;
  }

  // Complex workflow methods
  async completeLogin(username: string, password: string): Promise<FluentHomePage> {
    return await this
      .navigateTo()
      .then(page => page.wait(2000))
      .then(page => page.fillCredentials(username, password))
      .then(page => page.submitLogin())
      .then(page => page.waitForPageLoad());
  }

  async performCompleteSearch(keyword: string): Promise<FluentHomePage> {
    return await this
      .performSearch(keyword)
      .then(page => page.waitForSearchResults());
  }
}
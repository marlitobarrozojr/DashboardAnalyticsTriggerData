import { type Page, expect } from '@playwright/test';
import { LoginPage } from '../EmbarkUI/PageObjects/LoginPage';
import { HomePage } from '../EmbarkUI/PageObjects/HomePage';

export class TestHelpers {
    static async loginAndClickTarget(
        page: Page,
        username: string,
        password: string,
        text: string
    ): Promise<void> {
        const loginPage: LoginPage = new LoginPage(page);

        await loginPage.login(username, password);

        const targetLocator = page.locator(`//span[text()="${text}"]`);
        await expect(targetLocator).toBeVisible({ timeout: 10000 });
        await targetLocator.click();
    }

    static async clickPage(
        page: Page,
        pageName: string
    ): Promise<void> {
        const targetLocator = page.locator(`//span[text()="${pageName}"]`);
        await expect(targetLocator).toBeVisible({ timeout: 10000 });
        await targetLocator.click();
    }

    static async clickTextLink(
        page: Page,
        text: string
    ): Promise<void> {
        const targetLocator = page.locator(`//a[text()="${text}"]`);
        await expect(targetLocator).toBeVisible({ timeout: 10000 });
        await targetLocator.click();
    }

    static async clickDocumentLink(
        page: Page,
        text: string
    ): Promise<void> {
        const targetLocator = page.locator(`//a[normalize-space()="${text}"]`);
        await expect(targetLocator).toBeVisible({ timeout: 40000 });
        await targetLocator.click();
    }

    // Document view trigger
    static async loginAndClickDocument(page: Page, username: string, password: string, text: string): Promise<void> {
        const loginPage = new LoginPage(page);

        await loginPage.login(username, password);

        const targetLocator = page.locator(`//a[normalize-space()="${text}"]`);

        await expect(targetLocator).toBeVisible({ timeout: 10000 });

        const targetElement = await page.$(`//a[normalize-space()="${text}"]`);

        if (targetElement) {
            await targetElement.scrollIntoViewIfNeeded();
            await targetElement.click();
            await page.waitForTimeout(3000);
        } else {
            console.log('Element not found');
        }
    }

    // Document Link Tagging Trigger
    static async loginAndGotoPageLinkTag(page: Page, username: string, password: string, pageName: string): Promise<Page> {
        const loginPage = new LoginPage(page);
        await loginPage.login(username, password);

        await this.goToPageLinkTag(page, `https://hrportal-qa.ehr.com/smoke/${pageName}`);

        return page;
    }

    static async loginAndGotoPage(page: Page, username: string, password: string, pageName: string): Promise<void> {
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        await loginPage.login(username, password);
        await page.click(homePage.getPageLink(pageName));
    }

    // Wait until page load is complete
    static async waitPageLoad(page: Page): Promise<void> {
        await page.waitForLoadState('networkidle');
        await page.waitForLoadState('domcontentloaded');
    }

    static async goToDocumentLinkTagging(page: Page, link: string): Promise<void> {
        try {
            const [download] = await Promise.all([
                page.waitForEvent('download', { timeout: 30000 }),
                page.goto(link, { waitUntil: 'commit' })
            ]);

            if (download) {
                console.log(`Download triggered successfully: ${download.suggestedFilename()}`);
                // Wait a moment for download to start
                await page.waitForTimeout(2000);
            }
        } catch (error) {
            console.log(`Download process completed (this is expected for file downloads)`);
        }
        console.log(`Triggered document tag: ${link}`);

        // Additional 2 second sleep
        await page.waitForTimeout(2000);
    }

    static async goToPageLinkTag(page: Page, link: string): Promise<Page> {
        const context = page.context();
        const newPage = await context.newPage();
        await newPage.goto(link);
        console.log(`Navigated to Page Link Tag: ${link}`);
        return newPage;
    }
}
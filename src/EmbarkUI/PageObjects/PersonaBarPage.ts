import { Page, Locator, FrameLocator } from '@playwright/test';

export class PersonaBarPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get formCloseButton(): Locator {
        return this.page.frameLocator('#personaBar-iframe').locator('#showsite');
    }
    get personaBarEvents(): Locator {
        return this.page.frameLocator('#personaBar-iframe').locator('#HRPortal_Events');
    }
    get personaBarContent(): Locator {
        return this.page.frameLocator('#personaBar-iframe').locator('#Content');
    }

    async hoverOnContent(): Promise<void> {
        await this.personaBarContent.hover();
    }
    async clickEvents(): Promise<void> {
        await this.hoverOnContent();
        await this.personaBarEvents.click();
    }

    async clickAgreeAndProceed(): Promise<void> {
        const button = this.page.locator('#onetrust-accept-btn-handler');
        if (await button.isVisible()) {
            await button.click();
            console.log('Button was visible and clicked.');
        } else {
            console.log('Button not visible.');
        }
    }
}
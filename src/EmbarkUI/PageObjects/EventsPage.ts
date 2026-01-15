import { Page, Locator, FrameLocator } from '@playwright/test';

export class EventsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get eventsBreadCrumb(): Locator {
        return this.page.frameLocator('#personaBar-iframe').locator("//hrportal-breadcrumb//a[contains(text(), 'Events')]");
    }
    get addNewEventButton(): Locator {
        return this.page.frameLocator('#personaBar-iframe').locator("//*[@id='events0']//button[contains(text(), 'Add New Event')]");
    }
    get addNewEventBreadcrumb(): Locator {
        return this.page.frameLocator('#personaBar-iframe').locator("//span[contains(text(), 'Add New: Event')]");
    }
    async clickAddNewEvent(): Promise<void> {
        await this.addNewEventButton.click();
    }
}






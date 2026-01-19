import { test as base, expect, chromium, type Page, type BrowserContext } from '@playwright/test';
import { LoginPage } from '../src/EmbarkUI/PageObjects/LoginPage';
import { NavigationPage } from '../src/EmbarkUI/PageObjects/NavigationPage';
import { HomePage } from '../src/EmbarkUI/PageObjects/HomePage';
import { TestEnvironmentConfig } from '../src/Utils/TestEnvironmentConfig';
import { TestHelpers } from '../src/Utils/TestHelpers';

// Set environment at the beginning of your test suite
// Default is IaaS, switch to PaaS if needed
TestEnvironmentConfig.setEnvironment(TestEnvironmentConfig.ENVIRONMENTS.IAAS);

// Check current environment
const currentEnv = TestEnvironmentConfig.getCurrentEnvironment();
console.log(`Running tests on: ${currentEnv.environment}`);
console.log(`Base URL: ${currentEnv.config.BASE_URL}`);

const test = base.extend<{ context: BrowserContext, page: Page }>({
    context: async ({ }, use) => {
        // Create a new browser instance for each test (new session)
        // Use headless setting from config or environment variable
        const browser = await chromium.launch({
            headless: process.env.HEADLESS !== 'false'
        });
        const context = await browser.newContext({});
        await use(context);
        await context.close();
        await browser.close();
    },
    page: async ({ context }, use) => {
        const page = await context.newPage();
        await use(page);
        await page.close();
    },
});

// Page link tagging: https://hrportal-qa.ehr.com/smoke/goto?linkId=61      page: Content Slider               Link name: Page link tag Content slider     tag: contentSlider
// Page link tagging: https://hrportal-qa.ehr.com/smoke/goto?linkId=10      page: Links Test Data              Link name: AvionLinkTag                     tag: avion,avionLT
// Page link tagging: https://hrportal-qa.ehr.com/smoke/goto?linkId=22      page: Links Test Data              Link name: Avion LT 1132025                 tag: avionData1, avionData2
// Document Link Tagging: https://hrportal-qa.ehr.com/smoke/goto?linkId=12  document: AI Automation.docs
// Document Link Tagging: https://hrportal-qa.ehr.com/smoke/goto?linkId=55  document: Smoke Testing.docx
test.describe('Trigger 20 Target Views for Page View Link Tagging', () => {
    // Set environment (default is IaaS, change to PaaS if needed)
    // TestEnvironmentConfig.setEnvironment(TestEnvironmentConfig.ENVIRONMENTS.PAAS);

    const linkId = `goto?linkId=${TestEnvironmentConfig.LINK_IDS.LINKS_TEST_DATA}`;
    const linkId2 = `goto?linkId=${TestEnvironmentConfig.LINK_IDS.AVION_LT_DATA}`;

    // Generate tests for each content group user
    TestEnvironmentConfig.USERS.forEach(({ user, label }) => {
        test(`${label} Should be able to Trigger Page view Link Tagging`, async ({ page }) => {
            const navigationPage = new NavigationPage(page);
            const credentials = TestEnvironmentConfig.getUserCredentials(user);

            await TestHelpers.loginAndGotoPageLinkTag(page, credentials.username, credentials.password, linkId);
            await page.waitForTimeout(TestEnvironmentConfig.TIMEOUTS.WAIT_AFTER_ACTION);

            await navigationPage.logout();
        });
    });

});

test.describe('Trigger 20 Target Views for Document Link Tagging', () => {
    const pageName = TestEnvironmentConfig.PAGES.AVION;
    const sessionTagDocumentLink = TestEnvironmentConfig.getUrl(TestEnvironmentConfig.LINK_IDS.SMOKE_TESTING_DOC);
    const sessionTagDocumentLink2 = TestEnvironmentConfig.getUrl(TestEnvironmentConfig.LINK_IDS.SMOKE_TESTING_DOC);


    TestEnvironmentConfig.USERS.forEach(({ user, label }) => {
        test(`${label} Should be able to Trigger Target Views for Document Link Tagging`, async ({ page }) => {
            const navigationPage = new NavigationPage(page);
            const credentials = TestEnvironmentConfig.getUserCredentials(user);

            await TestHelpers.loginAndGotoPage(page, credentials.username, credentials.password, pageName);
            console.log(`${credentials.username} Login successful and navigated to ${pageName} page`);

            await TestHelpers.waitPageLoad(page);
            await TestHelpers.goToDocumentLinkTagging(page, sessionTagDocumentLink);
            console.log(`Clicked on Document Link: ${sessionTagDocumentLink}`);

            await navigationPage.logout();
        });
    });

});

test.describe('Trigger 20 PageView with Link Tag with session tagging', () => {
    const pageName = TestEnvironmentConfig.PAGES.AVION;
    const sessionTagPageLink = TestEnvironmentConfig.getUrl(TestEnvironmentConfig.PAGEVIEW_LINK_TAG_IDS.LINKS_TEST_DATA);
    const sessionTagDocumentLink2 = TestEnvironmentConfig.getUrl(TestEnvironmentConfig.DOCUMENT_LINK_TAG_IDS.SMOKE_TESTING_DOC);


    TestEnvironmentConfig.USERS.forEach(({ user, label }) => {
        test(`${label} Should be able to Trigger Target Views for PageView Link Tagging`, async ({ page }) => {
            const navigationPage = new NavigationPage(page);
            const credentials = TestEnvironmentConfig.getUserCredentials(user);

            await TestHelpers.loginAndGotoPage(page, credentials.username, credentials.password, pageName);
            console.log(`${credentials.username} Login successful and navigated to ${pageName} page`);

            await TestHelpers.waitPageLoad(page);
            await TestHelpers.goToDocumentLinkTagging(page, sessionTagPageLink);
            console.log(`Clicked on Page Link tag: ${sessionTagPageLink}`);

            await TestHelpers.clickPage(page, 'Technology Home Page');
            console.log('Clicked on Technology Home Page');

            await TestHelpers.clickPage(page, 'Data Table Auto');
            console.log('Clicked on Page Link Tagging: Data Table Auto');

            console.log('Completed all page clicks on link tagging');

            await navigationPage.logout();
        });
    });
});

test.describe('Trigger 20 Page view', () => {

    const targetPages = [
        'AskHR',
        'Data Table Auto',
        'FAQs',
        'Technology Home Page'
    ];

    TestEnvironmentConfig.USERS.forEach(({ user, label }) => {
        test(`${label} Should be able to Trigger Page view Link Tagging`, async ({ page }) => {
            const navigationPage = new NavigationPage(page);
            const randomPage = targetPages[Math.floor(Math.random() * targetPages.length)];
            await TestHelpers.loginAndClickTarget(page, user, 'Portal123!', randomPage);
            console.log(`${user} Login successful and navigated to ${randomPage} page`);
            await navigationPage.logout();
        });
    });
});

test.describe('Trigger 20 Document Click', () => {

    const targetDocument = [
        'AI Automation.docx',
        'Playwright Automation.pdf',
    ];

    TestEnvironmentConfig.USERS.forEach(({ user, label }) => {
        test(`${label} Should be able to Trigger Document Click`, async ({ page }) => {
            const navigationPage = new NavigationPage(page);
            const randomDocument = targetDocument[Math.floor(Math.random() * targetDocument.length)];
            await TestHelpers.loginAndClickTarget(page, user, 'Portal123!', TestEnvironmentConfig.PAGES.AVION);
            await TestHelpers.clickDocumentLink(page, randomDocument);
            console.log(`${user} Login successful and click ${randomDocument} document`);
            await navigationPage.logout();
        });
    });
});

test.describe('Trigger 20 data for Content group for Avion-CG', () => {
    const contentGroup = 'Avion-CG';
    const documentLink = TestEnvironmentConfig.DOCUMENT_TYPES.FOR_AUTO_DO_NOT_DELETE_DOCUMENT;

    TestEnvironmentConfig.USERS.forEach(({ user, label }) => {
        test(`${label} Should be able to Trigger Document Click`, async ({ page }) => {
            const navigationPage = new NavigationPage(page);
            await TestHelpers.loginAndClickTarget(page, user, 'Portal123!', TestEnvironmentConfig.PAGES.AVION);
            await TestHelpers.clickTextLink(page, contentGroup);
            console.log(`Clicked on ${contentGroup}`);
            await TestHelpers.waitPageLoad(page);

            await TestHelpers.clickDocumentLink(page, documentLink);
            console.log(`Clicked on ${documentLink}`);

            console.log(`${user} Login successful and click ${contentGroup} content group`);
            await navigationPage.logout();
        });
    });
});

test.describe('Trigger 20 data for Content group for Avion-CG with Page view link tagging', () => {

    const contentGroup = 'Avion-CG';
    const documentLink = TestEnvironmentConfig.DOCUMENT_TYPES.FOR_AUTO_DO_NOT_DELETE_DOCUMENT;
    const pageLinkTag = TestEnvironmentConfig.getGotoUrl(TestEnvironmentConfig.PAGEVIEW_LINK_TAG_IDS.AVION_PAGE_LT);

    TestEnvironmentConfig.USERS.forEach(({ user, label }) => {
        test(`${label} Should be able to Trigger Document Click`, async ({ page }) => {
            const navigationPage = new NavigationPage(page);
            await TestHelpers.loginAndClickTarget(page, user, 'Portal123!', TestEnvironmentConfig.PAGES.AVION);

            await TestHelpers.goToDocumentLinkTagging(page, pageLinkTag);
            console.log(`Navigated to Page link Avion`);

            await TestHelpers.clickTextLink(page, contentGroup);
            console.log(`Clicked on ${contentGroup}`);
            await TestHelpers.waitPageLoad(page);

            await TestHelpers.clickDocumentLink(page, documentLink);
            console.log(`Clicked on ${documentLink}`);

            console.log(`${user} Login successful and click ${contentGroup} content group`);
            await navigationPage.logout();
        });
    });
});

test.describe('Trigger 20 data for Content group for Avion-CG-Auto', () => {

    const contentGroup = 'Avion-CG-Auto';
    const documentLink = TestEnvironmentConfig.DOCUMENT_TYPES.FOR_AUTO_DO_NOT_DELETE_DOCUMENT;

    TestEnvironmentConfig.USERS.forEach(({ user, label }) => {
        test(`${label} Should be able to Trigger Document Click`, async ({ page }) => {
            const navigationPage = new NavigationPage(page);
            await TestHelpers.loginAndClickTarget(page, user, 'Portal123!', TestEnvironmentConfig.PAGES.AVION);
            await TestHelpers.clickTextLink(page, contentGroup);
            console.log(`Clicked on ${contentGroup}`);
            await TestHelpers.waitPageLoad(page);

            await TestHelpers.clickDocumentLink(page, documentLink);
            console.log(`Clicked on ${documentLink}`);

            console.log(`${user} Login successful and click ${contentGroup} content group`);
            await navigationPage.logout();
        });
    });
});

test.describe('Trigger 20 data for Content group for Avion-CG-Auto with Page view link tagging', () => {

    const contentGroup = 'Avion-CG-Auto';
    const documentLink = TestEnvironmentConfig.DOCUMENT_TYPES.FOR_AUTO_DO_NOT_DELETE_DOCUMENT;

    TestEnvironmentConfig.USERS.forEach(({ user, label }) => {
        test(`${label} Should be able to Trigger Document Click`, async ({ page }) => {
            const navigationPage = new NavigationPage(page);
            await TestHelpers.loginAndClickTarget(page, user, 'Portal123!', TestEnvironmentConfig.PAGES.AVION);
            await TestHelpers.clickTextLink(page, contentGroup);
            console.log(`Clicked on ${contentGroup}`);
            await TestHelpers.waitPageLoad(page);

            await TestHelpers.clickDocumentLink(page, documentLink);
            console.log(`Clicked on ${documentLink}`);

            console.log(`${user} Login successful and click ${contentGroup} content group`);
            await navigationPage.logout();
        });
    });
});

test.describe('Trigger 20 data for EVA', () => {

    const chatList = [
        'Software testing',
        'AskHr',
        'Covid',
        'AI Automation',
        'Smoke Testing',
        'Benefits',
        'Salary',
        'FAQs',
        'Technology Trends',
        'investment'
    ];

    TestEnvironmentConfig.USERS.forEach(({ user, label }) => {
        test(`${label} Should be able to Trigger Document Click`, async ({ page }) => {
            const navigationPage = new NavigationPage(page);
            const login = new LoginPage(page);
            const homePage = new HomePage(page);

            await login.login(user, 'Portal123!');
            console.log(`${label} Login successful`);
            await TestHelpers.waitPageLoad(page);

            await homePage.openChat();
            console.log(`${label} Opened Chat window`);

            const randomChat = chatList[Math.floor(Math.random() * chatList.length)];
            await homePage.sendMessageInChat(randomChat);
            console.log(`${label} Sent message in chat`);

            //div[@class='k-message-group k-no-avatar']//kendo-chat-message[@class='k-only k-message']//div[@class='k-chat-bubble']

            await TestHelpers.waitPageLoad(page);

            const lastMessage = await homePage.getLastChatMessage();
            console.log(`${label} Verified chat bot response is visible: ${lastMessage}`);

            await navigationPage.logout();
        });
    });
});

test.describe('Trigger 20 Search data with Link Tagging', () => {

    const searchData = {
        keywords: ['Automation', 'Testing', 'Playwright', 'Covid', 'HR Policies', 'Benefits', 'Payroll', 'Onboarding', 'Offboarding', 'Employee Engagement']
    };

    const pageLinkTag = TestEnvironmentConfig.getGotoUrl(TestEnvironmentConfig.PAGEVIEW_LINK_TAG_IDS.AVION_PAGE_DEVELOPER_TAG);

    // const pageLinkTag = 'https://hrportal-qa.ehr.com/smoke/goto?linkId=79'; // Tag datateam
    // const pageLinkTag = 'https://hrportal-qa.ehr.com/smoke/goto?linkId=78'; // Tag developer

    const pageName = TestEnvironmentConfig.PAGES.AVION;

    TestEnvironmentConfig.USERS.forEach(({ user, label }) => {
        test(`${label} Should be able to Trigger Document Click`, async ({ page }) => {
            const navigationPage = new NavigationPage(page);
            const login = new LoginPage(page);
            const homePage = new HomePage(page);

            await login.login(user, 'Portal123!');
            console.log(`${label} Login successful`);
            await TestHelpers.waitPageLoad(page);

            const newPage = await TestHelpers.goToPageLinkTag(page, pageLinkTag); // Tag developer
            console.log(`Navigated to Link Tagging Avion page`);

            // Generate random keyword with debugging
            const randomIndex = Math.floor(Math.random() * searchData.keywords.length);
            const randomKeyword = searchData.keywords[randomIndex];
            console.log(`Available keywords: ${searchData.keywords.join(', ')}`);
            console.log(`Random index: ${randomIndex}, Selected keyword: ${randomKeyword}`);

            await new HomePage(newPage).search(randomKeyword);
            console.log(`Performed search for: ${randomKeyword}`);

            // Wait for page load to complete after search
            await newPage.waitForLoadState('networkidle');
            await newPage.waitForLoadState('domcontentloaded');

            await expect(newPage.locator(new HomePage(newPage).searchCategoriesDiv)).toBeVisible({ timeout: 50000 });

            await new NavigationPage(newPage).logout();
        });
    });
});


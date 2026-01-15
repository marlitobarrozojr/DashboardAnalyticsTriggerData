
import { test as base, expect, chromium, type Page, type BrowserContext } from '@playwright/test';
import { LoginPage } from '../src/EmbarkUI/PageObjects/LoginPage';
import { EventsPage } from '../src/EmbarkUI/PageObjects/EventsPage';
import { PersonaBarPage } from '../src/EmbarkUI/PageObjects/PersonaBarPage';
import { NavigationPage } from '../src/EmbarkUI/PageObjects/NavigationPage';
import { HomePage } from '../src/EmbarkUI/PageObjects/HomePage';

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
test.describe('Trigger 10 Target Views for Page View Link Tagging', () => {
  const linkId = 'goto?linkId=10';
  const linkId2 = 'goto?linkId=22';

  test('Aviontwouser Should be able to Trigger Page View Link Tag Target Views', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    await loginAndGotoPageLinkTag(page, 'aviontwouser@26', 'Portal123!', linkId);
    await navigationPage.logout();
  });

  test('Avionthreeuser Should be able to Trigger Page View Link Tag Target Views', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    await loginAndGotoPageLinkTag(page, 'avionthreeuser@26', 'Portal123!', linkId);
    await navigationPage.logout();
  });

  test('Avionfouruser Should be able to Trigger Page View Link Tag Target Views', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    await loginAndGotoPageLinkTag(page, 'avionfouruser@26', 'Portal123!', linkId);
    await navigationPage.logout();
  });

  test('Avionfiveuser Should be able to Trigger Page View Link Tag Target Views', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    await loginAndGotoPageLinkTag(page, 'avionfiveuser@26', 'Portal123!', linkId);
    await navigationPage.logout();
  });

  test('Avionsixuser Should be able to Trigger Page View Link Tag Target Views', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    await loginAndGotoPageLinkTag(page, 'avionsixuser@26', 'Portal123!', linkId);
    await navigationPage.logout();
  });

  test('Avionsevenuser Should be able to Trigger Page View Link Tag Target Views', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    await loginAndGotoPageLinkTag(page, 'avionsevenuser@26', 'Portal123!', linkId);
    await navigationPage.logout();
  });

  test('Avioneightuser Should be able to Trigger Page View Link Tag Target Views', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    await loginAndGotoPageLinkTag(page, 'avioneightuser@26', 'Portal123!', linkId);
    await navigationPage.logout();
  });

  test('Avionnineuser Should be able to Trigger Page View Link Tag Target Views', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    await loginAndGotoPageLinkTag(page, 'avionnineuser@26', 'Portal123!', linkId);
    await navigationPage.logout();
  });

  test('Aviontenuser Should be able to Trigger Page View Link Tag Target Views', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    await loginAndGotoPageLinkTag(page, 'aviontenuser@26', 'Portal123!', linkId);
    await navigationPage.logout();
  });

  test('Avionelevenuser Should be able to Page View Link Tag Target Views', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    await loginAndGotoPageLinkTag(page, 'avionelevenuser@26', 'Portal123!', linkId);
    await navigationPage.logout();
  });

});

test.describe('Trigger 10 Target Views for Document Link Tagging', () => {
  const pageName = 'Avion';
  const sessionTagDocumentLink = `https://hrportal-qa.ehr.com/smoke/goto?linkId=12`;
  const sessionTagDocumentLink2 = `https://hrportal-qa.ehr.com/smoke/goto?linkId=55`;
  

  test(`aviontwouser Should be able to Trigger Session Tag Document View`, async ({ page }) => {
      const navigationPage = new NavigationPage(page);
      await loginAndGotoPage(page, 'aviontwouser@26', 'Portal123!', pageName);
      console.log(`aviontwouser Login successful and navigated to ${pageName} page`);

      await waitPageLoad(page);

      await goToDocumentLinkTagging(page, sessionTagDocumentLink);
      console.log(`Clicked on Document Link: ${sessionTagDocumentLink}`);

      await navigationPage.logout();
    });

    test(`avionthreeuser Should be able to Trigger Document View`, async ({ page }) => {
      const navigationPage = new NavigationPage(page);
      await loginAndGotoPage(page, 'avionthreeuser@26', 'Portal123!', pageName);
      console.log(`avionthreeuser Login successful and navigated to ${pageName} page`);

      await waitPageLoad(page);

      await goToDocumentLinkTagging(page, sessionTagDocumentLink);
      console.log(`Clicked on Document Link: ${sessionTagDocumentLink}`);

      await navigationPage.logout();
    });

    test(`avionfouruser Should be able to Trigger Document View`, async ({ page }) => {
      const navigationPage = new NavigationPage(page);
      await loginAndGotoPage(page, 'avionfouruser@26', 'Portal123!', pageName);
      console.log(`avionfouruser Login successful and navigated to ${pageName} page`);

      await waitPageLoad(page);

      await goToDocumentLinkTagging(page, sessionTagDocumentLink);
      console.log(`Clicked on Document Link: ${sessionTagDocumentLink}`);

      await navigationPage.logout();
    });

    test(`avionfiveuser Should be able to Trigger Document View`, async ({ page }) => {
      const navigationPage = new NavigationPage(page);
      await loginAndGotoPage(page, 'avionfiveuser@26', 'Portal123!', pageName);
      console.log(`avionfiveuser Login successful and navigated to ${pageName} page`);

      await waitPageLoad(page);

      await goToDocumentLinkTagging(page, sessionTagDocumentLink);
      console.log(`Clicked on Document Link: ${sessionTagDocumentLink}`);

      await navigationPage.logout();
    });

    test(`avionsixuser Should be able to Trigger Document View`, async ({ page }) => {
      const navigationPage = new NavigationPage(page);
      await loginAndGotoPage(page, 'avionsixuser@26', 'Portal123!', pageName);
      console.log(`avionsixuser Login successful and navigated to ${pageName} page`);

      await waitPageLoad(page);

      await goToDocumentLinkTagging(page, sessionTagDocumentLink);
      console.log(`Clicked on Document Link: ${sessionTagDocumentLink}`);

      await navigationPage.logout();
    });

    test(`avionsevenuser Should be able to Trigger Document View`, async ({ page }) => {
      const navigationPage = new NavigationPage(page);
      await loginAndGotoPage(page, 'avionsevenuser@26', 'Portal123!', pageName);
      console.log(`avionsevenuser Login successful and navigated to ${pageName} page`);

      await waitPageLoad(page);

      await goToDocumentLinkTagging(page, sessionTagDocumentLink);
      console.log(`Clicked on Document Link: ${sessionTagDocumentLink}`);

      await navigationPage.logout();
    });

    test(`avioneightuser Should be able to Trigger Document View`, async ({ page }) => {
      const navigationPage = new NavigationPage(page);
      await loginAndGotoPage(page, 'avioneightuser@26', 'Portal123!', pageName);
      console.log(`avioneightuser Login successful and navigated to ${pageName} page`);

      await waitPageLoad(page);

      await goToDocumentLinkTagging(page, sessionTagDocumentLink);
      console.log(`Clicked on Document Link: ${sessionTagDocumentLink}`);

      await navigationPage.logout();
    });

    test(`avionnineuser Should be able to Trigger Document View`, async ({ page }) => {
      const navigationPage = new NavigationPage(page);
      await loginAndGotoPage(page, 'avionnineuser@26', 'Portal123!', pageName);
      console.log(`avionnineuser Login successful and navigated to ${pageName} page`);

      await waitPageLoad(page);

      await goToDocumentLinkTagging(page, sessionTagDocumentLink);
      console.log(`Clicked on Document Link: ${sessionTagDocumentLink}`);

      await navigationPage.logout();
    });

    test(`aviontenuser Should be able to Trigger Document View`, async ({ page }) => {
      const navigationPage = new NavigationPage(page);
      await loginAndGotoPage(page, 'aviontenuser@26', 'Portal123!', pageName);
      console.log(`aviontenuser Login successful and navigated to ${pageName} page`);

      await waitPageLoad(page);

      await goToDocumentLinkTagging(page, sessionTagDocumentLink);
      console.log(`Clicked on Document Link: ${sessionTagDocumentLink}`);

      await navigationPage.logout();
    });

    test(`avionelevenuser Should be able to Trigger Document View`, async ({ page }) => {
      const navigationPage = new NavigationPage(page);
      await loginAndGotoPage(page, 'avionelevenuser@26', 'Portal123!', pageName);
      console.log(`avionelevenuser Login successful and navigated to ${pageName} page`);

      await waitPageLoad(page);

      await goToDocumentLinkTagging(page, sessionTagDocumentLink);
      console.log(`Clicked on Document Link: ${sessionTagDocumentLink}`);

      await navigationPage.logout();
    });
});

test.describe('Trigger PageView with Link Tag Page Views data', () => {
  const pageLinkTag = 'https://hrportal-qa.ehr.com/smoke/goto?linkId=22';

  test('Aviontwouser Should be able to Trigger PageView with Link Tag Page Views data', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const login = new LoginPage(page);

    await login.login('aviontwouser@26', 'Portal123!');
    console.log('aviontwouser@26 Login successful');

    await page.goto(pageLinkTag);
    await waitPageLoad(page);
    console.log(`Navigated to Link Test Data Page: ${pageLinkTag}`);

    await ClickPage(page, 'Technology Home Page');
    console.log('Clicked on Technology Home Page');

    await ClickPage(page, 'Data Table Auto');
    console.log('Clicked on Page Link Tagging: Data Table Auto');

    console.log('Completed all clicks on link tagging');

    await navigationPage.logout();
  });

  test('Avionthreeuser Should be able to Trigger PageView with Link Tag Page Views data', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const login = new LoginPage(page);

    await login.login('avionthreeuser@26', 'Portal123!');
    console.log('avionthreeuser@26 Login successful');

    await page.goto(pageLinkTag);
    await waitPageLoad(page);
    console.log(`Navigated to Link Test Data Page: ${pageLinkTag}`);

    await ClickPage(page, 'Technology Home Page');
    console.log('Clicked on Technology Home Page');

    await ClickPage(page, 'Data Table Auto');
    console.log('Clicked on Page Link Tagging: Data Table Auto');

    console.log('Completed all clicks on link tagging');

    await navigationPage.logout();
  });

  test('Avionfouruser Should be able to Trigger PageView with Link Tag Page Views data', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const login = new LoginPage(page);

    await login.login('avionfouruser@26', 'Portal123!');
    console.log('avionfouruser@26 Login successful');

    await page.goto(pageLinkTag);
    await waitPageLoad(page);
    console.log(`Navigated to Link Test Data Page: ${pageLinkTag}`);

    await ClickPage(page, 'Technology Home Page');
    console.log('Clicked on Technology Home Page');

    await ClickPage(page, 'Data Table Auto');
    console.log('Clicked on Page Link Tagging: Data Table Auto');

    console.log('Completed all clicks on link tagging');

    await navigationPage.logout();
  });

});

test.describe('Trigger 10 Page view', () => {
  test('Aviontwouser Should be able to Trigger Page view', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    await loginAndClickTarget(page, 'aviontwouser@26', 'Portal123!', 'AskHR');
    await navigationPage.logout();
  });

  test('Avionthreeuser Should be able to Trigger Page view', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    await loginAndClickTarget(page, 'avionthreeuser@26', 'Portal123!', 'Data Table Auto');
    await navigationPage.logout();
  });

  test('Avionfouruser Should be able to Trigger Page view', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    await loginAndClickTarget(page, 'avionfouruser@26', 'Portal123!', 'FAQs');
    await navigationPage.logout();
  });

  test('Avionfiveuser Should be able to Trigger Page view', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    await loginAndClickTarget(page, 'avionfiveuser@26', 'Portal123!', 'Technology Home Page');
    await navigationPage.logout();
  });

  test('Avionsixuser Should be able to Trigger Page view', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    await loginAndClickTarget(page, 'avionsixuser@26', 'Portal123!', 'AskHR');
    await navigationPage.logout();
  });

  test('Avionsevenuser Should be able to Trigger Page view', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    await loginAndClickTarget(page, 'avionsevenuser@26', 'Portal123!', 'Data Table Auto');
    await navigationPage.logout();
  });

  test('Avioneightuser Should be able to Trigger Page view', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    await loginAndClickTarget(page, 'avioneightuser@26', 'Portal123!', 'FAQs');
    await navigationPage.logout();
  });

  test('Avionnineuser Should be able to Trigger Page view', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    await loginAndClickTarget(page, 'avionnineuser@26', 'Portal123!', 'Technology Home Page');
    await navigationPage.logout();
  });

  test('Aviontenuser Should be able to Trigger Page view', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    await loginAndClickTarget(page, 'aviontenuser@26', 'Portal123!', 'FAQs');
    await navigationPage.logout();
  });

  test('Avionelevenuser Should be able to Trigger Page view', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    await loginAndClickTarget(page, 'avionelevenuser@26', 'Portal123!', 'Data Table Auto');
    await navigationPage.logout();
  });
});

test.describe('Trigger 10 Document Click', () => {

  test('aviontwouser Should be able to Trigger Document Click', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const login = new LoginPage(page);

    await login.login('aviontwouser@26', 'Portal123!');
    console.log('aviontwouser@26 Login successful');

    await ClickPage(page, 'Avion');
    console.log('aviontwouser Clicked on Avion');

    await ClickDocumentLink(page, 'AI Automation.docx');
    console.log('aviontwouser Clicked on Document Link: AI Automation.docx');

    await ClickDocumentLink(page, 'Playwright Automation.pdf');
    console.log('Clicked on Document Link: Playwright Automation.pdf');
    console.log('Completed all Document clicks');

    await navigationPage.logout();
  });

  test('avionthreeuser Should be able to Trigger Document Click', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const login = new LoginPage(page);

    await login.login('avionthreeuser@26', 'Portal123!');
    console.log('Login successful');

    await ClickPage(page, 'Avion');
    console.log('Clicked on Avion Auto pagege');

    await ClickDocumentLink(page, 'AI Automation.docx');
    console.log('Clicked on Document Link: AI Automation.docx');

    await ClickDocumentLink(page, 'Playwright Automation.pdf');
    console.log('Clicked on Document Link: Playwright Automation.pdf');

    console.log('Completed all Document clicks');

    await navigationPage.logout();
  });

  test('avionfouruser Should be able to Trigger Document Click', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const login = new LoginPage(page);

    await login.login('avionfouruser@26', 'Portal123!');
    console.log('Login successful');

    await ClickPage(page, 'Avion');
    console.log('avionfouruser Clicked on Avion page');

    await ClickDocumentLink(page, 'AI Automation.docx');
    console.log('Clicked on Document Link: AI Automation.docx');

    await ClickDocumentLink(page, 'Playwright Automation.pdf');
    console.log('Clicked on Document Link: Playwright Automation.pdf');

    console.log('Completed all Document clicks');

    await navigationPage.logout();
  });

  test('avionfiveuser Should be able to Trigger Document Click', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const login = new LoginPage(page);

    await login.login('avionfiveuser@26', 'Portal123!');
    console.log('Login successful');

    await ClickPage(page, 'Avion');
    console.log('avionfiveuser Clicked on Avion page');

    await ClickDocumentLink(page, 'AI Automation.docx');
    console.log('Clicked on Document Link: AI Automation.docx');

    await ClickDocumentLink(page, 'Playwright Automation.pdf');
    console.log('Clicked on Document Link: Playwright Automation.pdf');

    console.log('Completed all Document clicks');

    await navigationPage.logout();
  });

  test('avionsixuser Should be able to Trigger Document Click', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const login = new LoginPage(page);

    await login.login('avionsixuser@26', 'Portal123!');
    console.log('Login successful');

    await ClickPage(page, 'Avion');
    console.log('avionsixuser Clicked on Avion page');
    
    await ClickDocumentLink(page, 'AI Automation.docx');
    console.log('Clicked on Document Link: AI Automation.docx');

    await ClickDocumentLink(page, 'Playwright Automation.pdf');
    console.log('Clicked on Document Link: Playwright Automation.pdf');

    console.log('Completed all Document clicks');

    await navigationPage.logout();
  });

  test('avionsevenuser Should be able to Trigger Document Click', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const login = new LoginPage(page);

    await login.login('avionsevenuser@26', 'Portal123!');
    console.log('Login successful');

    await ClickPage(page, 'Avion');
    console.log('avionseven user Clicked on Avion page');
    
    await ClickDocumentLink(page, 'AI Automation.docx');
    console.log('Clicked on Document Link: AI Automation.docx');

    await ClickDocumentLink(page, 'Playwright Automation.pdf');
    console.log('Clicked on Document Link: Playwright Automation.pdf');

    console.log('Completed all Document clicks');

    await navigationPage.logout();
  });

  test('avioneightuser Should be able to Trigger Document Click', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const login = new LoginPage(page);

    await login.login('avioneightuser@26', 'Portal123!');
    console.log('Login successful');

    await ClickPage(page, 'Avion');
    console.log('avioneight user Clicked on Avion page');
    
    await ClickDocumentLink(page, 'AI Automation.docx');
    console.log('Clicked on Document Link: AI Automation.docx');

    await ClickDocumentLink(page, 'Playwright Automation.pdf');
    console.log('Clicked on Document Link: Playwright Automation.pdf');

    console.log('Completed all Document clicks');

    await navigationPage.logout();
  });

  test('avionnineuser Should be able to Trigger Document Click', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const login = new LoginPage(page);

    await login.login('avionnineuser@26', 'Portal123!');
    console.log('Login successful');

    await ClickPage(page, 'Avion');
    console.log('avionnine user Clicked on Avion page');
    
    await ClickDocumentLink(page, 'AI Automation.docx');
    console.log('Clicked on Document Link: AI Automation.docx');

    await ClickDocumentLink(page, 'Playwright Automation.pdf');
    console.log('Clicked on Document Link: Playwright Automation.pdf');

    console.log('Completed all Document clicks');

    await navigationPage.logout();
  });

  test('aviontenuser Should be able to Trigger Document Click', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const login = new LoginPage(page);

    await login.login('aviontenuser@26', 'Portal123!');
    console.log('Login successful');

    await ClickPage(page, 'Avion');
    console.log('avionten user Clicked on Avion page');
    
    await ClickDocumentLink(page, 'AI Automation.docx');
    console.log('Clicked on Document Link: AI Automation.docx');

    await ClickDocumentLink(page, 'Playwright Automation.pdf');
    console.log('Clicked on Document Link: Playwright Automation.pdf');

    console.log('Completed all Document clicks');

    await navigationPage.logout();
  });

  test('avionelevenuser Should be able to Trigger Document Click', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const login = new LoginPage(page);

    await login.login('avionelevenuser@26', 'Portal123!');
    console.log('Login successful');

    await ClickPage(page, 'Avion');
    console.log('avioneleven user Clicked on Avion page');
    
    await ClickDocumentLink(page, 'AI Automation.docx');
    console.log('Clicked on Document Link: AI Automation.docx');

    await ClickDocumentLink(page, 'Playwright Automation.pdf');
    console.log('Clicked on Document Link: Playwright Automation.pdf');

    console.log('Completed all Document clicks');

    await navigationPage.logout();
  });

});

test.describe('Trigger 10 data for Content group for Avion-CG', () => {

  const contentGroupUsers = [
    { username: 'avionelevenuser@26', contentGroup: 'Avion-CG', label: 'avionelevenuser' },
    { username: 'aviontwouser@26', contentGroup: 'Avion-CG', label: 'aviontwouser' },
    { username: 'avionthreeuser@26', contentGroup: 'Avion-CG', label: 'avionthreeuser' },
    { username: 'avionfouruser@26', contentGroup: 'Avion-CG', label: 'avionfouruser' },
    { username: 'avionfiveuser@26', contentGroup: 'Avion-CG', label: 'avionfiveuser' },
    { username: 'avionsixuser@26', contentGroup: 'Avion-CG', label: 'avionsixuser' },
    { username: 'avionsevenuser@26', contentGroup: 'Avion-CG', label: 'avionsevenuser' },
    { username: 'avioneightuser@26', contentGroup: 'Avion-CG', label: 'avioneightuser' },
    { username: 'avionnineuser@26', contentGroup: 'Avion-CG', label: 'avionnineuser' },
    { username: 'aviontenuser@26', contentGroup: 'Avion-CG', label: 'aviontenuser' },
  ];

  contentGroupUsers.forEach(({ username, contentGroup, label }) => {
    test(`${label} Should be able to Trigger Content Group`, async ({ page }) => {
      const navigationPage = new NavigationPage(page);
      const login = new LoginPage(page);

      await login.login(username, 'Portal123!');
      console.log('Login successful');

      await ClickPage(page, 'Avion');
      console.log('Clicked on Avion pa-Autoge');

      await ClickTextLink(page, contentGroup);
      console.log(`Clicked on ${contentGroup}`);

     // _For Auto DO NOT DELETE.pdf
      await waitPageLoad(page);

      await ClickDocumentLink(page, '_For Auto DO NOT DELETE.pdf');
      console.log('Clicked on _For Auto DO NOT DELETE.pdf');

      console.log('Completed all Content Group clicks');

      await navigationPage.logout();
    });
  });

});

test.describe('Trigger 10 data for Content group for Avion-CG with Page view link tagging', () => {

  const contentGroupUsers = [
    { username: 'avionelevenuser@26', contentGroup: 'Avion-CG', label: 'avionelevenuser' },
    { username: 'aviontwouser@26', contentGroup: 'Avion-CG', label: 'aviontwouser' },
    { username: 'avionthreeuser@26', contentGroup: 'Avion-CG', label: 'avionthreeuser' },
    { username: 'avionfouruser@26', contentGroup: 'Avion-CG', label: 'avionfouruser' },
    { username: 'avionfiveuser@26', contentGroup: 'Avion-CG', label: 'avionfiveuser' },
    { username: 'avionsixuser@26', contentGroup: 'Avion-CG', label: 'avionsixuser' },
    { username: 'avionsevenuser@26', contentGroup: 'Avion-CG', label: 'avionsevenuser' },
    { username: 'avioneightuser@26', contentGroup: 'Avion-CG', label: 'avioneightuser' },
    { username: 'avionnineuser@26', contentGroup: 'Avion-CG', label: 'avionnineuser' },
    { username: 'aviontenuser@26', contentGroup: 'Avion-CG', label: 'aviontenuser' },
  ];

  contentGroupUsers.forEach(({ username, contentGroup, label }) => {
    test(`${label} Should be able to Trigger Content Group`, async ({ page }) => {
      const navigationPage = new NavigationPage(page);
      const login = new LoginPage(page);

      await login.login(username, 'Portal123!');
      console.log('Login successful');

      await goToDocumentLinkTagging(page, 'https://hrportal-qa.ehr.com/smoke/goto?linkId=79');
      console.log(`Navigated to Page link Avion`);

       await waitPageLoad(page);

      await ClickTextLink(page, contentGroup);
      console.log(`Clicked on ${contentGroup}`);

      await ClickDocumentLink(page, '_For Auto DO NOT DELETE THIS.pdf');
      console.log('Clicked on _For Auto DO NOT DELETE THIS.pdf');

      // Page link tagging: https://hrportal-qa.ehr.com/smoke/goto?linkId=79      page: Avion                        Link name: Data Team                        tag: datateam  
      // Page link tagging: https://hrportal-qa.ehr.com/smoke/goto?linkId=61      page: Content Slider               Link name: Page link tag Content slider     tag: contentSlider
      // Page link tagging: https://hrportal-qa.ehr.com/smoke/goto?linkId=10      page: Links Test Data              Link name: AvionLinkTag                     tag: avion,avionLT
      // Page link tagging: https://hrportal-qa.ehr.com/smoke/goto?linkId=22      page: Links Test Data 

      console.log('Completed all Content Group clicks');

      await navigationPage.logout();
    });
  });

});

test.describe('Trigger 10 data for Content group for Avion-CG-Auto', () => {

  const contentGroupUsers = [
    { username: 'avionelevenuser@26', contentGroup: 'Avion-CG-Auto', label: 'avionelevenuser' },
    { username: 'aviontwouser@26', contentGroup: 'Avion-CG-Auto', label: 'aviontwouser' },
    { username: 'avionthreeuser@26', contentGroup: 'Avion-CG-Auto', label: 'avionthreeuser' },
    { username: 'avionfouruser@26', contentGroup: 'Avion-CG-Auto', label: 'avionfouruser' },
    { username: 'avionfiveuser@26', contentGroup: 'Avion-CG-Auto', label: 'avionfiveuser' },
    { username: 'avionsixuser@26', contentGroup: 'Avion-CG-Auto', label: 'avionsixuser' },
    { username: 'avionsevenuser@26', contentGroup: 'Avion-CG-Auto', label: 'avionsevenuser' },
    { username: 'avioneightuser@26', contentGroup: 'Avion-CG-Auto', label: 'avioneightuser' },
    { username: 'avionnineuser@26', contentGroup: 'Avion-CG-Auto', label: 'avionnineuser' },
    { username: 'aviontenuser@26', contentGroup: 'Avion-CG-Auto', label: 'aviontenuser' },
  ];

  contentGroupUsers.forEach(({ username, contentGroup, label }) => {
    test(`${label} Should be able to Trigger Content Group 2`, async ({ page }) => {
      const navigationPage = new NavigationPage(page);
      const login = new LoginPage(page);

      await login.login(username, 'Portal123!');
      console.log('Login successful');

      await ClickPage(page, 'Avion');
      console.log('Clicked on Avion page');

      await ClickTextLink(page, contentGroup);
      console.log(`Clicked on ${contentGroup}`);

     // _For Auto DO NOT DELETE.pdf
      await waitPageLoad(page);

      await ClickDocumentLink(page, '_For Auto DO NOT DELETE.pdf');
      console.log('Clicked on _For Auto DO NOT DELETE.pdf');

      console.log('Completed all Content Group clicks');

      await navigationPage.logout();
    });
  });

});

test.describe('Trigger 10 data for Content group for Avion-CG-Auto with Page view link tagging', () => {

  const contentGroupUsers = [
    { username: 'avionelevenuser@26', contentGroup: 'Avion-CG-Auto', label: 'avionelevenuser' },
    { username: 'aviontwouser@26', contentGroup: 'Avion-CG-Auto', label: 'aviontwouser' },
    { username: 'avionthreeuser@26', contentGroup: 'Avion-CG-Auto', label: 'avionthreeuser' },
    { username: 'avionfouruser@26', contentGroup: 'Avion-CG-Auto', label: 'avionfouruser' },
    { username: 'avionfiveuser@26', contentGroup: 'Avion-CG-Auto', label: 'avionfiveuser' },
    { username: 'avionsixuser@26', contentGroup: 'Avion-CG-Auto', label: 'avionsixuser' },
    { username: 'avionsevenuser@26', contentGroup: 'Avion-CG-Auto', label: 'avionsevenuser' },
    { username: 'avioneightuser@26', contentGroup: 'Avion-CG-Auto', label: 'avioneightuser' },
    { username: 'avionnineuser@26', contentGroup: 'Avion-CG-Auto', label: 'avionnineuser' },
    { username: 'aviontenuser@26', contentGroup: 'Avion-CG-Auto', label: 'aviontenuser' },
  ];

  contentGroupUsers.forEach(({ username, contentGroup, label }) => {
    test(`${label} Should be able to Trigger Content Group 2`, async ({ page }) => {
      const navigationPage = new NavigationPage(page);
      const login = new LoginPage(page);

      await login.login(username, 'Portal123!');
      console.log('Login successful');

      await goToDocumentLinkTagging(page, 'https://hrportal-qa.ehr.com/smoke/goto?linkId=78');
      console.log(`Navigated to Page link Avion`);

      await ClickTextLink(page, contentGroup);
      console.log(`Clicked on ${contentGroup}`);

      await waitPageLoad(page);

      await ClickDocumentLink(page, '_For Auto RESTORE and DELETE.docx');
      console.log('Clicked on _For Auto RESTORE and DELETE.docx');

      // Page link tagging: https://hrportal-qa.ehr.com/smoke/goto?linkId=61      page: Content Slider               Link name: Page link tag Content slider     tag: contentSlider
      // Page link tagging: https://hrportal-qa.ehr.com/smoke/goto?linkId=10      page: Links Test Data              Link name: AvionLinkTag                     tag: avion,avionLT
      // Page link tagging: https://hrportal-qa.ehr.com/smoke/goto?linkId=22      page: Links Test Data 
      // https://hrportal-qa.ehr.com/smoke/goto?linkId=78                         page: Avion                       Link name: Document link tag Doc     tag: documentLinkTagDoc

      console.log('Completed all Content Group clicks');

      await navigationPage.logout();
    });
  });

});


test.describe('Trigger 10 data for EVA', () => {

  const contentGroupUsers = [
    { username: 'avionelevenuser@26', label: 'avionelevenuser', question: 'Software testing' },
    { username: 'aviontwouser@26', label: 'aviontwouser', question: 'AskHr' },
    { username: 'avionthreeuser@26', label: 'avionthreeuser', question: 'Covid' },
    { username: 'avionfouruser@26',label: 'avionfouruser', question: 'AI Automation' },
    { username: 'avionfiveuser@26',label: 'avionfiveuser', question: 'Smoke Testing' },
    { username: 'avionsixuser@26', label: 'avionsixuser', question: 'Benefits' },
    { username: 'avionsevenuser@26', label: 'avionsevenuser', question: 'Salary'  },
    { username: 'avioneightuser@26', label: 'avioneightuser', question: 'FAQs' },
    { username: 'avionnineuser@26',label: 'avionnineuser', question: 'Technology Trends' },
    { username: 'aviontenuser@26', label: 'aviontenuser', question: 'investment' },
  ];

  contentGroupUsers.forEach(({ username, label, question }) => {
    test(`${label} Should be able to send message to chat bot`, async ({ page }) => {
      const navigationPage = new NavigationPage(page);
      const login = new LoginPage(page);
      const homePage = new HomePage(page);

      await login.login(username, 'Portal123!');
      console.log(`${label} Login successful`);

     // _For Auto DO NOT DELETE.pdf
      await waitPageLoad(page);

      await homePage.openChat();
      console.log(`${label} Opened Chat window`);

      await homePage.sendMessageInChat(question);
      console.log(`${label} Sent message in chat`);

      //div[@class='k-message-group k-no-avatar']//kendo-chat-message[@class='k-only k-message']//div[@class='k-chat-bubble']

      await waitPageLoad(page);

      const lastMessage = await homePage.getLastChatMessage();
      console.log(`${label} Verified chat bot response is visible: ${lastMessage}`);

      await navigationPage.logout();
    });
  });

});

test.describe('Search data Trigger', () => {

  const searchData = {
      keywords: ['Automation', 'Testing', 'Playwright', 'Covid', 'HR Policies', 'Benefits', 'Payroll', 'Onboarding', 'Offboarding', 'Employee Engagement']
    };

  // const pageLinkTag = 'https://hrportal-qa.ehr.com/smoke/goto?linkId=79'; // Tag datateam
  const pageLinkTag = 'https://hrportal-qa.ehr.com/smoke/goto?linkId=78'; // Tag developer

  test('aviontwouser Should be able to Trigger Search', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const login = new LoginPage(page);
    const homePage = new HomePage(page);

    await login.login('aviontwouser@26', 'Portal123!');
    console.log('Login successful');

    await goToPageLinkTag(page, pageLinkTag); // Tag datateam
    console.log(`Navigated to Link Tagging Avion page`);

    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');

    await homePage.search('Automation');
    console.log('Performed search for Automation');

    await expect(page.locator(homePage.searchCategoriesDiv)).toBeVisible({ timeout: 50000 });

    await navigationPage.logout();
  });

  test('avionthreeuser Should be able to Trigger Search', async ({ page }) => {

    const navigationPage = new NavigationPage(page);
    const login = new LoginPage(page);
    const homePage = new HomePage(page);

    await login.login('avionthreeuser@26', 'Portal123!');
    console.log('Login successful');

    await goToPageLinkTag(page, pageLinkTag); // Tag datateam
    console.log(`Navigated to Link Tagging Avion page`);

    // Generate random keyword with debugging
    const randomIndex = Math.floor(Math.random() * searchData.keywords.length);
    const randomKeyword = searchData.keywords[randomIndex];
    console.log(`Available keywords: ${searchData.keywords.join(', ')}`);
    console.log(`Random index: ${randomIndex}, Selected keyword: ${randomKeyword}`);

    await homePage.search(randomKeyword);
    console.log(`Performed search for: ${randomKeyword}`);

    // Wait for page load to complete after search
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator(homePage.searchCategoriesDiv)).toBeVisible({ timeout: 50000 });

    await navigationPage.logout();
  });

  test('avionfouruser Should be able to Trigger Search', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const login = new LoginPage(page);
    const homePage = new HomePage(page);

    await login.login('avionfouruser@26', 'Portal123!');
    console.log('Login successful');

    await goToPageLinkTag(page, pageLinkTag); // Tag datateam
    console.log(`Navigated to Link Tagging Avion page`);

    // Generate random keyword with debugging
    const randomIndex = Math.floor(Math.random() * searchData.keywords.length);
    const randomKeyword = searchData.keywords[randomIndex];
    console.log(`Available keywords: ${searchData.keywords.join(', ')}`);
    console.log(`Random index: ${randomIndex}, Selected keyword: ${randomKeyword}`);

    await homePage.search(randomKeyword);
    console.log(`Performed search for: ${randomKeyword}`);

    // Wait for page load to complete after search
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator(homePage.searchCategoriesDiv)).toBeVisible({ timeout: 50000 });

    await navigationPage.logout();
  });

  test('avionfiveuser Should be able to Trigger Search', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const login = new LoginPage(page);
    const homePage = new HomePage(page);

    await login.login('avionfiveuser@26', 'Portal123!');
    console.log('Login successful');

    await goToPageLinkTag(page, pageLinkTag); // Tag datateam
    console.log(`Navigated to Link Tagging Avion page`);

    // Generate random keyword with debugging
    const randomIndex = Math.floor(Math.random() * searchData.keywords.length);
    const randomKeyword = searchData.keywords[randomIndex];
    console.log(`Available keywords: ${searchData.keywords.join(', ')}`);
    console.log(`Random index: ${randomIndex}, Selected keyword: ${randomKeyword}`);

    await homePage.search(randomKeyword);
    console.log(`Performed search for: ${randomKeyword}`);

    // Wait for page load to complete after search
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator(homePage.searchCategoriesDiv)).toBeVisible({ timeout: 50000 });

    await navigationPage.logout();
  });

  test('avionsixuser Should be able to Trigger Search', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const login = new LoginPage(page);
    const homePage = new HomePage(page);

    await login.login('avionsixuser@26', 'Portal123!');
    console.log('Login successful');

    await goToPageLinkTag(page, pageLinkTag); // Tag datateam
    console.log(`Navigated to Link Tagging Avion page`);

    // Generate random keyword with debugging
    const randomIndex = Math.floor(Math.random() * searchData.keywords.length);
    const randomKeyword = searchData.keywords[randomIndex];
    console.log(`Available keywords: ${searchData.keywords.join(', ')}`);
    console.log(`Random index: ${randomIndex}, Selected keyword: ${randomKeyword}`);

    await homePage.search(randomKeyword);
    console.log(`Performed search for: ${randomKeyword}`);

    // Wait for page load to complete after search
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator(homePage.searchCategoriesDiv)).toBeVisible({ timeout: 50000 });

    await navigationPage.logout();
  });

  test('avionsevenuser Should be able to Trigger Search', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const login = new LoginPage(page);
    const homePage = new HomePage(page);

    await login.login('avionsevenuser@26', 'Portal123!');
    console.log('Login successful');

    await goToPageLinkTag(page, pageLinkTag); // Tag datateam
    console.log(`Navigated to Link Tagging Avion page`);

    // Generate random keyword with debugging
    const randomIndex = Math.floor(Math.random() * searchData.keywords.length);
    const randomKeyword = searchData.keywords[randomIndex];
    console.log(`Available keywords: ${searchData.keywords.join(', ')}`);
    console.log(`Random index: ${randomIndex}, Selected keyword: ${randomKeyword}`);

    await homePage.search(randomKeyword);
    console.log(`Performed search for: ${randomKeyword}`);

    // Wait for page load to complete after search
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator(homePage.searchCategoriesDiv)).toBeVisible({ timeout: 50000 });

    await navigationPage.logout();
  });

  test('avioneightuser Should be able to Trigger Search', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const login = new LoginPage(page);
    const homePage = new HomePage(page);

    await login.login('avioneightuser@26', 'Portal123!');
    console.log('Login successful');

    await goToPageLinkTag(page, pageLinkTag); // Tag datateam
    console.log(`Navigated to Link Tagging Avion page`);

    // Generate random keyword with debugging
    const randomIndex = Math.floor(Math.random() * searchData.keywords.length);
    const randomKeyword = searchData.keywords[randomIndex];
    console.log(`Available keywords: ${searchData.keywords.join(', ')}`);
    console.log(`Random index: ${randomIndex}, Selected keyword: ${randomKeyword}`);

    await homePage.search(randomKeyword);
    console.log(`Performed search for: ${randomKeyword}`);

    // Wait for page load to complete after search
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator(homePage.searchCategoriesDiv)).toBeVisible({ timeout: 50000 });

    await navigationPage.logout();
  });

  test('avionnineuser Should be able to Trigger Search', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const login = new LoginPage(page);
    const homePage = new HomePage(page);

    await login.login('avionnineuser@26', 'Portal123!');
    console.log('Login successful');

    await goToPageLinkTag(page, pageLinkTag); // Tag datateam
    console.log(`Navigated to Link Tagging Avion page`);

    // Generate random keyword with debugging
    const randomIndex = Math.floor(Math.random() * searchData.keywords.length);
    const randomKeyword = searchData.keywords[randomIndex];
    console.log(`Available keywords: ${searchData.keywords.join(', ')}`);
    console.log(`Random index: ${randomIndex}, Selected keyword: ${randomKeyword}`);

    await homePage.search(randomKeyword);
    console.log(`Performed search for: ${randomKeyword}`);

    // Wait for page load to complete after search
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator(homePage.searchCategoriesDiv)).toBeVisible({ timeout: 50000 });

    await navigationPage.logout();
  });

  test('aviontenuser Should be able to Trigger Search', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const login = new LoginPage(page);
    const homePage = new HomePage(page);

    await login.login('aviontenuser@26', 'Portal123!');
    console.log('Login successful');

    await goToPageLinkTag(page, pageLinkTag); // Tag datateam
    console.log(`Navigated to Link Tagging Avion page`);

    // Generate random keyword with debugging
    const randomIndex = Math.floor(Math.random() * searchData.keywords.length);
    const randomKeyword = searchData.keywords[randomIndex];
    console.log(`Available keywords: ${searchData.keywords.join(', ')}`);
    console.log(`Random index: ${randomIndex}, Selected keyword: ${randomKeyword}`);

    await homePage.search(randomKeyword);
    console.log(`Performed search for: ${randomKeyword}`);

    // Wait for page load to complete after search
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator(homePage.searchCategoriesDiv)).toBeVisible({ timeout: 50000 });

    await navigationPage.logout();
  });

  test('avionelevenuser Should be able to Trigger Search', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const login = new LoginPage(page);
    const homePage = new HomePage(page);

    await login.login('avionelevenuser@26', 'Portal123!');
    console.log('Login successful');

    await goToPageLinkTag(page, pageLinkTag); // Tag datateam
    console.log(`Navigated to Link Tagging Avion page`);

    // Generate random keyword with debugging
    const randomIndex = Math.floor(Math.random() * searchData.keywords.length);
    const randomKeyword = searchData.keywords[randomIndex];
    console.log(`Available keywords: ${searchData.keywords.join(', ')}`);
    console.log(`Random index: ${randomIndex}, Selected keyword: ${randomKeyword}`);

    await homePage.search(randomKeyword);
    console.log(`Performed search for: ${randomKeyword}`);

    // Wait for page load to complete after search
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator(homePage.searchCategoriesDiv)).toBeVisible({ timeout: 50000 });

    await navigationPage.logout();
  });

});



async function loginAndClickTarget(
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

async function ClickPage(
  page: Page,
  pageName: string
): Promise<void> {

  const targetLocator = page.locator(`//span[text()="${pageName}"]`);
  await expect(targetLocator).toBeVisible({ timeout: 10000 });
  await targetLocator.click();
}

async function ClickTextLink(
  page: Page,
  text: string
): Promise<void> {

  const targetLocator = page.locator(`//a[text()="${text}"]`);
  await expect(targetLocator).toBeVisible({ timeout: 10000 });
  await targetLocator.click();
}

async function ClickDocumentLink(
  page: Page,
  text: string
): Promise<void> {

  const targetLocator = page.locator(`//a[normalize-space()="${text}"]`);
  await expect(targetLocator).toBeVisible({ timeout: 40000 });
  await targetLocator.click();
}

// Document view trigger
async function loginAndClickDocument(page: Page, username: string, password: string, text: string): Promise<void> {
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
async function loginAndGotoPageLinkTag(page: Page, username: string, password: string, pageName: string): Promise<Page> {
  const loginPage = new LoginPage(page);
  await loginPage.login(username, password);
  
  // Replace whitespace in pageName with hyphens
  // const sanitizedPageName = pageName.replace(/\s+/g, '-');
  // Open the URL in a new tab
  // const context = page.context();
  // const newPage = await context.newPage();
  // await newPage.goto(`https://hrportal-qa.ehr.com/smoke/${pageName}`);
                      // https://hrportal-qa.ehr.com/smoke/goto?linkId=12

  await  goToPageLinkTag(page, `https://hrportal-qa.ehr.com/smoke/${pageName}`);
  
  return page;
}

async function loginAndGotoPage(page: Page, username: string, password: string, pageName: string): Promise<void> {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  await loginPage.login(username, password);
  await page.click(homePage.getPageLink(pageName));
}

// Wait until page load is complete
async function waitPageLoad(page: Page): Promise<void> {
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');
}

async function goToDocumentLinkTagging(page: Page, link: string): Promise<void> {
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

async function goToPageLinkTag(page: Page, link: string): Promise<void> {
  const context = page.context();
  const newPage = await context.newPage();
  await newPage.goto(link);
  console.log(`Navigated to Page Link Tag: ${link}`);
}
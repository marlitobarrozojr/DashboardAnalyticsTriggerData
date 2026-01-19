/**
 * TestEnvironmentConfig - Test Environment Configuration Management
 * 
 * Centralized configuration and parameter management for HR Portal QA testing.
 * Contains all test data, URLs, credentials, and utility methods used across test suites.
 * Supports multiple environments: IaaS (Infrastructure as a Service) and PaaS (Platform as a Service)
 */

export class TestEnvironmentConfig {
  // Environment types
  static readonly ENVIRONMENTS = {
    IAAS: 'iaas',
    PAAS: 'paas'
  } as const;
  
  // Environment-specific configurations
  static readonly ENV_CONFIG = {
    [TestEnvironmentConfig.ENVIRONMENTS.IAAS]: {
      BASE_URL: 'https://hrportal-qa.ehr.com',
    },
    [TestEnvironmentConfig.ENVIRONMENTS.PAAS]: {
      BASE_URL: 'https://experience-qa.ehr.com',
    }
  } as const;
  
  // Current environment (default to IaaS)
  static currentEnvironment: typeof TestEnvironmentConfig.ENVIRONMENTS[keyof typeof TestEnvironmentConfig.ENVIRONMENTS] = TestEnvironmentConfig.ENVIRONMENTS.IAAS;
  
  // Dynamic URLs based on current environment
  static get BASE_URL(): string {
    return TestEnvironmentConfig.ENV_CONFIG[TestEnvironmentConfig.currentEnvironment].BASE_URL;
  }
  
  static get SMOKE_URL(): string {
    return `${TestEnvironmentConfig.BASE_URL}/smoke`;
  }
  
  // Common credentials password
  static readonly DEFAULT_PASSWORD = 'Portal123!';
  
  // usernames for testing
  static readonly USERS = [
    { user: 'aviononeeuser@26', label: 'aviononeeuser' },
    { user: 'aviontwouser@26', label: 'aviontwouser' },
    { user: 'avionthreeuser@26', label: 'avionthreeuser'},
    { user: 'avionfouruser@26', label: 'avionfouruser'},
    { user: 'avionfiveuser@26', label: 'avionfiveuser'},
    { user: 'avionsixuser@26', label: 'avionsixuser'},
    { user: 'avionsevenuser@26', label: 'avionsevenuser'},
    { user: 'avioneightuser@26', label: 'avioneightuser'},
    { user: 'avionnineuser@26', label: 'avionnineuser'},
    { user: 'aviontenuser@26', label: 'aviontenuser'},
    { user: 'avionelevenuser@26', label: 'avionelevenuser'},
    { user: 'aviontwelveuser@26', label: 'aviontwelveuser'},
    { user: 'avionthirteenuser@26', label: 'avionthirteenuser'},
    { user: 'avionfourteenuser@26', label: 'avionfourteenuser'},
    { user: 'avionfifteenuser@26', label: 'avionfifteenuser'},
    { user: 'avionsixteenuser@26', label: 'avionsixteenuser'},
    { user: 'avionseventeenuser@26', label: 'avionseventeenuser'},
    { user: 'avioneighteenuser@26', label: 'avioneighteenuser'},
    { user: 'avionnineteenuser@26', label: 'avionnineteenuser'},
    { user: 'aviontwentyuser@26', label: 'aviontwentyuser'}
    
    // { user: 'aviononeuser@3', label: 'aviononeeuser' },
    // { user: 'aviontwouser@3', label: 'aviontwouser' },
    // { user: 'avionthreeuser@3', label: 'avionthreeuser'},
    // { user: 'avionfouruser@3', label: 'avionfouruser'},
    // { user: 'avionfiveuser@3', label: 'avionfiveuser'},
    // { user: 'avionsixuser@3', label: 'avionsixuser'},
    // { user: 'avionsevenuser@3', label: 'avionsevenuser'},
    // { user: 'avioneightuser@3', label: 'avioneightuser'},
    // { user: 'avionnineuser@3', label: 'avionnineuser'},
    // { user: 'aviontenuser@3', label: 'aviontenuser'},
    // { user: 'avionelevenuser@3', label: 'avionelevenuser'},
    // { user: 'aviontwelveuser@3', label: 'aviontwelveuser'},
    // { user: 'avionthirteenuser@3', label: 'avionthirteenuser'},
    // { user: 'avionfourteenuser@3', label: 'avionfourteenuser'},
    // { user: 'avionfifthteen@3', label: 'avionfifteenuser'},
    // { user: 'avionsixteen@3', label: 'avionsixteenuser'},
    // { user: 'avionseventeen@3', label: 'avionseventeenuser'},
    // { user: 'avioneigthteen@3', label: 'avioneighteenuser'},
    // { user: 'avionnineteen@3', label: 'avionnineteenuser'},
    // { user: 'aviontwentyuser@3', label: 'aviontwentyuser'}
  ] as const;

  static readonly QUESTIONS = [

  ] as const;
  
  // Link IDs for page link tagging
  static readonly LINK_IDS = {
    CONTENT_SLIDER: '61',
    LINKS_TEST_DATA: '10',
    AVION_LT_DATA: '22',
    AI_AUTOMATION_DOC: '12',
    SMOKE_TESTING_DOC: '55'
  } as const;

  // Link IDs for page link tagging
  static readonly PAGEVIEW_LINK_TAG_IDS = {
    CONTENT_SLIDER: '61',
    LINKS_TEST_DATA: '10',
    AVION_LT_DATA: '22',
    AVION_PAGE_LT: '37',
    AVION_PAGE_DEVELOPER_TAG: '78',
    AVION_PAGE_DATATEAM_TAG: '79'
  } as const;

  // Link IDs for document link tagging
  static readonly DOCUMENT_LINK_TAG_IDS = {
    AI_AUTOMATION_DOC: '12',
    SMOKE_TESTING_DOC: '55'
  } as const;

  static readonly PAGEVIEWS_LINK_TAG_PAAS = {
    AVION_LINK_TAGGING: '367'
  } as const;
  
  // Timeouts and waits (in milliseconds)
  static readonly TIMEOUTS = {
    DEFAULT: 3000,
    VISIBILITY: 10000,
    DOWNLOAD: 30000,
    WAIT_AFTER_ACTION: 2000,
    NETWORK_IDLE: 5000
  } as const;
  
  // Page names
  static readonly PAGES = {
    AVION: 'Avion',
    CONTENT_SLIDER: 'Content Slider',
    LINKS_TEST_DATA: 'Links Test Data'
  } as const;
  
  // Document types
  static readonly DOCUMENT_TYPES = {
    AI_AUTOMATION: 'AI Automation.docs',
    SMOKE_TESTING: 'Smoke Testing.docx',
    FOR_AUTO_DO_NOT_DELETE_DOCUMENT: '_For Auto DO NOT DELETE.pdf'
  } as const;
  
  /**
   * Set the current testing environment
   * @param environment - The environment to switch to (iaas or paas)
   */
  static setEnvironment(environment: typeof TestEnvironmentConfig.ENVIRONMENTS[keyof typeof TestEnvironmentConfig.ENVIRONMENTS]): void {
    TestEnvironmentConfig.currentEnvironment = environment;
    console.log(`Environment switched to: ${environment.toUpperCase()}`);
    console.log(`Base URL: ${TestEnvironmentConfig.BASE_URL}`);
  }
  
  /**
   * Get current environment information
   * @returns Current environment configuration object
   */
  static getCurrentEnvironment() {
    return {
      environment: TestEnvironmentConfig.currentEnvironment,
      config: TestEnvironmentConfig.ENV_CONFIG[TestEnvironmentConfig.currentEnvironment]
    };
  }
  
  /**
   * Generate goto URLs for link tagging tests
   * @param linkId - The link ID to append to the goto URL
   * @returns Full URL for goto link tagging
   */
  static getGotoUrl(linkId: string): string {
    return `${TestEnvironmentConfig.SMOKE_URL}/goto?linkId=${linkId}`;
    // https://hrportal-qa.ehr.com/smoke/
  }
  
  /**
   * Generate page URLs for navigation tests
   * @param pageName - The page name to append to the smoke URL
   * @returns Full URL for page navigation
   */
  static getPageUrl(pageName: string): string {
    return `${TestEnvironmentConfig.SMOKE_URL}/${pageName}`;
  }
  
  /**
   * Get user credentials object
   * @param username - The username to get credentials for
   * @returns Object containing username and password
   */
  static getUserCredentials(username: string): { username: string; password: string } {
    return {
      username,
      password: TestEnvironmentConfig.DEFAULT_PASSWORD
    };
  }
  
  /**
   * Get all available test users as an array
   * @returns Array of all test user usernames
   */
  static getAllUsers(): string[] {
    return TestEnvironmentConfig.USERS.map(u => u.user);
  }
  
  /**
   * Get document link URL by link ID
   * @param linkId - The document link ID
   * @returns Full document link URL
   */
  static getUrl(linkId: string): string {
    return TestEnvironmentConfig.getGotoUrl(linkId);
  }
  
  /**
   * Check if a username is a valid test user
   * @param username - Username to validate
   * @returns True if username exists in USERS constant
   */
  static isValidUser(username: string): boolean {
    return Object.values(TestEnvironmentConfig.USERS).includes(username as any);
  }
}

// Type definitions for better TypeScript support
export type TestUser = typeof TestEnvironmentConfig.USERS[keyof typeof TestEnvironmentConfig.USERS];
export type LinkId = typeof TestEnvironmentConfig.LINK_IDS[keyof typeof TestEnvironmentConfig.LINK_IDS];
export type PageName = typeof TestEnvironmentConfig.PAGES[keyof typeof TestEnvironmentConfig.PAGES];
export type DocumentType = typeof TestEnvironmentConfig.DOCUMENT_TYPES[keyof typeof TestEnvironmentConfig.DOCUMENT_TYPES];
export type Environment = typeof TestEnvironmentConfig.ENVIRONMENTS[keyof typeof TestEnvironmentConfig.ENVIRONMENTS];

export interface UserCredentials {
  username: string;
  password: string;
}

export interface EnvironmentConfig {
  BASE_URL: string;
}
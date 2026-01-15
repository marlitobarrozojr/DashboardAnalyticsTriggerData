/**
 * Environment Configuration Manager
 * Centralizes all environment variable access with type safety
 */

export interface EnvironmentConfig {
  // URLs
  baseUrl: string;
  loginUrl: string;
  
  // Browser settings
  headless: boolean;
  browserTimeout: number;
  viewportWidth: number;
  viewportHeight: number;
  
  // Test settings
  testTimeout: number;
  expectTimeout: number;
  retries: number;
  workers: number;
  parallel: boolean;
  
  // User credentials
  users: {
    aviontwo: { username: string; password: string };
    avionthree: { username: string; password: string };
    avionfour: { username: string; password: string };
    avionfive: { username: string; password: string };
    avionsix: { username: string; password: string };
    avionseven: { username: string; password: string };
    avioneight: { username: string; password: string };
    avionnine: { username: string; password: string };
    avionten: { username: string; password: string };
    avioneleven: { username: string; password: string };
  };
  
  // Link IDs
  linkIds: {
    pageView: string;
    documentView: string;
    smoke: string;
    linksTest: string;
  };
  
  // Debug settings
  debugMode: boolean;
  slowMo: number;
  consoleLogs: boolean;
}

class EnvironmentManager {
  private static instance: EnvironmentManager;
  private config: EnvironmentConfig;

  private constructor() {
    this.config = this.loadConfiguration();
  }

  public static getInstance(): EnvironmentManager {
    if (!EnvironmentManager.instance) {
      EnvironmentManager.instance = new EnvironmentManager();
    }
    return EnvironmentManager.instance;
  }

  private loadConfiguration(): EnvironmentConfig {
    const defaultPassword = process.env.DEFAULT_PASSWORD || 'Portal123!';
    
    return {
      // URLs
      baseUrl: process.env.BASE_URL || 'https://hrportal-qa.ehr.com',
      loginUrl: process.env.LOGIN_URL || 'https://hrportal-qa.ehr.com/smoke/login?mode=standard',
      
      // Browser settings
      headless: process.env.HEADLESS === 'true',
      browserTimeout: parseInt(process.env.BROWSER_TIMEOUT || '90000'),
      viewportWidth: parseInt(process.env.VIEWPORT_WIDTH || '1920'),
      viewportHeight: parseInt(process.env.VIEWPORT_HEIGHT || '1080'),
      
      // Test settings
      testTimeout: parseInt(process.env.TEST_TIMEOUT || '120000'),
      expectTimeout: parseInt(process.env.EXPECT_TIMEOUT || '30000'),
      retries: parseInt(process.env.RETRIES || '0'),
      workers: parseInt(process.env.WORKERS || '4'),
      parallel: process.env.PARALLEL === 'true',
      
      // User credentials
      users: {
        aviontwo: {
          username: process.env.TEST_USER_AVIONTWO || 'aviontwouser@26',
          password: defaultPassword
        },
        avionthree: {
          username: process.env.TEST_USER_AVIONTHREE || 'avionthreeuser@26',
          password: defaultPassword
        },
        avionfour: {
          username: process.env.TEST_USER_AVIONFOUR || 'avionfouruser@26',
          password: defaultPassword
        },
        avionfive: {
          username: process.env.TEST_USER_AVIONFIVE || 'avionfiveuser@26',
          password: defaultPassword
        },
        avionsix: {
          username: process.env.TEST_USER_AVIONSIX || 'avionsixuser@26',
          password: defaultPassword
        },
        avionseven: {
          username: process.env.TEST_USER_AVIONSEVEN || 'avionsevenuser@26',
          password: defaultPassword
        },
        avioneight: {
          username: process.env.TEST_USER_AVIONEIGHT || 'avioneightuser@26',
          password: defaultPassword
        },
        avionnine: {
          username: process.env.TEST_USER_AVIONNINE || 'avionnineuser@26',
          password: defaultPassword
        },
        avionten: {
          username: process.env.TEST_USER_AVIONTEN || 'aviontenuser@26',
          password: defaultPassword
        },
        avioneleven: {
          username: process.env.TEST_USER_AVIONELEVEN || 'avionelevenuser@26',
          password: defaultPassword
        }
      },
      
      // Link IDs
      linkIds: {
        pageView: process.env.LINK_ID_PAGE_VIEW || 'goto?linkId=10',
        documentView: process.env.LINK_ID_DOCUMENT_VIEW || 'goto?linkId=12',
        smokeDoc: process.env.LINK_ID_SMOKE_DOC || 'goto?linkId=55',
        linksTest: process.env.LINK_ID_LINKS_TEST || 'goto?linkId=22'
      },
      
      // Debug settings
      debugMode: process.env.DEBUG_MODE === 'true',
      slowMo: parseInt(process.env.SLOW_MO || '0'),
      consoleLogs: process.env.CONSOLE_LOGS === 'true'
    };
  }

  public getConfig(): EnvironmentConfig {
    return this.config;
  }

  public getUser(userKey: keyof EnvironmentConfig['users']) {
    return this.config.users[userKey];
  }

  public getLinkId(linkType: keyof EnvironmentConfig['linkIds']): string {
    return this.config.linkIds[linkType];
  }

  public getBaseUrl(): string {
    return this.config.baseUrl;
  }

  public getLoginUrl(): string {
    return this.config.loginUrl;
  }

  public isDebugMode(): boolean {
    return this.config.debugMode;
  }

  public logConfig(): void {
    if (this.config.consoleLogs) {
      console.log('🔧 Environment Configuration:');
      console.log(`   Environment: ${process.env.NODE_ENV || 'default'}`);
      console.log(`   Base URL: ${this.config.baseUrl}`);
      console.log(`   Headless: ${this.config.headless}`);
      console.log(`   Workers: ${this.config.workers}`);
      console.log(`   Retries: ${this.config.retries}`);
      console.log(`   Debug Mode: ${this.config.debugMode}`);
    }
  }
}

// Export singleton instance
export const envConfig = EnvironmentManager.getInstance().getConfig();
export const envManager = EnvironmentManager.getInstance();

// Helper functions for common operations
export function getTestUser(userKey: keyof EnvironmentConfig['users']) {
  return envManager.getUser(userKey);
}

export function getTestUrl(linkType: keyof EnvironmentConfig['linkIds']): string {
  return `${envManager.getBaseUrl()}/smoke/${envManager.getLinkId(linkType)}`;
}
import { test as base, expect } from '@playwright/test'
import { BasePage } from '../page-objects/base-page'
import { SidebarComponent } from '../page-objects/components/sidebar.pom'
import { HeaderComponent } from '../page-objects/components/header.pom'
import { ThemeToggleComponent } from '../page-objects/components/theme-toggle.pom'
import { LanguageToggleComponent } from '../page-objects/components/language-toggle.pom'
import { setupAPIMocks, type MockAPIOptions } from './api-mocks'

type TestFixtures = {
  basePage: BasePage
  sidebar: SidebarComponent
  header: HeaderComponent
  themeToggle: ThemeToggleComponent
  languageToggle: LanguageToggleComponent
  mockAPI: (options?: MockAPIOptions) => Promise<void>
}

export const test = base.extend<TestFixtures>({
  // Base Page fixture
  basePage: async ({ page }, use) => {
    await use(new BasePage(page))
  },

  // Component fixtures
  sidebar: async ({ page }, use) => {
    await use(new SidebarComponent(page))
  },

  header: async ({ page }, use) => {
    await use(new HeaderComponent(page))
  },

  themeToggle: async ({ page }, use) => {
    await use(new ThemeToggleComponent(page))
  },

  languageToggle: async ({ page }, use) => {
    await use(new LanguageToggleComponent(page))
  },

  // API Mock fixture
  mockAPI: async ({ page }, use) => {
    const mockFn = async (options?: MockAPIOptions) => {
      await setupAPIMocks(page, options)
    }
    await use(mockFn)
  },
})

export { expect }

import { Page, Locator, expect } from '@playwright/test'

export class BasePage {
  readonly page: Page
  readonly baseUrl: string

  constructor(page: Page, baseUrl = 'http://localhost:3000') {
    this.page = page
    this.baseUrl = baseUrl
  }

  // Navigation
  async goto(path = '/') {
    await this.page.goto(`${this.baseUrl}${path}`)
    await this.waitForPageLoad()
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded')
  }

  // Common selectors using data-testid
  getByTestId(testId: string): Locator {
    return this.page.getByTestId(testId)
  }

  // Wait utilities
  async waitForAPIResponse(urlPattern: string | RegExp) {
    return this.page.waitForResponse(urlPattern)
  }

  async waitForAPIRequest(urlPattern: string | RegExp) {
    return this.page.waitForRequest(urlPattern)
  }

  // Common assertions
  async assertToastMessage(message: string | RegExp) {
    await expect(this.page.getByText(message)).toBeVisible()
  }

  async assertToastHidden(message: string | RegExp) {
    await expect(this.page.getByText(message)).not.toBeVisible()
  }

  // Storage utilities
  async getLocalStorageItem(key: string): Promise<string | null> {
    return this.page.evaluate((k) => localStorage.getItem(k), key)
  }

  async setLocalStorageItem(key: string, value: string): Promise<void> {
    await this.page.evaluate(
      ({ k, v }) => localStorage.setItem(k, v),
      { k: key, v: value }
    )
  }

  async clearLocalStorage(): Promise<void> {
    await this.page.evaluate(() => localStorage.clear())
  }

  // Screenshot utility
  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `test-results/screenshots/${name}.png`, fullPage: true })
  }
}

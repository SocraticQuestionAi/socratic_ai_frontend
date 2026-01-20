import { Page, Locator, expect } from '@playwright/test'

export type Locale = 'en' | 'tr'

export class LanguageToggleComponent {
  readonly page: Page
  readonly toggleButton: Locator

  constructor(page: Page) {
    this.page = page
    this.toggleButton = page.getByTestId('language-toggle')
  }

  async openMenu() {
    await this.toggleButton.click()
  }

  async selectLanguage(locale: Locale) {
    await this.openMenu()
    await this.page.getByTestId(`language-option-${locale}`).click()
  }

  async assertLanguage(locale: Locale) {
    const flag = locale.toUpperCase()
    await expect(this.toggleButton).toContainText(flag)
  }

  async assertStoredLocale(locale: Locale) {
    const storedLocale = await this.page.evaluate(() => localStorage.getItem('socratic-locale'))
    expect(storedLocale).toBe(locale)
  }

  async assertTranslatedText(expectedText: string) {
    await expect(this.page.getByText(expectedText)).toBeVisible()
  }
}

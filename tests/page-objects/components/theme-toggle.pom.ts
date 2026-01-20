import { Page, Locator, expect } from '@playwright/test'

export type Theme = 'light' | 'dark' | 'system'

export class ThemeToggleComponent {
  readonly page: Page
  readonly toggleButton: Locator

  constructor(page: Page) {
    this.page = page
    this.toggleButton = page.getByTestId('theme-toggle')
  }

  async openMenu() {
    await this.toggleButton.click()
  }

  async selectTheme(theme: Theme) {
    await this.openMenu()
    await this.page.getByTestId(`theme-option-${theme}`).click()
  }

  async assertTheme(theme: 'light' | 'dark') {
    const html = this.page.locator('html')
    if (theme === 'dark') {
      await expect(html).toHaveClass(/dark/)
    } else {
      await expect(html).not.toHaveClass(/dark/)
    }
  }

  async assertStoredTheme(theme: Theme) {
    const storedTheme = await this.page.evaluate(() => localStorage.getItem('theme'))
    expect(storedTheme).toBe(theme)
  }
}

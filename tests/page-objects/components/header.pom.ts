import { Page, Locator, expect } from '@playwright/test'

export class HeaderComponent {
  readonly page: Page
  readonly header: Locator
  readonly viewTitle: Locator
  readonly menuButton: Locator
  readonly helpButton: Locator
  readonly settingsButton: Locator
  readonly userMenuButton: Locator

  constructor(page: Page) {
    this.page = page
    this.header = page.getByTestId('header')
    this.viewTitle = page.getByTestId('view-title')
    this.menuButton = page.getByTestId('header-menu-button')
    this.helpButton = page.getByTestId('help-button')
    this.settingsButton = page.getByTestId('settings-button')
    this.userMenuButton = page.getByTestId('user-menu-button')
  }

  async toggleSidebar() {
    await this.menuButton.click()
  }

  async openUserMenu() {
    await this.userMenuButton.click()
  }

  async getViewTitle(): Promise<string> {
    return (await this.viewTitle.textContent()) || ''
  }

  async assertViewTitle(title: string | RegExp) {
    await expect(this.viewTitle).toHaveText(title)
  }
}

import { Page, Locator, expect } from '@playwright/test'

export type ViewMode = 'pdf-workspace' | 'similarity' | 'studio'

export class SidebarComponent {
  readonly page: Page
  readonly sidebar: Locator
  readonly toggleButton: Locator
  readonly logo: Locator
  readonly navItems: Record<ViewMode, Locator>

  constructor(page: Page) {
    this.page = page
    this.sidebar = page.getByTestId('sidebar')
    this.toggleButton = page.getByTestId('sidebar-toggle')
    this.logo = page.getByTestId('sidebar-logo')
    this.navItems = {
      'pdf-workspace': page.getByTestId('nav-pdf-workspace'),
      'similarity': page.getByTestId('nav-similarity'),
      'studio': page.getByTestId('nav-studio'),
    }
  }

  async navigateTo(view: ViewMode) {
    await this.navItems[view].click()
    // Wait for view transition
    await this.page.waitForTimeout(300)
  }

  async toggle() {
    await this.toggleButton.click()
  }

  async expand() {
    const isCollapsed = await this.isCollapsed()
    if (isCollapsed) {
      await this.toggle()
    }
  }

  async collapse() {
    const isCollapsed = await this.isCollapsed()
    if (!isCollapsed) {
      await this.toggle()
    }
  }

  async isCollapsed(): Promise<boolean> {
    const classes = await this.sidebar.getAttribute('class')
    return classes?.includes('w-16') ?? false
  }

  async assertExpanded() {
    await expect(this.sidebar).toHaveClass(/w-64/)
  }

  async assertCollapsed() {
    await expect(this.sidebar).toHaveClass(/w-16/)
  }

  async assertActiveView(view: ViewMode) {
    await expect(this.navItems[view]).toHaveAttribute('data-active', 'true')
  }
}

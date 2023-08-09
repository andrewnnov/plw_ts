import { Locator, Page } from '@playwright/test'

export class MyAccountPage {
  readonly page: Page

  constructor(page) {
    this.page = page
  }

  visit = async () => {
    await this.page.goto('http://localhost:2221/my-account')
    await this.page.pause()
  }
}

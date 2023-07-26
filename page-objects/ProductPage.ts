import { Page } from '@playwright/test'

export class ProductPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async visit() {    
    await this.page.waitForLoadState('load')
    await this.page.goto('http://localhost:2221/')
    await this.page.waitForLoadState('load')
    await this.page.pause()
  }
}

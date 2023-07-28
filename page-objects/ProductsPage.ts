import { Locator, Page } from '@playwright/test'

export class ProductsPage {
  readonly page: Page
  readonly addToBasketButtons: Locator

  constructor(page: Page) {
    this.page = page
    this.addToBasketButtons = page.locator(
      "//button[@data-qa='product-button']",
    )
  }

  async visit() {
    await this.page.waitForLoadState('load')
    await this.page.goto('http://localhost:2221/')
    await this.page.waitForLoadState('load')
    await this.page.pause()
  }

  addProductToBacket = async (index: number) => {
    await this.addToBasketButtons.nth(index).waitFor()
    await this.addToBasketButtons.nth(index).click()
  }
}

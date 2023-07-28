import { Page, Locator } from '@playwright/test'

export class Navigation {
  readonly page: Page
  readonly basketCounter: Locator
  readonly checkOutLink: Locator

  constructor(page: Page) {
    this.page = page
    this.basketCounter = page.locator("//div[@data-qa= 'header-basket-count']")
    this.checkOutLink = page.locator(
      "//p[@data-qa= 'desktop-nav-link']//a[text()='Checkout']",
    )
  }

  getBasketCount = async () => {
    await this.basketCounter.waitFor()
    const text = await this.basketCounter.innerText()
    return parseInt(text, 10)
  }

  goToCheckOut = async () => {
    await this.checkOutLink.waitFor()
    await this.checkOutLink.click()
    await this.page.waitForURL(/\/basket/)
  }
}

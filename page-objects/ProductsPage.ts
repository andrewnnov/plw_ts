import { Locator, Page } from '@playwright/test'
import { expect } from '@playwright/test'
import { Navigation } from './Navigation'

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
    //await this.page.pause()
  }

  addProductToBacket = async (index: number) => {
    const specificAddButton = this.addToBasketButtons.nth(index)
    await specificAddButton.waitFor()
    await expect(specificAddButton).toHaveText('Add to Basket')
    const navigation = new Navigation(this.page)
    const basketCountBeforeClick = await navigation.getBasketCount()
    await specificAddButton.click()
    await expect(specificAddButton).toHaveText('Remove from Basket')
    const basketCountAfterClick = await navigation.getBasketCount()
    expect(basketCountAfterClick).toBeGreaterThan(basketCountBeforeClick)
  }
}

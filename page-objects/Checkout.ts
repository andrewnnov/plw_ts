import { Page, Locator } from '@playwright/test'
import { expect } from '@playwright/test'

export class Checkout {
  readonly page: Page
  readonly baskerCards: Locator
  readonly basketItemPrice: Locator
  readonly removeFromBasketBtn: Locator

  constructor(page: Page) {
    this.page = page
    this.baskerCards = page.locator("//div[@data-qa= 'basket-card']")
    this.basketItemPrice = page.locator("//div[@data-qa= 'basket-item-price']")
    this.removeFromBasketBtn = page.locator(
      "//button[@data-qa= 'basket-card-remove-item']",
    )
  }

  removeCheapestProduct = async () => {
    await this.baskerCards.first().waitFor()
    const itemsBeforeRemoval = await this.baskerCards.count()
    await this.basketItemPrice.first().waitFor()
    const allPriceText = await this.basketItemPrice.allInnerTexts()

    const justNumbers = allPriceText.map((element) => {
      const withoutDollarSign = element.replace('$', '')
      return parseInt(withoutDollarSign, 10)
    })

    const smallestPrice = Math.min(...justNumbers)

    const smalestPriceIndex = justNumbers.indexOf(smallestPrice)
    const specificRemoveBtn = this.removeFromBasketBtn.nth(smalestPriceIndex)
    await specificRemoveBtn.waitFor()
    await specificRemoveBtn.click()
    await expect(this.baskerCards).toHaveCount(itemsBeforeRemoval - 1)
    await this.page.pause()
  }
}

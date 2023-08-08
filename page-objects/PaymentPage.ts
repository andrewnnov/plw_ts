import { Locator, Page, expect } from '@playwright/test'

export class PaymentPage {
  readonly page: Page
  readonly discountCode: Locator
  readonly discountInput: Locator

  constructor(page) {
    this.page = page
    this.discountCode = page
      .frameLocator("//iframe[@data-qa='active-discount-container']")
      .locator("//p[@data-qa='discount-code']")
    this.discountInput = page.locator("//input[@data-qa='discount-code-input']")
  }

  activateDiscount = async () => {
    await this.discountCode.waitFor()
    const code = await this.discountCode.innerText()
    await this.discountInput.waitFor()
    //option 1
    await this.discountInput.fill(code)
    await expect(this.discountInput).toHaveValue(code)

    //Option 2 laggy input: slow typing
    // await this.discountInput.focus()
    // await this.page.keyboard.type(code, {delay: 1000})
    // expect(await this.discountInput.inputValue()).toBe(code)



    await this.page.pause()
  }
}

import { Locator, Page, expect } from '@playwright/test'

export class PaymentPage {
  readonly page: Page
  readonly discountCode: Locator
  readonly discountInput: Locator
  readonly submitDiscountBtn: Locator
  readonly totalValue: Locator
  readonly discountValue: Locator
  readonly discountActiveMessage: Locator
  readonly creditCardOwnerTextField: Locator
  readonly creditCardNumberTextField: Locator
  readonly creditCardValidUntilTextField: Locator
  readonly creditCardCVC: Locator
  readonly payBtn: Locator

  constructor(page) {
    this.page = page
    this.discountCode = page
      .frameLocator("//iframe[@data-qa='active-discount-container']")
      .locator("//p[@data-qa='discount-code']")
    this.discountInput = page.locator("//input[@data-qa='discount-code-input']")
    this.submitDiscountBtn = page.locator(
      "//button[@data-qa='submit-discount-button']",
    )
    this.totalValue = page.locator("//span[@data-qa='total-value']")
    this.discountValue = page.locator(
      "//span[@data-qa ='total-with-discount-value']",
    )
    this.discountActiveMessage = page.locator(
      "//p[@data-qa='discount-active-message']",
    )
    this.creditCardOwnerTextField = page.locator(
      "//input[@data-qa='credit-card-owner']",
    )
    this.creditCardNumberTextField = page.locator(
      "//input[@data-qa='credit-card-number']",
    )
    this.creditCardValidUntilTextField = page.locator(
      "//input[@data-qa='valid-until']",
    )
    this.creditCardCVC = page.locator("//input[@data-qa='credit-card-cvc']")
    this.payBtn = page.locator("//button[@data-qa='pay-button']")
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

    expect(await this.discountValue.isVisible()).toBe(false)
    expect(await this.discountActiveMessage.isVisible()).toBe(false)

    await this.submitDiscountBtn.waitFor()
    await this.submitDiscountBtn.click()

    await this.discountActiveMessage.waitFor()

    await this.discountValue.waitFor()

    const totalValueText = await this.totalValue.innerText()
    const totalValueNumber = parseInt(totalValueText.replace('$', ''), 10)
    const discountValueText = await this.discountValue.innerText()
    const discountValueNumber = parseInt(discountValueText.replace('$', ''), 10)
    await expect(discountValueNumber).toBeLessThan(totalValueNumber)
  }

  fillPaymentDetails = async (paymentDetails) => {
    await this.creditCardOwnerTextField.waitFor()
    await this.creditCardOwnerTextField.fill(paymentDetails.creditCardOwner)
    await this.creditCardNumberTextField.waitFor()
    await this.creditCardNumberTextField.fill(paymentDetails.creditCardNumber)
    await this.creditCardValidUntilTextField.waitFor()
    await this.creditCardValidUntilTextField.fill(
      paymentDetails.creditCardUNtil,
    )
    await this.creditCardCVC.waitFor()
    await this.creditCardCVC.fill(paymentDetails.creditCardCVC)
  }

  completePaymetn = async () => {
    await this.payBtn.waitFor()
    await this.payBtn.click()
    await this.page.waitForURL(/\/thank-you/, { timeout: 3000 })
    //await this.page.pause()
  }
}

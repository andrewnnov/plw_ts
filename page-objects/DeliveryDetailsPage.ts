import { Page, Locator, expect } from '@playwright/test'

export class DeliveryDetailsPage {
  readonly page: Page
  readonly firstNameInput: Locator
  readonly lastNameInput: Locator
  readonly streetInput: Locator
  readonly postCodeInput: Locator
  readonly cityInput: Locator
  readonly countryDropDown: Locator
  readonly saveAddressBtn: Locator
  readonly saveAddressContainer: Locator
  readonly saveAddressFirstName: Locator
  readonly saveAddressLastName: Locator
  readonly saveAddressStreet: Locator
  readonly saveAddressPostCode: Locator
  readonly saveAddressCity: Locator
  readonly saveAddressCountry: Locator
  readonly continueToPaymentBtn: Locator

  constructor(page) {
    this.page = page
    this.firstNameInput = page.locator(
      "//input[@data-qa='delivery-first-name']",
    )
    this.lastNameInput = page.locator("//input[@data-qa='delivery-last-name']")
    this.streetInput = page.locator(
      "//input[@data-qa='delivery-address-street']",
    )
    this.postCodeInput = page.locator("//input[@data-qa='delivery-postcode']")
    this.cityInput = page.locator("//input[@data-qa='delivery-city']")
    this.countryDropDown = page.locator("//select[@data-qa='country-dropdown']")
    this.saveAddressBtn = page.getByRole('button', {
      name: 'Save address for next time',
    })
    this.saveAddressContainer = page.locator(
      "//div[@data-qa='saved-address-container']",
    )
    this.saveAddressFirstName = page.locator(
      "//p[@data-qa='saved-address-firstName']",
    )
    this.saveAddressLastName = page.locator(
      "//p[@data-qa='saved-address-lastName']",
    )
    this.saveAddressStreet = page.locator(
      "//p[@data-qa='saved-address-street']",
    )
    this.saveAddressPostCode = page.locator(
      "//p[@data-qa='saved-address-postcode']",
    )
    this.saveAddressCity = page.locator("//p[@data-qa='saved-address-city']")
    this.saveAddressCountry = page.locator(
      "//p[@data-qa='saved-address-country']",
    )

    this.continueToPaymentBtn = page.locator(
      "//button[@data-qa='continue-to-payment-button']",
    )
  }

  fillDetails = async (deleveryDetails) => {
    await this.firstNameInput.waitFor()
    await this.firstNameInput.fill(deleveryDetails.firstName)
    await this.lastNameInput.waitFor()
    await this.lastNameInput.fill(deleveryDetails.lastName)
    await this.streetInput.waitFor()
    await this.streetInput.fill(deleveryDetails.street)
    await this.postCodeInput.waitFor()
    await this.postCodeInput.fill(deleveryDetails.postCode)
    await this.cityInput.waitFor()
    await this.cityInput.fill(deleveryDetails.city)
    await this.countryDropDown.waitFor()
    await this.countryDropDown.selectOption(deleveryDetails.country)
  }

  saveDetails = async () => {
    const addressCountBeforeSaving = await this.saveAddressContainer.count()

    await this.saveAddressBtn.waitFor()
    await this.saveAddressBtn.click()
    await this.saveAddressContainer.waitFor()
    await expect(this.saveAddressContainer).toHaveCount(
      addressCountBeforeSaving + 1,
    )
    await this.saveAddressFirstName.first().waitFor()
    expect(await this.saveAddressFirstName.first().innerText()).toBe(
      await this.firstNameInput.inputValue(),
    )
  }

  continueToPayment = async () => {
    await this.continueToPaymentBtn.waitFor()
    await this.continueToPaymentBtn.click()
    await this.page.waitForURL(/\/payment/, { timeout: 3000 })
  }
}

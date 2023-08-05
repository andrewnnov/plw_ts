import { Page, Locator } from '@playwright/test'

export class DeliveryDetailsPage {
  readonly page: Page
  readonly firstNameInput: Locator
  readonly lastNameInput: Locator
  readonly streetInput: Locator
  readonly postCodeInput: Locator
  readonly cityInput: Locator
  readonly countryDropDown: Locator

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
    await this.page.pause()
  }
}

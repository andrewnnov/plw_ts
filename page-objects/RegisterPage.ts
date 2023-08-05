import { Page, Locator } from '@playwright/test'
import { v4 as uuidv4 } from 'uuid'

export class RegisterPage {
  readonly page: Page
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly registerBtn: Locator

  constructor(page: Page) {
    this.page = page
    this.emailInput = page.locator("//input[@placeholder='E-Mail']")
    this.passwordInput = page.locator("//input[@placeholder='Password']")
    this.registerBtn = page.locator("//button/div[text()='Register']")
  }

  signUpAsNewUser = async (email: string, password: string) => {
    await this.emailInput.waitFor()

    await this.emailInput.fill(email)
    await this.passwordInput.waitFor()

    await this.passwordInput.fill(password)
    await this.registerBtn.waitFor()
    await this.registerBtn.click()
  }
}

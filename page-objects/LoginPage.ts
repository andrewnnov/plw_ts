import { Page, Locator } from '@playwright/test'

export class LoginPage {
  readonly page: Page
  readonly emailField: Locator
  readonly passwordField: Locator
  readonly loginBtn: Locator
  readonly registerBtn: Locator

  constructor(page: Page) {
    this.page = page
    this.emailField = page.locator("//input[@placeholder='E-Mail']")
    this.passwordField = page.locator("//input[@placeholder='Password']")
    this.loginBtn = page.locator("//button//div[contains(text(), 'Login')]")
    this.registerBtn = page.locator("//button[@data-qa='go-to-signup-button']")
  }

  moveToSingup = async () => {
    await this.registerBtn.waitFor()
    await this.registerBtn.click()
    await this.page.waitForURL(/\/signup/, { timeout: 3000 })
  }
}

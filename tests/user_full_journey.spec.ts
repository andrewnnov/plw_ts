import { test } from '@playwright/test'
import { ProductsPage } from '../page-objects/ProductsPage'
import { Navigation } from '../page-objects/Navigation'
import { Checkout } from '../page-objects/Checkout'
import { LoginPage } from '../page-objects/LoginPage'
import { RegisterPage } from '../page-objects/RegisterPage'

test.only('User full end-to-end test journey', async ({ page }) => {
  const productsPage = new ProductsPage(page)
  await productsPage.visit()
  await productsPage.sortByCheapest()
  await productsPage.addProductToBacket(0)
  await productsPage.addProductToBacket(1)
  await productsPage.addProductToBacket(2)
  const navigation = new Navigation(page)
  await navigation.goToCheckOut()

  const checkout = new Checkout(page)
  await checkout.removeCheapestProduct()

  await checkout.continueToCheckout()

  const login = new LoginPage(page)
  await login.moveToSingup()

  const registerPage = new RegisterPage(page)
  await registerPage.signUpAsNewUser()
})

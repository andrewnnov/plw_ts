import { test } from '@playwright/test'
import { v4 as uuidv4 } from 'uuid'
import { ProductsPage } from '../page-objects/ProductsPage'
import { Navigation } from '../page-objects/Navigation'
import { Checkout } from '../page-objects/Checkout'
import { LoginPage } from '../page-objects/LoginPage'
import { RegisterPage } from '../page-objects/RegisterPage'
import { DeliveryDetailsPage } from '../page-objects/DeliveryDetailsPage'
import { deleveryDetails } from '../data/deliveryDetails'

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
  const email = uuidv4() + '@gmail.com'
  const password = uuidv4()
  await registerPage.signUpAsNewUser(email, password)

  const deliveryDetailsPage = new DeliveryDetailsPage(page)
  await deliveryDetailsPage.fillDetails(deleveryDetails)

  await deliveryDetailsPage.saveDetails()
})

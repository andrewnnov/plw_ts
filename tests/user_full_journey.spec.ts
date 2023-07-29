import { test } from '@playwright/test'
import { ProductsPage } from '../page-objects/ProductsPage'
import { Navigation } from '../page-objects/Navigation'
import { Checkout } from '../page-objects/Checkout'

test.only('User full end-to-end test journey', async ({ page }) => {
  let productsPage = new ProductsPage(page)
  await productsPage.visit()
  await productsPage.addProductToBacket(0)
  await productsPage.addProductToBacket(1)
  await productsPage.addProductToBacket(2)
  const navigation = new Navigation(page)
  await navigation.goToCheckOut()

  const checkout = new Checkout(page)
  await checkout.removeCheapestProduct()
})

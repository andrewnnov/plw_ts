import { test } from '@playwright/test'
import { ProductsPage } from '../page-objects/ProductsPage'

test.only('User full end-to-end test journey', async ({ page }) => {
  let productsPage = new ProductsPage(page)
  await productsPage.visit()
  await productsPage.addProductToBacket(0)
  await productsPage.addProductToBacket(1)
  await productsPage.addProductToBacket(2)
  await page.pause()
  //await page.pause();
})

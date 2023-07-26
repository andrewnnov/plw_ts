import { test } from '@playwright/test'
import { ProductPage } from '../page-objects/ProductPage'

test.only('User full end-to-end test journey', async ({ page }) => {
  let productPage = new ProductPage(page)
  await productPage.visit()
  //await page.pause();
})

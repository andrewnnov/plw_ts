import { test } from '@playwright/test'
import { MyAccountPage } from '../page-objects/MyAccontPage'
import { getLoginToken } from '../api-calls/getLoginToken'

test.only('My account using cookie injection', async ({ page }) => {
  //make a request to get login token
  const loginToken = await getLoginToken()
  console.warn({ loginToken })

  //inject the login token into the browser
  const myAccount = new MyAccountPage(page)
  await myAccount.visit()

  await page.evaluate(
    ([loginTokenIsideBrowserCode]) => {
      document.cookie = 'token=' + loginTokenIsideBrowserCode
    },
    [loginToken],
  )
  await myAccount.visit()
})

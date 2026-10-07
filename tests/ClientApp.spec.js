const {test} = require('@playwright/test')
const {expect} = require('@playwright/test')

test('Validationg Client application', async  ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const emailField = page.locator("[type='email']");
    const passwordField = page.locator("[type='password']");
    const submitButton = page.locator("[type='submit']");
    const itemName = page.locator(".card-body b");
    const addCartButton = page.locator(".card-body button");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const titleOfPage =await page.title();
    console.log(titleOfPage);

    await emailField.fill('arifsyed@gmail.com');
    await passwordField.fill('Qwerty@123');
    await submitButton.click();

   console.log(await expect(titleOfPage).toBe("Let's Shop"));
   const itemText = await itemName.nth(1).textContent();
   console.log(itemText);

    console.log(await expect(itemText).toBe("ZARA COAT 3"));
    await addCartButton.nth(3).waitFor();
    await addCartButton.nth(3).click();













});
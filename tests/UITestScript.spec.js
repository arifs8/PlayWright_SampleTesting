const {test} = require('@playwright/test')
const {expect} = require('@playwright/test')

test('Validating login scenario for client application ', async  ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const loginButton = page.locator("[id='login']");
    const productName = "ZARA COAT 3";
    const products = page.locator(".card-body");

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.waitForLoadState('networkidle');
    const titleText = await page.title();
    console.log(titleText);

    console.log(await expect(titleText).toBe("Let's Shop"));
    
    await userName.fill('arifsyed83@gmail.com');
    await password.fill('Syedaakibidris@786');
    await loginButton.click();
    await page.waitForLoadState('networkidle');
    const automationHeader = page.locator('h3', { hasText: 'Automation' });
    await expect(automationHeader).toBeVisible();
    console.log("Text is visible on the page: " + await automationHeader.textContent());

    await page.locator(".card-body b").first().waitFor();
    const titleNames = await page.locator(".card-body b").allTextContents();
    console.log(titleNames);

    const count = await products.count();
    for(let i=0; i<count; ++i){
        if(await products.nth(i).locator("b").textContent() === productName){
            await products.nth(i).locator("text= Add To Cart").click();
           
            break;
    }
    }

     const cartButton = page.locator("[routerlink*='cart']");
    await cartButton.click();
    await page.locator("div li").first().waitFor();
    const addedProductName = page.locator('h3', { hasText: productName });
 
    if(await addedProductName.isVisible()){
        console.log("Product is added to the cart: " + await addedProductName.textContent());
    }else{
        console.log("Product is not added to the cart");
    }

    const checkOutButton = page.locator('button', { hasText: 'Checkout' });
    console.log("Checkout button is visible: " + await checkOutButton.isVisible());
    await checkOutButton.click();

    await page.locator('[placeholder="Select Country"]').first().waitFor();     
    const selectCountryTitle = page.locator('[placeholder="Select Country"]');
    console.log("Select Country field is visible: " + await selectCountryTitle.isVisible());

    await selectCountryTitle.pressSequentially('Indi',{delay:100});
    const dropdownOPtion = page.locator('.ta-results');
    await dropdownOPtion.waitFor();
    const optionCount = await dropdownOPtion.locator('button').count();
    console.log("Number of country options: " + optionCount);

    for(let i=0; i<optionCount; ++i){
        const optionText = await dropdownOPtion.locator('button').nth(i).textContent();
        if(optionText.trim() === "India"){
            await dropdownOPtion.locator('button').nth(i).click();
            break;
        }
        
    }

    await page.pause(3000);


});
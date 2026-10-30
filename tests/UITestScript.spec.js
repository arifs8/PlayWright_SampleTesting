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
    const email = "arifsyed83@gmail.com";

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.waitForLoadState('networkidle');
    const titleText = await page.title();
    console.log(titleText);

    console.log(await expect(titleText).toBe("Let's Shop"));
    
    await userName.fill(email);
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

    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

    await page.locator("div.field.small input").first().fill("123");
    await page.locator("div.field input").nth(2).fill("Syed Arif");
    await page.locator("div.field input").nth(3).fill("rahulshettyacademy");
    await page.locator(".field.small button").click();
    const coupleText = page.locator(".field.small p");
    await expect(coupleText).toHaveText("* Coupon Applied");

    await page.locator(".action__submit").click();

    await page.locator(".box h1").waitFor();
    const orderCOnfirmText =page.locator(".box h1");
    await expect(orderCOnfirmText).toHaveText(" Thankyou for the order. ");
    console.log("Order confirmation text is visible: " + await orderCOnfirmText.textContent()); 

    await page.locator(".box label").last().waitFor();
    const orderID = page.locator(".box label").last();
    const OrderIDText = (await orderID.textContent())?.replace(/\|/g, "").trim();
    console.log("Order ID: " + OrderIDText);
    
    await page.locator("[routerlink*='myorders'] i").waitFor();
    await page.locator("[routerlink*='myorders'] i").click();
    await page.locator("tbody").waitFor();

    const rowsIDText = page.locator("tbody tr");
    const rowCount = await rowsIDText.count();

    for (let i = 0; i < rowCount; i++) {
    const row = rowsIDText.nth(i);
    const rowOrderId = (await row.locator("th").textContent())
        ?.replace(/\|/g, "")
        .trim();

    if (rowOrderId === OrderIDText) {
        await row.locator("button").first().click();
        break;
    }
}

    await page.locator(".col-text").first().waitFor();
    const summaryOrderIdtext =page.locator(".col-text").first();
    console.log("Summary page order is : " + summaryOrderIdtext.textContent());





});
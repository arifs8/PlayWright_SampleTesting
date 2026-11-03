import { test } from '@playwright/test';
import { expect } from '@playwright/test';

test('Playwright Special locator ', async ({page})=>{

    test.setTimeout(60000);
    const slowDwonExpect =expect.configure({timeout: 9000});
    page.setDefaultTimeout(7000);

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check("");
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("SyedArif");
    await page.getByRole("button",{name: 'Submit'}).click(); 
    await page.getByText("The Form has been submitted successfully!.").isVisible();
    await slowDwonExpect(page.getByText("The Form has been submitted successfully!.")).toBeVisible({timeout: 10_000});
    await page.getByRole("link",{name: "Shop"}).click();
    await slowDwonExpect(page.locator(".my-4").first()).toHaveText("Shop Name");
    await page.locator("app-card").filter({hasText: 'Nokia edge'}).getByRole("button").click();
} )

test('Playwright for Client Applicaiton', async ({page}) =>{

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    const pageTitle = await page.locator(".login-title").first().textContent();
    await expect(pageTitle?.trim()).toBe("Log in");
    console.log("The title of the page is : " + pageTitle);
    await page.getByPlaceholder("email@example.com").fill("arifsyed83@gmail.com" );
    await page.getByPlaceholder("enter your passsword").fill("Syedaakibidris@786");
    await page.getByRole('button',{name: "Login"}).click();

    await page.locator(".card-body").filter({hasText: "ZARA COAT 3"}).getByRole("button", {hasText: "Add to Cart"}).click();

})

test('@Webst Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "anshika@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.getByPlaceholder("email@example.com").fill(email);
   await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
   await page.getByRole('button',{name:"Login"}).click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   
   await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
   .getByRole("button",{name:"Add to Cart"}).click();
 
   await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
 
   //await page.pause();
   await page.locator("div li").first().waitFor();
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();
 
   await page.getByRole("button",{name :"Checkout"}).click();
 
   await page.getByPlaceholder("Select Country").pressSequentially("ind");
 
   await page.getByRole("button",{name :"India"}).nth(1).click();
   await page.getByText("PLACE ORDER").click();
 
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();
})


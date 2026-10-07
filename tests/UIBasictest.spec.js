const {test} = require('@playwright/test');
const {expect} = require('@playwright/test');

test.only('Invalid Login Error messgae Validation test', async  ({browser})=>
{
    
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("[id='username']");
    const passwordField = page.locator("[id='password']");
    const signInButton = page.locator("[value='Sign In']");
    const cardTtitles = page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    await userName.fill('rahulshettyacademy1');
    await passwordField.fill('Learning@830$3mK2');
    await signInButton.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(await page.locator("[style*='block']")).toContainText('Incorrect');

    await userName.fill("");
    await userName.fill('rahulshettyacademy');
    await signInButton.click();

    console.log(await cardTtitles.first().textContent());
    console.log(await cardTtitles.nth(1).textContent());

    const allTitles = await cardTtitles.allTextContents();
    console.log(allTitles);


});
test('Page Context test', async  ({page})=>
{
    await page.goto("https://google.com");
    const title = await page.title();
    console.log(title);
    await expect(title).toBe("Google");
});

 
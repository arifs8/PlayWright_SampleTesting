const {test} = require('@playwright/test');
const {expect} = require('@playwright/test');

test('Browser Context test', async  ({browser})=>
{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/");
});
test.only('Page Context test', async  ({page})=>
{
    await page.goto("https://google.com");
    const title = await page.title();
    console.log(title);
    await expect(title).toBe("Google");
});

 
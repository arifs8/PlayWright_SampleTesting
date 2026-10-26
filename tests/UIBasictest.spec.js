const {test} = require('@playwright/test');
const {expect} = require('@playwright/test');

test('Invalid Login Error messgae Validation test', async  ({browser})=>
{
    
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("[id='username']");
    const passwordField = page.locator("[id='password']");
    const signInButton = page.locator("[value='Sign In']");
    const cardTtitles = page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.waitForLoadState('networkidle');
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

test('Dropdown Select from the login page', async  ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("[id='username']");
    const passwordField = page.locator("[id='password']");
    const signInButton = page.locator("[value='Sign In']");
    const cardTtitles = page.locator(".card-body a");
    const dropdown = page.locator("select.form-control");
    const radioButton = page.locator(".customradio");
    const okButton = page.locator("#okayBtn");
    const terms = page.locator("#terms");
    const blikdocumentLinkcText = page.locator("[href*='documents-request']");
    await page.waitForLoadState('networkidle');
    console.log(await page.title());

    await userName.fill('rahulshettyacademy1');
    await passwordField.fill('Learning@830$3mK2');
    await dropdown.selectOption('consult');
    await radioButton.nth(1).click();
    await okButton.click();
    await terms.click();

    console.log(await radioButton.nth(1).isChecked());
    expect(await radioButton.nth(1).isChecked()).toBeTruthy();
    expect(await terms.isChecked()).toBeTruthy();
    console.log('Both the radio button and terms checkbox are checked');
    expect(await blikdocumentLinkcText).toHaveAttribute('class','blinkingText');
    await blinkdocumentLinkcText.click();
    //await signInButton.click();

});

test.only('Child Window Handle', async  ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); 
    const blikdocumentLinkcText = page.locator("[href*='documents-request']");  
    const userName = page.locator("[id='username']");
    expect(await blikdocumentLinkcText).toHaveAttribute('class','blinkingText');
    const [newPage]= await Promise.all([
    context.waitForEvent('page'),// LIsten for anynew page Pending, Rejected and Fulfilled
    blikdocumentLinkcText.click(),
    ]);

    const redText = newPage.locator("[class='im-para red']");
    const text = await redText.textContent();
    console.log(text);

    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log("After splitting the long sentence : " + domain);
    const name = domain.split(".")[0];
    console.log("After splitting the domain: " + name);

    await page.locator("[id='username']").fill(name);
    //await page.pause();
    console.log(await page.locator("[id='username']").inputValue());
 
});
 
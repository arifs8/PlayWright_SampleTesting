import {test, expect} from '@playwright/test';
import { time } from 'node:console';

test('Validate sign in to event hub', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    page.setDefaultTimeout(7000);
    const emailIDField = page.getByPlaceholder("you@email.com");
    const passwordField = page.getByPlaceholder("••••••");
    const signInButton = page.getByRole("button", { name: "Sign In" });
    const adminButton = page.getByRole("button", { name: "Admin" });
    const eventName = "QA MEET UP";
    const seatAvilability = "100";
    const price = "250";
    const email = process.env.EVENTHUB_EMAIL;
    const password = process.env.EVENTHUB_PASSWORD;
    const bookingName = process.env.EVENTHUB_BOOKING_NAME;
    const bookingPhone = process.env.EVENTHUB_PHONE;

    if (!email || !password || !bookingName || !bookingPhone) {
        throw new Error('Set EVENTHUB_EMAIL, EVENTHUB_PASSWORD, EVENTHUB_BOOKING_NAME, and EVENTHUB_PHONE to run this test.');
    }

    await page.goto("https://eventhub.rahulshettyacademy.com");
    await page.waitForLoadState('networkidle');

    await emailIDField.fill(email);
    await passwordField.fill(password);
    await signInButton.click();

    await page.getByText("Browse Events →").isVisible();
    await expect(page.getByText("Browse Events →")).toBeVisible({timeout: 10_000});
    console.log("Browse Events → is visible");

    await adminButton.waitFor();
    await page.getByRole('button', { name: 'Admin' }).click();
    await page.getByRole('navigation').getByRole('link', { name: 'Manage Events' }).click();
    await expect(page.getByRole('main')).toContainText('+ New Event');
    await page.getByTestId('event-title-input').click();

    await page.getByPlaceholder("Event title").fill(eventName);
    await page.getByLabel('Category*').selectOption('Workshop');
    await page.getByPlaceholder("Describe the event…").fill("This is a test event for QA professionals.");
    await page.getByPlaceholder("e.g. Bangalore").fill("Banglore");
    await page.getByPlaceholder("Venue name & address").fill("ITPL Tech PArk, Bangalore");
    await page.getByRole('textbox', { name: 'Event Date & Time*' }).fill('2026-11-25T15:20');
    await page.getByPlaceholder("0.00").fill(price);
    await page.getByPlaceholder("e.g. 500").fill(seatAvilability);
    await page.getByRole('button', { name: '+ Add Event' }).click();

    await page.waitForLoadState('networkidle');

    const eventTitle = await page.locator("table tbody tr td:first-child").last().textContent({timeout: 15000});
    console.log("Created Event Title:", eventTitle);

    if(eventTitle?.trim() === eventName){
        console.log("Event created successfully");
    }else{
        console.error("Event creation failed");
    }

    const eventsTab = page.getByRole('link', { name: 'Events', exact: true });
    await eventsTab.click();
    await page.waitForLoadState('networkidle');

    const qaEventHeading = page.locator('h3:has-text("QA MEET UP")');
    console.log("QA Event Heading is visible: " + await qaEventHeading.isVisible());
    await expect(qaEventHeading).toBeVisible({timeout: 10000});
    console.log("QA Event Heading is visible on the events page");


    await expect(page.getByRole('main')).toContainText(eventName);
    console.log("Event is visible on the events page: " + eventName);
    await expect(page.getByRole('main')).toContainText(`${seatAvilability} seats available`);
    console.log("Seat availability is visible on the events page: " + seatAvilability);
    await expect(page.getByRole('main')).toContainText(`$${price}`);
    console.log("Price is visible on the events page: " + price);
    await qaEventHeading.click();

    const bookTicketTitle = page.getByRole('main');
    await expect(bookTicketTitle).toContainText('Book Tickets');
    console.log("Book Tickets title is visible on the event details page");

    await expect(page.getByRole('main')).toContainText(`$${price}`);


    const quantityNumber = page.getByText('1', { exact: true }).first();
    const plusButton = page.getByRole('button', { name: '+' });

    let quantity = Number(await quantityNumber.innerText());
    console.log("Initial quantity: " + quantity);

    for (let i = 0; i < 3; i++) {
        if (quantity < 4) {
            await plusButton.click();
            quantity++;
        }

        if (quantity === 4) break;
    }

    const bookingNameField = page.getByPlaceholder("Your full name");
    await bookingNameField.fill(bookingName);

    const bookingEmail = page.getByPlaceholder("you@email.com");
    await bookingEmail.fill(email);

    const phoneNUmber = page.getByPlaceholder("+91 98765 43210");
    await phoneNUmber.fill(bookingPhone);

    const confirmTicket = page.getByRole('button', { name: 'Confirm Booking' });
    await confirmTicket.click();

    await page.waitForTimeout(2000);

    const bookingConfirmTicket = page.getByRole('button', { name: 'View My Bookings' , timeout: 10000});
    expect(await bookingConfirmTicket.isVisible()).toBeTruthy();
    console.log("Booking confirmation button is visible: " + await bookingConfirmTicket.isVisible());
    await expect(bookingConfirmTicket).toBeVisible({timeout: 10000});
    await bookingConfirmTicket.click();

    await page.getByText('confirmed').isVisible();
    await expect(page.getByText('confirmed')).toBeVisible({timeout: 10000});
    console.log("Booking confirmed text is visible: " + await page.getByText('confirmed').isVisible());



    await expect(page.getByTestId('booking-card').getByRole('heading')).toContainText(eventName);
    await page.getByRole('button', { name: 'View Details' }).click();


    const id = page.getByTestId('booking-id');
    console.log("Booking ID is visible: " + await id.textContent());
    //await expect(page.getByRole('main')).toContainText(id);


    await page.pause(3000);

}
)
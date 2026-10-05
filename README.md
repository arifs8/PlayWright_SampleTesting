# TestAutomationPlaywright

Basic UI automation tests built with Playwright Test.

## Requirements

- Node.js (LTS recommended)
- npm

## Setup

Install the project dependencies and the Playwright browsers:

```bash
npm ci
npx playwright install
```

## Run Tests

Run the test suite:

```bash
npx playwright test
```

The Playwright configuration uses Chromium in headless mode. To view the HTML report after a run:

```bash
npx playwright show-report
```

The current page-context test opens Google and checks that its title is `Google`.
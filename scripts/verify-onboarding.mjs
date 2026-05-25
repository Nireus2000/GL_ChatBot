import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const OUT = "/tmp/gl-shots";
await mkdir(OUT, { recursive: true });

const errors = [];
const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
});
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
page.on("console", (m) => {
  if (m.type() === "error") errors.push(`[console] ${m.text()}`);
});
page.on("pageerror", (e) => errors.push(`[pageerror] ${e.message}`));

async function shot(name) {
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
  console.log(`captured ${name}`);
}

// 1. Landing
await page.goto("http://localhost:3000/");
await page.waitForLoadState("networkidle");
await shot("01-landing");

// 2. Step 1: business
await page.goto("http://localhost:3000/onboarding");
await page.waitForLoadState("networkidle");
await shot("02-business-empty");

await page.getByLabel("Business name").fill("Aris Dental");
await page.getByRole("button", { name: "Dentist", exact: false }).click();
await page.getByLabel("Address").fill("12 Aegean Street, Manchester");
await page.getByLabel("Opens at").fill("09:00");
await page.getByLabel("Closes at").fill("17:30");
await shot("02-business-filled");

await page.getByRole("button", { name: "Continue" }).click();
await page.waitForURL("**/onboarding/website");
await shot("03-website-empty");

// Step 2: scrape animation
await page.getByLabel("Website URL").fill("athenian-dental.co.uk");
await page.getByRole("button", { name: "Start reading" }).click();
// wait ~1.3s so the second step is active
await page.waitForTimeout(1300);
await shot("03-website-scraping");

// wait for the redirect to faqs
await page.waitForURL("**/onboarding/faqs", { timeout: 8000 });
await shot("04-faqs-default");

await page.getByRole("button", { name: "Approve all" }).click();
await shot("04-faqs-approved");

await page.getByRole("button", { name: /Save .* and continue/ }).click();
await page.waitForURL("**/onboarding/calendar");
await shot("05-calendar");

await page.getByRole("button", { name: "Google Calendar", exact: false }).click();
await page.getByRole("button", { name: "Continue" }).click();
await page.waitForURL("**/onboarding/payments");
await shot("06-payments");

await page.getByRole("button", { name: "Connect Stripe", exact: false }).click();
await page.getByRole("button", { name: "Continue" }).click();
await page.waitForURL("**/onboarding/branding");
await shot("07-branding");

await page.getByRole("button", { name: "Finish setup" }).click();
await page.waitForURL("**/onboarding/done");
await page.waitForTimeout(300);
await shot("08-done");

// Mobile shot of business step
const mobileCtx = await browser.newContext({ viewport: { width: 375, height: 812 } });
const mobile = await mobileCtx.newPage();
await mobile.goto("http://localhost:3000/onboarding/business");
await mobile.waitForLoadState("networkidle");
await mobile.screenshot({ path: `${OUT}/09-business-mobile.png`, fullPage: true });

console.log(JSON.stringify({ errors }, null, 2));
await browser.close();

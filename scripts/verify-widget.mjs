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
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false });
  console.log(`captured ${name}`);
}

await page.goto("http://localhost:3000/demo/athenian-dental");
await page.waitForLoadState("networkidle");
await shot("w01-listing-closed");

// Open chat
await page.getByLabel("Open chat").click();
await page.waitForTimeout(500);
await shot("w02-welcome");

// Tap a suggestion -> booking flow (multi-message)
await page.getByRole("button", { name: "Book an appointment" }).click();
await page.waitForTimeout(800);
await shot("w03-booking-typing");
// Wait for tool chip to appear
await page.waitForTimeout(2200);
await shot("w04-booking-tool");
// Wait for tool chip to resolve and booking card to appear
await page.waitForTimeout(1800);
await shot("w05-booking-card");

// Confirm the booking
await page.getByRole("button", { name: "Confirm", exact: true }).click();
await page.waitForTimeout(300);
await shot("w06-booking-confirmed");

// Send a price question -> payment card
await page.getByPlaceholder("Type a message…").fill("How much for a check-up?");
await page.getByLabel("Send").click();
await page.waitForTimeout(2400);
await shot("w07-payment-card");

// Pay
await page.getByRole("button", { name: /Pay £10 securely/ }).click();
await page.waitForTimeout(300);
await shot("w08-payment-paid");

// Greek question
await page.getByPlaceholder("Type a message…").fill("μιλάτε ελληνικά;");
await page.getByLabel("Send").click();
await page.waitForTimeout(1200);
await shot("w09-greek-reply");

// Mobile
const mctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
const mp = await mctx.newPage();
await mp.goto("http://localhost:3000/demo/athenian-dental");
await mp.waitForLoadState("networkidle");
await mp.screenshot({ path: `${OUT}/w10-listing-mobile.png`, fullPage: false });
await mp.getByLabel("Open chat").click();
await mp.waitForTimeout(400);
await mp.screenshot({ path: `${OUT}/w11-widget-mobile.png`, fullPage: false });
await mp.getByRole("button", { name: "Book an appointment" }).click();
await mp.waitForTimeout(4500);
await mp.screenshot({ path: `${OUT}/w12-booking-mobile.png`, fullPage: false });
console.log("captured mobile");

console.log(JSON.stringify({ errors }, null, 2));
await browser.close();

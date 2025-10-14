import { expect, test } from "playwright-test-coverage";
import { initialize, initializeWithUser } from "./serviceMocks";

test('register', async ({ page }) => {
  await page.goto('/');
  await initialize(page);
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByRole('textbox', { name: 'Full name' }).click();
  await page.getByRole('textbox', { name: 'Full name' }).fill('Diner');
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('d@jwt.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('a');
  await page.getByRole('button', { name: 'Register' }).click();

  await expect(page.locator('#navbar-dark')).toContainText('Logout');
});

test('Login', async ({ page }) => {
  await initializeWithUser(page);

  await expect(page.getByRole('heading')).toContainText('The web\'s best pizza');
  await expect(page.locator('#navbar-dark')).toContainText('Logout');
});

test('Logout', async ({ page }) => {
  await initializeWithUser(page);
  await page.getByRole('link', { name: 'Logout' }).click();

  await expect(page.locator('#navbar-dark')).toContainText('Login');
});
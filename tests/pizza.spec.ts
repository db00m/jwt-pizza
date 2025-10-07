import { test, expect } from 'playwright-test-coverage';
import { initialize, initializeWithUser } from "./serviceMocks";

test('homePage', async ({ page }) => {
  await page.goto('/');

  expect(await page.title()).toBe('JWT Pizza');
});

test('About', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'About' }).click();
  await expect(page.getByRole('main')).toContainText('The secret sauce');
})

test('History', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'History' }).click();
  await expect(page.getByRole('heading')).toContainText('Mama Rucci, my my');
})

test('register', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByRole('textbox', { name: 'Full name' }).click();
  await page.getByRole('textbox', { name: 'Full name' }).fill('d');
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('j@jwt.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('agoodpassword');
  await page.getByRole('button', { name: 'Register' }).click();

  await expect(page.locator('#navbar-dark')).toContainText('Logout');
})

test('Login', async ({ page }) => {
  await initializeWithUser(page);

  await expect(page.getByRole('heading')).toContainText('The web\'s best pizza');
  await expect(page.locator('#navbar-dark')).toContainText('Logout');
})

test('Logout', async ({ page }) => {
  await initializeWithUser(page);
  await page.getByRole('link', { name: 'Logout' }).click();

  await expect(page.locator('#navbar-dark')).toContainText('Login');
})

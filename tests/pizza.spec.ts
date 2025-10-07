import { test, expect } from 'playwright-test-coverage';
import { initialize, initializeWithAdmin, initializeWithUser } from "./serviceMocks";

test('HomePageLoads', async ({ page }) => {
  await page.goto('/');

  expect(await page.title()).toBe('JWT Pizza');
});

test('AboutPageLoads', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'About' }).click();
  await expect(page.getByRole('main')).toContainText('The secret sauce');
})

test('HistoryPageLoads', async ({ page }) => {
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

test('OrderPageLoads', async ({ page }) => {
  await initializeWithUser(page);
  await page.getByRole('button', { name: 'Order now' }).click();
  await expect(page.locator('h2')).toContainText('Awesome is a click away');
})

test('CanMakeOrder', async ({ page }) => {
  await initializeWithUser(page);

  await page.getByRole('button', { name: 'Order now' }).click();
  await page.getByRole('combobox').selectOption('1');
  await page.getByRole('link', { name: 'Image Description Margarita' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();

  await expect(page.locator('tbody')).toContainText('Margarita');
  await expect(page.locator('tfoot')).toContainText('1 pie');

  await page.getByRole('button', { name: 'Pay now' }).click();
  await expect(page.getByRole('heading')).toContainText('Here is your JWT Pizza!');
  await expect(page.getByRole('main')).toContainText('eyJpYXQ');
})

test('DinerDashboardLoads', async ({ page }) => {
  await initializeWithUser(page);
  await page.getByRole('link', { name: 'K' }).click();
  await expect(page.getByRole('heading')).toContainText('Your pizza kitchen');
})

test('AdminDashboardLoads', async ({ page }) => {
  await initializeWithAdmin(page);
  await page.getByRole('link', { name: 'Admin' }).click();
  await expect(page.locator('h2')).toContainText('Mama Ricci\'s kitchen');
  await expect(page.locator('h3')).toContainText('Franchises');
})

test('Logout', async ({ page }) => {
  await initializeWithUser(page);
  await page.getByRole('link', { name: 'Logout' }).click();

  await expect(page.locator('#navbar-dark')).toContainText('Login');
})

import { test, expect } from 'playwright-test-coverage';
import { initialize, initializeWithAdmin, initializeWithFranchisee, initializeWithUser } from "./serviceMocks";

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
})

test('Login', async ({ page }) => {
  await initializeWithUser(page);

  await expect(page.getByRole('heading')).toContainText('The web\'s best pizza');
  await expect(page.locator('#navbar-dark')).toContainText('Logout');
})

test('FranchisePageLoads(non franchisee)', async ({ page }) => {
  await initializeWithUser(page);
  await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
  await expect(page.getByRole('main')).toContainText('So you want a piece of the pie?');

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
  await page.getByRole('link', { name: 'SD' }).click();
  await expect(page.getByRole('heading')).toContainText('Your pizza kitchen');
})

test('AdminDashboardLoads', async ({ page }) => {
  await initializeWithAdmin(page);
  await page.getByRole('link', { name: 'Admin' }).click();

  await expect(page.locator('h2')).toContainText('Mama Ricci\'s kitchen');
  await expect(page.locator('h3')).toContainText('Franchises');
})

test('CanCreateFranchise', async ({ page }) => {
  await initializeWithAdmin(page);
  await page.getByRole('link', { name: 'Admin' }).click();

  await page.getByRole('button', { name: 'Add Franchise' }).click();
  await page.getByRole('textbox', { name: 'franchise name' }).click();
  await page.getByRole('textbox', { name: 'franchise name' }).fill('Bilbos Pizza');
  await page.getByRole('textbox', { name: 'franchisee admin email' }).click();
  await page.getByRole('textbox', { name: 'franchisee admin email' }).fill('a@jwt.com');
  await page.getByRole('button', { name: 'Create' }).click();
  await expect(page.locator('h3')).toContainText('Franchises');
})

test('CanCloseFranchise', async ({ page }) => {
  await initializeWithAdmin(page);

  await page.getByRole('link', { name: 'Admin' }).click();
  await page.getByRole('row', { name: 'Middle Earth Pizza' }).getByRole('button').click();
  await expect(page.getByRole('heading')).toContainText('Sorry to see you go');
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.locator('h2')).toContainText('Mama Ricci\'s kitchen');
})

test('FranchiseDashboardLoads', async ({ page }) => {
  await initializeWithFranchisee(page);

  await expect(page.getByRole('heading')).toContainText('The web\'s best pizza');

  await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
  await expect(page.getByRole('heading', { name: /pizzaPocket/i })).toBeVisible();
})

test('Logout', async ({ page }) => {
  await initializeWithUser(page);
  await page.getByRole('link', { name: 'Logout' }).click();

  await expect(page.locator('#navbar-dark')).toContainText('Login');
})

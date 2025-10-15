import { expect, test } from "playwright-test-coverage";
import { initializeWithAdmin, initializeWithFranchisee, setUpUserListMethods } from "./serviceMocks";

test('AdminDashboardLoads', async ({ page }) => {
  await initializeWithAdmin(page);
  await page.getByRole('link', { name: 'Admin' }).click();

  await expect(page.locator('h2')).toContainText('Mama Ricci\'s kitchen');
  await expect(page.getByRole('main')).toContainText('Franchises');
  await expect(page.getByRole('main')).toContainText('Users');
});

test('CanCreateFranchise', async ({ page }) => {
  await initializeWithAdmin(page);
  await page.getByRole('link', { name: 'Admin' }).click();

  await page.getByRole('button', { name: 'Add Franchise' }).click();
  await page.getByRole('textbox', { name: 'franchise name' }).click();
  await page.getByRole('textbox', { name: 'franchise name' }).fill('Bilbos Pizza');
  await page.getByRole('textbox', { name: 'franchisee admin email' }).click();
  await page.getByRole('textbox', { name: 'franchisee admin email' }).fill('a@jwt.com');
  await page.getByRole('button', { name: 'Create' }).click();
  await expect(page.getByRole('main')).toContainText('Franchises');
});

test('CanCloseFranchise', async ({ page }) => {
  await initializeWithAdmin(page);

  await page.getByRole('link', { name: 'Admin' }).click();
  await page.getByRole('row', { name: 'Middle Earth Pizza' }).getByRole('button').click();
  await expect(page.getByRole('heading')).toContainText('Sorry to see you go');
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.locator('h2')).toContainText('Mama Ricci\'s kitchen');
});

test('FranchiseDashboardLoads', async ({ page }) => {
  await initializeWithFranchisee(page);

  await expect(page.getByRole('heading')).toContainText('The web\'s best pizza');

  await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
  await expect(page.getByRole('heading', { name: /pizzaPocket/i })).toBeVisible();
});

test('CanViewUserList', async ({ page }) => {
  await initializeWithAdmin(page);
  await setUpUserListMethods(page);

  await page.getByRole('link', { name: 'Admin' }).click();
  await expect(page.getByRole('main')).toContainText('Frodo Baggins');
  await expect(page.getByRole('main')).toContainText('Bilbo Baggins');
  await expect(page.getByRole('main')).toContainText('Gandalf');
});

test('CanDeleteUser', async ({ page }) => {
  await initializeWithAdmin(page);
  const dummyUsers = await setUpUserListMethods(page);
  const dummyUser = dummyUsers[0];

  await page.getByRole('link', { name: 'Admin' }).click();
  await page.getByRole('row', { name: `${dummyUser.name} ${dummyUser.email} diner` }).getByRole('button').click();
  await page.getByRole('link', { name: 'Order' }).click();
  await page.getByRole('link', { name: 'Admin' }).click();
  await expect(page.getByRole('main')).not.toContainText(`${dummyUser.name}`);
})
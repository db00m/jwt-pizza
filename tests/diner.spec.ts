import { test, expect } from 'playwright-test-coverage';
import { initializeWithUser } from "./serviceMocks";

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

test('FranchisePageLoads(non franchisee)', async ({ page }) => {
  await initializeWithUser(page);
  await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
  await expect(page.getByRole('main')).toContainText('So you want a piece of the pie?');

});

test('DinerDashboardLoads', async ({ page }) => {
  await initializeWithUser(page);
  await page.getByRole('link', { name: 'SD' }).click();
  await expect(page.getByRole('heading')).toContainText('Your pizza kitchen');
})

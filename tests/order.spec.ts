import { expect, test } from "playwright-test-coverage";
import { initializeWithUser } from "./serviceMocks";

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
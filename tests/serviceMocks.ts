import { Page } from "@playwright/test";
import { Role, User } from "../src/service/pizzaService";
import { expect } from "playwright-test-coverage";

const FAKE_TOKEN = "asdfasdf"

export const initialize = async (page: Page) => {
  let loggedInUser: User;
  const validUsers: Record<string, User> = { 'd@jwt.com': { id: '3', name: 'Kai Chen', email: 'd@jwt.com', password: 'a', roles: [{ role: Role.Diner }] } };

  // Authorize login for the given user
  await page.route('*/**/api/auth', async (route) => {
    const loginReq = route.request().postDataJSON();

    if (route.request().method() == "PUT" || route.request().method() == "POST") {
      const user = validUsers[loginReq.email];
      if (!user || user.password !== loginReq.password) {
        await route.fulfill({ status: 401, json: { error: 'Unauthorized' } });
        return;
      }
      loggedInUser = validUsers[loginReq.email];
      const loginRes = {
        user: loggedInUser,
        token: FAKE_TOKEN,
      };
      await route.fulfill({ json: loginRes });
    }

  });
}

export const initializeWithUser = async (page: Page) => {
  await page.goto('/');
  await initialize(page);
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('d@jwt.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('a');
  await page.getByRole('button', { name: 'Login' }).click();
}
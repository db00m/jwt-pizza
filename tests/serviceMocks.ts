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

  await page.route('*/**/api/user/me', async (route) => {
    expect(route.request().method()).toBe('GET');
    await route.fulfill({ json: loggedInUser });
  });

  await page.route('*/**/api/order/menu', async (route) => {
    await route.fulfill({ json: [
        {
          "id": 1,
          "title": "Veggie",
          "image": "pizza1.png",
          "price": 0.0038,
          "description": "A garden of delight"
        },
        {
          "id": 2,
          "title": "Pepperoni",
          "image": "pizza2.png",
          "price": 0.0042,
          "description": "Spicy treat"
        },
        {
          "id": 3,
          "title": "Margarita",
          "image": "pizza3.png",
          "price": 0.0042,
          "description": "Essential classic"
        }
      ]
    });
  });

  await page.route('*/**/api/franchise?*', async (route) => {
    await route.fulfill({ json: {
      franchises: [{
        "id": 1,
        "name": "Middle Earth Pizza",
        "stores": [
          {
            "id": 1,
            "name": "Bilbo's Pizza"
          }
        ] }] } });
  });

  await page.route('*/**/api/order', async (route) => {

    if (route.request().method() == "POST") {
      const orderReq = route.request().postDataJSON();
      const orderRes = {
        order: { ...orderReq, id: 23 },
        jwt: 'eyJpYXQ',
      };

      await route.fulfill({ json: orderRes });
    } else if (route.request().method() == "GET") {
      await route.fulfill({ json: {
          "dinerId": 274,
          "orders": [
            {
              "id": 17,
              "franchiseId": 186,
              "storeId": 39,
              "date": "2025-10-07T01:07:52.000Z",
              "items": [
                {
                  "id": 10,
                  "menuId": 2,
                  "description": "Pepperoni",
                  "price": 0.0042
                }
              ]
            }
          ],
          "page": 1
        }})
    }
  });

  await page.goto('/');
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
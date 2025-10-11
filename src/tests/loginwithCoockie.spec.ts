import { test, expect } from "@playwright/test"; 

test.describe("Login", () => {

  const validCredentials:  { username: string; password: string} = {
        username: "test@gmail.com",
        password: "SecretPw123!@#",
        };

    test("Loginwithlocalstorage", async ({ page }) => {
        const url = "https://anatoly-karpovich.github.io/demo-login-form/"
        const loginFormPage = page.locator("#loginForm");
        await page.goto(url);
        expect(loginFormPage).toBeVisible(); 

        await page.evaluate(() => localStorage.clear());  
        //await page.evaluate(() => localStorage.setItem('test@gmail.com', '{"name":"test@gmail.com","password":"SecretPw123!@#"}'));
        await page.evaluate(({ username, password }) => {
            localStorage.setItem(
            username,
                JSON.stringify({
                    name: username,
                    password: password
            })
        );}, { username: validCredentials.username, password: validCredentials.password });

        const usernameInput = page.locator("#userName");
        const passwordInput = page.locator("#password");
        const loginButton = page.locator("#submit");
        const successNotification = page.locator("//h4[@id='successMessage']");

        await usernameInput.fill(validCredentials.username);
        await passwordInput.fill(validCredentials.password);
        await loginButton.click();
        await expect(successNotification).toHaveText(`Hello, ${validCredentials.username}!`); 
        await expect(successNotification).toBeVisible();
            });

    });
    





/*
Разработать тест со следующими шагами:
  - открыть https://anatoly-karpovich.github.io/demo-login-form/
  - Засунуть в localStorage браузера данные test@gmail.com / SecretPw123!@# для логина на сайт
  - Залогиниться с данными что вы вставили в localStorage
  - Завалидировать успешный логин

  Рекоммендации:
  - Для доступа к localStorage используйте https://playwright.dev/docs/evaluating
*/


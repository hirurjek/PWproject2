import test, { expect } from "@playwright/test";

interface ICredentials {
  username: string;
  password: string;
}

const validCredentials: ICredentials = {
            username: "abc",
            password: "Abc12345",
        };

test.describe("Login", () => {

    test.beforeEach(async ({ page }) => {
        const url = "https://anatoly-karpovich.github.io/demo-login-form/"
        const loginFormPage = page.locator("#loginForm");
        await page.goto(url);
        expect(loginFormPage).toBeVisible();     
    });

    test("Register form open", async ({ page }) => {
        
        const registerButton = page.locator("#registerOnLogin");
        const registerForm = page.locator("#registerForm");
        const userInputname = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        
        await registerButton.click();
        await expect(registerForm).toBeVisible();
        await expect(userInputname).toBeVisible();
        await expect(passwordInput).toBeVisible();
        });

        test("Register with valid credentials", async ({ page }) => {

        const successRegistrationMessage = page.locator("#errorMessageOnRegister");
        const registerButtononLogin = page.locator("#registerOnLogin");
        const registerButton = page.locator("#register");
        const userInputname = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");

        await registerButtononLogin.click();
        await userInputname.fill(validCredentials.username);
        await passwordInput.fill(validCredentials.password);
        await registerButton.click();
        await expect(successRegistrationMessage).toHaveText("Successfully registered! Please, click Back to return on login page");
    });

        test("Login with valid credentials", async ({ page }) => {
        
        const loginFormPage = page.locator("#loginForm");
        const successRegistrationMessage = page.locator("#errorMessageOnRegister");
        const usernameInput = page.locator("#userName");
        const passwordInput = page.locator("#password");
        const loginButton = page.locator("#submit");
        const successNotification = page.locator("//h4[@id='successMessage']");
        const backButton = page.locator("#backOnRegister");
        const registerButton = page.locator("#register");
        const registerButtononLogin = page.locator("#registerOnLogin");
        const usernameInputReg = page.locator("#userNameOnRegister");
        const passwordInputReg = page.locator("#passwordOnRegister");

        await registerButtononLogin.click();
        await usernameInputReg.fill(validCredentials.username);
        await passwordInputReg.fill(validCredentials.password);
        await registerButton.click();
        await expect(successRegistrationMessage).toHaveText("Successfully registered! Please, click Back to return on login page");
        await backButton.click();

        await expect(loginFormPage).toBeVisible();
        await usernameInput.fill(validCredentials.username);
        await passwordInput.fill(validCredentials.password);
        await loginButton.click();
        await expect(successNotification).toBeVisible();
        await expect(successNotification).toHaveText(`Hello, ${validCredentials.username}!`); 
    });

});


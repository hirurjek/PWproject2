import test, { expect } from "@playwright/test";


test.describe("[Demo Login Form] Registration", () => {
  const url = "https://anatoly-karpovich.github.io/demo-login-form/";

interface ICredentials {
  username: string;
  password: string;
}

interface IUserData {
  title: string;
  credentials: ICredentials;
  unsuccessMessage: string;
}

const passwordIncorrect = "Password should contain at least 8 characters";
const usernameIncorrect = "Username should contain at least 3 characters"
const noSpacesAllowed = "Prefix and postfix spaces are not allowed is username";
const requiredPassword = "Password is required";

const invalidTestData: IUserData[] = [
   
  {
    title: "Username empty",
    credentials: { username: "", password: "ValidPass123" },
    unsuccessMessage: "Username is required",
  },
  {
    title: "Username too short",
    credentials: { username: "ab", password: "ValidPass123" },
    unsuccessMessage: usernameIncorrect,
  },
  {
    title: "Username only spaces",
    credentials: { username: "    ", password: "ValidPass123" },
    unsuccessMessage: noSpacesAllowed,
  },
  {
    title: "Username with leading space",
    credentials: { username: " abc", password: "ValidPass123" },
    unsuccessMessage: noSpacesAllowed,
  },
  {
    title: "Username with trailing space",
    credentials: { username: "abc ", password: "ValidPass123" },
    unsuccessMessage: noSpacesAllowed,
  },
  {
    title: "Password empty",
    credentials: { username: "validUser", password: "" },
    unsuccessMessage: requiredPassword,
  },
  {
    title: "Password too short",
    credentials: { username: "validUser", password: "Abc1" },
    unsuccessMessage: passwordIncorrect,
  },
  {
    title: "Password only spaces",
    credentials: { username: "validUser", password: "        " },
    unsuccessMessage: requiredPassword,
  },
  {
    title: "Password missing lowercase",
    credentials: { username: "validUser", password: "ABCDEFG1" },
    unsuccessMessage: "Password should contain at least one character in lower case",
  },
];

for (const { title, credentials, unsuccessMessage } of invalidTestData) {
    test(title, async ({ page }) => {
      await page.goto(url);
      const registerOnLoginButton = page.locator('.loginForm input[value="Register"]');
      await expect(registerOnLoginButton).toBeVisible();
      await registerOnLoginButton.click();
      const registerForm = page.locator(".registerForm");
      const registerFormTitle = registerForm.locator("#registerForm");
      await expect(registerFormTitle).toBeVisible();
      const userNameInput = registerForm.locator("input[type='text']");
      const passwordInput = registerForm.locator("input[type='password']");
      const registerButton = registerForm.locator(`input[type='submit']`);
      const successMessageLabel = registerForm.locator("h4");
      const { username, password } = credentials;
      await userNameInput.fill(username);
      await passwordInput.fill(password);
      await registerButton.click();
      await expect(successMessageLabel).toHaveText(unsuccessMessage);
    });
  }
});
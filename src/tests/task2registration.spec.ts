/*Создайте ОДИН смоук тест со следующими шагами:

1. Переход на страницу https://anatoly-karpovich.github.io/demo-registration-form/
2. Заполните форму регистрации
3. Проверьте, что пользователь успешно зарегистрирован
*/

import { test, expect } from "@playwright/test"; 

interface IGender {
  male: string;
  female: string;
}

const chooseGender: IGender = {
            male: "male",
            female: "female",
        };

interface IHobbies {
  Sports: string;
  Movies: string;
  Travelling: string;
  Gaming: string;
  Dancing: string;
}

const chooseHobbies: IHobbies = {
            Sports: "Sports",
            Movies: "Movies",
            Travelling: "Travelling",
            Gaming: "Gaming",
            Dancing: "Dancing",
        };

test.describe("Login", () => {  

    test("Registration", async ({ page }) => {
        
        const url = "https://anatoly-karpovich.github.io/demo-registration-form/"
        const registerFormPage = page.locator("#registrationForm");
       

        const userName = page.locator("#firstName");
        const lastName = page.locator("#lastName");
        const Address = page.locator("#address");
        const email = page.locator("#email");
        const phone = page.locator("#phone");
        const countryDropdown = page.locator("#country");
        const maleGenderRadio = page.locator(`//input[@type='radio' and @value='${chooseGender.male}']`);
        const hobbiesCheckboxSport = page.locator(`//input[@type='checkbox' and @value='${chooseHobbies.Sports}']`);
        const language = page.locator("#language");
        const skillsDropdown = page.locator("#skills");
        const yearDropdown = page.locator("#year");
        const monthDropdown = page.locator("#month");
        const dayDropdown = page.locator("#day");
        const passwordInput = page.locator("#password");
        const passwordConfirm = page.locator("#password-confirm");
        const submitButton = page.locator("//button[@type='submit']");
        const registrationSuccessMessage = page.locator("h2.text-center");
        const fullName = page.locator("#fullName");
        const genderRegForm = page.locator("#gender");
        const hobbiesRegForm = page.locator("#hobbies");
        const dateOfBirth = page.locator("#dateOfBirth");
        const pass = "Abc12345";

        page.goto(url)
        await expect(registerFormPage).toBeVisible();

        await userName.fill("testuser");
        await lastName.fill("testlastname");
        await Address.fill("Test Address 123");
        await email.fill("fdsfsffsd@gmil.com");
        await phone.fill("432525");
        await countryDropdown.selectOption("UK");
        await maleGenderRadio.check();
        await hobbiesCheckboxSport.check();
        await language.fill("TS");
        await skillsDropdown.selectOption("Python");
        await yearDropdown.selectOption("1990");
        await monthDropdown.selectOption("December");
        await dayDropdown.selectOption("10");
        await passwordInput.fill(pass);
        await passwordConfirm.fill(pass);
        await submitButton.click();

        await expect(registrationSuccessMessage).toHaveText("Registration Details");
        await expect(fullName).toHaveText("testuser testlastname");
        await expect(Address).toHaveText("Test Address 123");
        await expect(email).toHaveText("fdsfsffsd@gmil.com");
        await expect(phone).toHaveText("432525");
        await expect(countryDropdown).toHaveText("UK");
        await expect(genderRegForm).toHaveText(`${chooseGender.male}`);
        await expect(language).toHaveText("TS");
        await expect(skillsDropdown).toHaveText("Python");
        await expect(hobbiesRegForm).toHaveText(`${chooseHobbies.Sports}`);
        await expect(dateOfBirth).toHaveText("10 December 1990");
        await expect(passwordInput).toHaveText("*".repeat(pass.length));
        });
});


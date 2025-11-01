import { SalesPortalPage } from "./salesPortal.page";

export class SignInPage extends SalesPortalPage {
    readonly signInPage = this.page.locator("#signInPage");
    readonly emailInput = this.page.locator("#emailinput");
    readonly passwordInput = this.page.locator("#passwordinput");
    readonly loginButton = this.page.locator("button[type='submit']"); 
    async fillCredentials(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }
    async clickLoginButton() {
        await this.loginButton.click();
    }

    readonly uniqueElement = this.signInPage;
}
import test, { expect } from "@playwright/test";

test.describe("Dynamic Controls", () => {

    test.beforeEach(async ({ page }) => {
        const url = "https://the-internet.herokuapp.com/"
        page.goto(url);
    });

    test("Dynamic Controls Test", async ({ page }) => {
        
        const dynamicControlsLink = page.locator("a[href='/dynamic_controls']"); 
        const RemoveButton = page.getByRole("button", {name: "Remove"})
        const headerText = page.locator("div.example p")
        const checkbox = page.getByRole("checkbox"); 
        const addButton = page.getByRole("button", {name: "Add"})
        const loadingBar = page.locator('form #loading').first() // update path
        const formSuccessMessage = page.locator("p#message")

        await dynamicControlsLink.click();
        await expect(RemoveButton).toBeVisible();
        await expect(headerText).toHaveText("This example demonstrates when elements (e.g., checkbox, input field, etc.) are changed asynchronously.");
        await checkbox.check();
        await RemoveButton.click();
        await expect(loadingBar, "Waiting for load bar dissapeared").toBeVisible();
        await expect(checkbox).toBeHidden(); 
        await expect(addButton).toBeVisible();
        await expect(formSuccessMessage, "Check success text").toHaveText("It's gone!");
        await addButton.click();
        await expect(loadingBar, "Waiting for load bar dissapeared").toBeVisible({timeout: 20000});
        await expect(checkbox, "Checkbox is visible").toBeVisible(); 
        await expect(formSuccessMessage, "Check success text").toHaveText("It's back!");
        
    
    }); 
}); 


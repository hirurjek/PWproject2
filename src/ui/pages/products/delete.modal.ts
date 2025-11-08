import { SalesPortalPage } from "../salesPortal.page";

export class DeleteProductModal extends SalesPortalPage {
    readonly uniqueElement = this.page.locator("div[name='confirmation-modal']");
    readonly title = this.page.locator("h5");
    readonly closeButton = this.uniqueElement.locator("button.btn-close");
    readonly deleteButton = this.uniqueElement.locator("button.btn-danger[type='submit']");
    readonly cancelButton = this.uniqueElement.locator("button.btn-secondary");
    async clickDeleteButton() {
        await this.deleteButton.click();
    }
    async clickCancelButton() {
        await this.cancelButton.click();
    }
    async clickCloseButton() {
        await this.closeButton.click();
    }
}
import { test, expect } from "fixtures/pages.fixture";
import { credentials } from "config/env";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";

test.describe("[Sales Portal] [Products]", async () => {
  test("Add new product", async ({ signInPage, homePage, productsListPage, addNewProductPage }) => {

    await signInPage.open();

    await signInPage.fillCredentials(credentials.username, credentials.password);
    await signInPage.clickLoginButton();

    await homePage.waitForOpened();
    await homePage.clickOnViewModule("Products");

    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();

    await addNewProductPage.waitForOpened();
    const productData = generateProductData();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();

    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();
    await expect(productsListPage.firstRowName).toHaveText(productData.name);
    await productsListPage.deleteButton(productData.name).click();
    
    const { deleteModal } = productsListPage;
    await deleteModal.waitForOpened();
    await deleteModal.clickDeleteButton();
    await productsListPage.waitForOpened();
    await expect(productsListPage.tableRowByName(productData.name)).toHaveCount(0);

});
});



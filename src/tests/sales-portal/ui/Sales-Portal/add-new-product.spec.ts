import { test, expect } from "fixtures/business.fixture";
import { credentials } from "config/env";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";

test.describe("[Sales Portal] [Products]", async () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });

  test("Add new product with services", async ({
    loginUIService,
    addNewProductUIService,
    productsListPage,
  }) => {
    token = await loginUIService.loginAsAdmin();
    await addNewProductUIService.open();
    const createdProduct = await addNewProductUIService.create();
    id = createdProduct._id;
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(createdProduct.name)).toBeVisible();
  });



  test("Add new product", async ({ loginPage, homePage, productsListPage, addNewProductPage }) => {

    await loginPage.open();

    await loginPage.fillCredentials(credentials);
    await loginPage.clickLogin();

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
    await deleteModal.confirmButton.click();
    await productsListPage.waitForOpened();
    await expect(productsListPage.tableRowByName(productData.name)).toHaveCount(0);

});
});



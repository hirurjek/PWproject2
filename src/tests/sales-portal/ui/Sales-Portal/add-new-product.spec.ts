import { test, expect } from "fixtures/business.fixture";
import { credentials } from "config/env";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { TAGS } from "data/tags";

test.describe("[Sales Portal] [Products]", async () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });

  test(
    "[TAGS] Add new product with services",
    {
      tag: [TAGS.SMOKE, TAGS.REGRESSION, TAGS.PRODUCTS],
    },
    async ({addNewProductUIService, productsListPage }) => {
      await addNewProductUIService.open();
      const createdProduct = await addNewProductUIService.create();
      id = createdProduct._id;
      token = await productsListPage.getAuthToken();
      await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
      await expect(productsListPage.tableRowByName(createdProduct.name)).toBeVisible();
    },
  );
  
  test("[OLD] Add new product with services",{
        tag: [TAGS.SMOKE],
      }, async ({

    addNewProductUIService,
    productsListPage,
  }) => {
    //token = await loginUIService.loginAsAdmin();
    token = await productsListPage.getAuthToken();
    await addNewProductUIService.open();
    const createdProduct = await addNewProductUIService.create();
    id = createdProduct._id;
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(createdProduct.name)).toBeVisible();
  });



  test.skip("Add new product", async ({ loginPage, homePage, productsListPage, addNewProductPage }) => {

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



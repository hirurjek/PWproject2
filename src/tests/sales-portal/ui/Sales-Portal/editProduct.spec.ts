import { test, expect } from "fixtures/business.fixture";
import _ from "lodash";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { TAGS } from "data/tags";

test.describe("[Sales Portal] [Products] [Edit]", async () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });

    test("Edit product with services", {
            tag: [TAGS.PRODUCTS, TAGS.VISUAL_REGRESSION],
          }, async ({
    addNewProductUIService,
    productsListPage,
    editProductPage
  }) => {
    token = await productsListPage.getAuthToken();
    await addNewProductUIService.open();
    const createdProduct = await addNewProductUIService.create();
    id = createdProduct._id;
    await productsListPage.editButton(createdProduct.name).click();
    const newProductData = generateProductData();
    await editProductPage.fillForm(newProductData);
    await editProductPage.saveButton.click();
    await expect(productsListPage.tableRowByName(newProductData.name)).toBeVisible();
    const updatedProductTableData = _.omit(await productsListPage.getProductData(newProductData.name), ["createdOn"]);
    expect(updatedProductTableData).toEqual(_.omit(newProductData, ["amount", "notes"]));
    await productsListPage.clickAction(newProductData.name, "details");
    const { detailsModal } = productsListPage;
    await detailsModal.waitForOpened();
    const detailsModalProductData = _.omit(await detailsModal.getData(), ["createdOn"]);
    expect(detailsModalProductData).toEqual(newProductData);
  });
});
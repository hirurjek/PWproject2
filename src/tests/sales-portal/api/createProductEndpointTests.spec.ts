import { test, expect } from "fixtures/api.fixture";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { createProductSchema } from "data/schemas/products/create.schema";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { IProduct } from "data/types/product.types";

import { negativeCasesProductCreate } from "data/salesPortal/products/createProductNegative.data";
import { positiveCasesProductCreate } from "data/salesPortal/products/createProductPositive.data";

test.describe("[API] [Sales Portal] [Products]", () => {
  let id = "";
  let token = "";

  test.beforeAll(async ({ loginApiService }) => {
    token = await loginApiService.loginAsAdmin();
  });

  test.afterEach(async ({ productsApiService }) => {
    if (id) {
      await productsApiService.delete(token, id);
      id = "";
    }
  });


  for (let i = 0; i < positiveCasesProductCreate.length; i++) {
    const { description, testData } = positiveCasesProductCreate[i]!;

    test(`Create product: ${description}`, async ({ productsApi }) => {
      const productData = { ...generateProductData(), ...testData };
      const createdProduct = await productsApi.create(productData, token);

      validateResponse(createdProduct, {
        status: STATUS_CODES.CREATED,
        schema: createProductSchema,
        IsSuccess: true,
        ErrorMessage: null,
      });

      id = createdProduct.body.Product._id;

      const actualProductData = createdProduct.body.Product;
      expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(productData);
    });
  }

  for (let i = 0; i < negativeCasesProductCreate.length; i++) {
    const { description, testData } = negativeCasesProductCreate[i]!;

    test(`NOT create product: ${description}`, async ({ productsApi }) => {
      const productData = { ...generateProductData(), ...testData };

      const response = await productsApi.create(
        productData as unknown as IProduct,
        token
      );

      validateResponse(response, {
        status: STATUS_CODES.BAD_REQUEST,
        IsSuccess: false,
        ErrorMessage: "Incorrect request body",
      });
    });
  }
});

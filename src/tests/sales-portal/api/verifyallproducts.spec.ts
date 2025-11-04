import { test, expect } from "fixtures/pages.fixture";
import { credentials } from "config/env";
import { apiConfig } from "config/apiConfig"
import { STATUS_CODES } from "data/statusCodes";
import { validateResponse } from "utils/validateResponse";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { getAllProductsSchema } from "data/salesPortal/schemas/allproducts.schema";
const { baseURL, endpoints } = apiConfig;

test.describe("[API] [Sales Portal] [Login]", async () => {

  test("smoke api test", async ({request}) => {

    const loginResponse = await request.post(baseURL + endpoints.login, {
      data: credentials,
      headers: {
        "content-type": "application/json",
      },
    });
    
    const headers = loginResponse.headers();
    const token = headers['authorization'];

    const productData = generateProductData();
    const createProductResponse =  await request.post(baseURL + endpoints.products, {
        data: productData ,
        headers: { 
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
      },
      });

    expect(createProductResponse.status()).toBe(STATUS_CODES.CREATED);

    const allProductsResponse = await request.get(baseURL + endpoints.productsAll, {
        headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
  });

    await validateResponse(allProductsResponse, {
      status: STATUS_CODES.OK,
      schema: getAllProductsSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });
    const allProductsBody = await allProductsResponse.json();
    const createdProduct = allProductsBody.Products.find((product: { name: string; }) => product.name === productData.name);
    expect(createdProduct).toBeDefined();
});
});

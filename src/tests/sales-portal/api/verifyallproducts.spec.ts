import { test, expect } from "fixtures/api.fixture";
import { apiConfig } from "config/apiConfig"
import { STATUS_CODES } from "data/statusCodes";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { getAllProductsSchema } from "data/schemas/allproducts.schema";
import { get } from "lodash";


const { baseURL, endpoints } = apiConfig;

test.describe("[API] [Sales Portal] [Login]", async () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    await productsApiService.delete(token, id);
  });

  test("Get Product By Id", async ({ loginApiService, productsApiService, productsApi }) => {
    token = await loginApiService.loginAsAdmin();
    const product = await productsApiService.create(token);
    id = product._id;

    const getProductsResponse = await productsApi.getAll(token);
    validateResponse(getProductsResponse, {
          status: STATUS_CODES.OK,
          schema: getAllProductsSchema,
          IsSuccess: true,
          ErrorMessage: null,
        });
        expect(getProductsResponse.body.Products).toEqual(expect.arrayContaining([product])
);
      });
    });

import { test, expect } from "fixtures/api.fixture";
import { STATUS_CODES } from "data/statusCodes";

test.describe("[API] [Sales Portal] [Products]", () => {
  test("Delete Product", async ({ loginApiService, productsApiService, productsApi }) => {
    const token = await loginApiService.loginAsAdmin();
    const createdProduct = await productsApiService.create(token);
    const id = createdProduct._id;
    const response = await productsApi.delete(id, token);
    expect(response.status).toBe(STATUS_CODES.DELETED);
  });
});
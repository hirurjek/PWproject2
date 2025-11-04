import { test, expect } from "fixtures/pages.fixture";
import { credentials } from "config/env";
import { apiConfig } from "config/apiConfig"
import { STATUS_CODES } from "data/statusCodes";
import { loginResponseSchema } from "data/salesPortal/schemas/login.schema";
import { validateResponse } from "utils/validateResponse";
const { baseURL, endpoints } = apiConfig;

test.describe("[API] [Sales Portal] [Login]", async () => {

  test("Login", async ({request}) => {

    const loginResponse = await request.post(baseURL + endpoints.login, {
      data: credentials,
      headers: {
        "content-type": "application/json",
      },
    });

    await validateResponse(loginResponse, {
      status: STATUS_CODES.OK,
      schema: loginResponseSchema,
      IsSuccess: true,
      ErrorMessage: null,
      });
    
    const headers = loginResponse.headers();
    expect(headers['authorization']).toBeTruthy();
  });
});

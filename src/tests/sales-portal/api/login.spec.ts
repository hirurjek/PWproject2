import { test, expect } from "fixtures/api.fixture";
import { credentials } from "config/env";
import { apiConfig } from "config/apiConfig"
import { STATUS_CODES } from "data/statusCodes";
import { loginResponseSchema } from "data/schemas/login.schema";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { LoginApi } from "api/api/login.api";
const { baseURL, endpoints } = apiConfig;

test.describe("[API] [Sales Portal] [Login]", async () => {
;

  test("Login", async ({loginApi}) => { 
    const loginResponse = await loginApi.login(credentials);
    validateResponse(loginResponse, {
          status: STATUS_CODES.OK,
          schema: loginResponseSchema,
          IsSuccess: true,
          ErrorMessage: null,
        });
    expect(loginResponse.headers['authorization']).toBeTruthy();
  });
});

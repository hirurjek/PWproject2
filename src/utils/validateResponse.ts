import { expect, APIResponse } from "@playwright/test";
import { ValidateJsonSchema } from "./schema.utils";

export async function validateResponse(
    response: APIResponse,
    expected: {
        status: number;
        schema?: object;
        IsSuccess?: boolean;
        ErrorMessage?: string | null;
        user?: object;
    },
) {
    expect.soft(response.status(), `Response status should be ${expected.status} as expected`).toBe(expected.status);
    const body = await response.json();
    if (body) {
        if (expected.schema) ValidateJsonSchema(body, expected.schema!);
        expect.soft(body.IsSuccess, `IsSuccess should be ${expected.IsSuccess} as expected`).toBe(true);
        expect.soft(body.ErrorMessage, `ErrorMessage should be ${expected.ErrorMessage} as expected`).toBe(null);
    }
}
import { expect } from "@playwright/test";
import Ajv from "ajv";

export function ValidateJsonSchema(body: object, schema: object) {
     const ajv = new Ajv();
     const validate = ajv.compile(schema);

     const isvalid = validate(body);

     expect.soft(isvalid, 'Response should match JSON schema').toBe(true);

     if (isvalid) {
        console.log("JSON schema validation passed");
     } else {
        console.log('JSON schema validation failed:');
        console.log(validate.errors);
     }
}
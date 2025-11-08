import { obligatoryFieldsSchema, obligatoryRequredFields } from "./core.schema";
import { userSchema } from "./user.schema";

export const loginResponseSchema = {
  type: "object",
  properties: {
    User: userSchema,
    ...obligatoryFieldsSchema
  },
  required: ["User", ...obligatoryRequredFields],
};
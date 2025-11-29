import { ID, IResponseFields,  ICreatedOn } from "./core.types";
import { ICustomerFromResponse } from "./customers.types";
import { IProductFromOrder } from "./product.types";
import { IUser } from "./user.types";

export type OrderStatus = "Draft" | "Processing" | "Shipped" | "Delivered" | "Canceled";
export type DeliveryStatus = "Pending" | "In Transit" | "Delivered" | "Failed";

export interface IOrderFromResponse extends ICreatedOn, ID {
  status: OrderStatus;
  customer: ICustomerFromResponse;
  products: IProductFromOrder[];
  delivery: null | DeliveryStatus;
  total_price: number;
  comments: string[];
  history: IOrderHistory[];
  assignedManager: null | IUser["_id"];
}

export interface IOrderHistory extends Omit<IOrderFromResponse, "comments" | "history" | "customer" > {
  customer: ICustomerFromResponse["_id"];
  changedOn: string;
  action: string;
}
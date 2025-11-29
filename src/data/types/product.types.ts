import { MANUFACTURERS } from "data/salesPortal/products/manufactures";
import { ID, IResponseFields, SortOrder, ICreatedOn } from "./core.types";


export interface IProduct {
  name: string;
  manufacturer: MANUFACTURERS;
  price: number;
  amount: number;
  notes?: string;
}
export interface ITopProduct extends Pick<IProduct, "name"> {
  sales: number;
}
export interface IProductFromOrder extends IProduct, ID {
  received: boolean;
}
export interface IProductInTable extends Pick<IProduct, "name" | "manufacturer" | "price">, ICreatedOn {}
export interface IProductFromResponse extends Required<IProduct>, ICreatedOn, ID {}
export interface IProductResponse extends IResponseFields {
  Product: IProductFromResponse;
}
export interface IProductDetails extends Required<IProduct>, ICreatedOn {}
export interface IProductsResponse extends IResponseFields {
  Products: IProductFromResponse[];
}

export interface IProductsSortedResponse extends IProductsResponse {
  total: number;
  page: number;
  limit: number;
  search: string;
  manufacturer: string[];
  sorting: {
    sortField: ProductsSortField;
    sortOrder: SortOrder;
  };
}

export type ProductsSortField = "createdOn" | "manufacturer" | "price" | "name";

export interface IGetProductsParams {
  manufacturer: MANUFACTURERS[];
  search: string;
  sortField: ProductsSortField;
  sortOrder: SortOrder;
  page: number;
  limit: number;
}

export type ProductsTableHeader = "Name" | "Price" | "Manufacturer" | "Created On";
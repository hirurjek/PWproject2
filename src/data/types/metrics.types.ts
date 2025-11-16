import { IResponseFields } from "./core.types";
import { ICustomerFromResponse } from "./customers.types";
import { ITopProduct } from "./product.types";
import { IOrderFromResponse } from "./orders.types";
import { IDate } from "./core.types";

export interface IMetricsResponse extends IResponseFields {
  Metrics: IMetrics;
}

export interface IMetrics {
  orders: IOrderMetricsData;
  customers: ICustomerMetricsData;
  products: IProductMetricsData;
}

export interface IOrderMetricsData {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  totalCanceledOrders: number;
  recentOrders: IOrderFromResponse[];
  ordersCountPerDay: IOrdersCountPerDay[];
}

export interface ICustomerMetricsData {
  totalNewCustomers: number;
  topCustomers: ICustomerMetrics[];
  customerGrowth: ICustomerGrowth[];
}

export interface ICustomerMetrics {
  _id: ICustomerFromResponse["_id"];
  totalSpent: number;
  ordersCount: number; 
  customerName: ICustomerFromResponse["name"];
  customerEmail: ICustomerFromResponse["email"];
}

export interface ICustomerGrowth {
  date: IDate;
  count: number;
}

export interface IOrdersCountPerDay {
  date: IDate;
  count: number;
}

export interface IProductMetricsData {
  topProducts: ITopProduct[];
}
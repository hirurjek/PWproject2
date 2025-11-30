import { Page } from "@playwright/test";
import { HomeModuleButton, HomePage } from "ui/pages/home.page";
import { ProductsListPage } from "ui/pages/products/productList.page";
import { logStep } from "utils/report/logStep.utils";

export class HomeUIService {
  homePage: HomePage;
  productsListPage: ProductsListPage;
  constructor(private page: Page) {
    this.homePage = new HomePage(page);
    this.productsListPage = new ProductsListPage(page);
  }
  @logStep("open home page module")
  async openModule(moduleName: HomeModuleButton) {
    await this.homePage.clickOnViewModule(moduleName);

    if (moduleName === "Products") {
      await this.productsListPage.waitForOpened();
    }
  }
}
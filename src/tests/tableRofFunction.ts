export type TableRow = Record<string, string>;
import {type Page} from "@playwright/test";

export async function getTableRow(page: Page, email: string) {
  const table = page.locator("#table2");
  const allHeaders = await table.locator("th").all();
  const headersText = await Promise.all(allHeaders.map((el) => el.innerText()));
  headersText.pop();

  const allRows = await table.locator("tbody tr").all();

  for (const row of allRows) {
    const cells = await row
      .locator("td")
      .filter({ hasNot: page.locator("a") })
      .allInnerTexts();
      console.log(`See the cells: ${cells}`);
    const rowData = headersText.reduce<Record<string, string>>(
      (result, header, i) => {
        result[header] = cells[i] ?? "";
        return result;
      }, 
      {}
    );
    if (rowData["Email"] === email) {
      return rowData;
    }
  }
  throw new Error(`email "${email}" not found`);
}
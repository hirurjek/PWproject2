export type TableRow = Record<string, string>;
import {type Page} from "@playwright/test";

// export async function getTableRow(page: Page, email: string) {
//   console.log(`Searching for email "${email}" in table2`);
//   const table = page.locator("#table2");
//   const allHeaders = await table.locator("th").all();
//   const headersText = await Promise.all(allHeaders.map((el) => el.innerText()));
//   headersText.pop();

//   const allRows = await table.locator("tbody tr").all();

//   for (const row of allRows) {
//     const cells = await row
//       .locator("td")
//       .filter({ hasNot: page.locator("a") })
//       .allInnerTexts();
//     const rowData = headersText.reduce<Record<string, string>>(
//       (result, header, i) => {
//         result[header] = cells[i] ?? "";
//         return result;
//       }, 
//       {}
//     );
//     if (rowData["Email"] === email) {
//       return rowData;
//     }
//   }
//   throw new Error(`email "${email}" not found`);
//}
export async function getTableRow(page: Page, email: string){ 
  const row = page.locator('#table2 tbody tr').filter({ hasText: email});
  const cells = row.locator('td').allInnerTexts();
  const headers = page.locator('#table2 thead th').allInnerTexts();
  const [cellsText, headersText] = await Promise.all([cells, headers]);
  const result: TableRow = {};
  headersText.pop(); 
  headersText.forEach((header, index) => {
    result[header] = cellsText[index] ?? '';
  });
  return result;
}
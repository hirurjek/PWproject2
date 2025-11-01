export type TableRow = Record<string, string>;
import {type Page} from "@playwright/test";

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
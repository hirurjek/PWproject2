import test, { expect } from "@playwright/test";
import { getTableRow } from './tableRofFunction';


/* Создать функцию getTableRow(page, email), которая возвращает строку в таблице по емейлу.
Например getTableRow(page, 'jsmith@gmail.com') => { "Last Name": "Smith", "First Name": "John", Email: "jsmith@gmail.com", Due: "$50.00", "Web Site": "http://www.jsmith.com" }

Создайте тест, проверяющий данную функцию, используя все емейлы из таблицы Example 2

Сайт: https://the-internet.herokuapp.com/tables
*/
test ("check tablerow function", async ({ page }) => {
    const url = "https://the-internet.herokuapp.com/tables"
    const table = page.locator("#table2");

    const emails = [
    'jsmith@gmail.com',
    'fbach@yahoo.com',
    'jdoe@hotmail.com',
    'tconway@earthlink.net',
  ];
    await page.goto(url);
    expect(table).toBeVisible();

    for (const email of emails) {
        const row = await getTableRow (page, email);
        expect(row).toBeDefined();
        expect.soft(row.Email).toBe(email);
    }
});
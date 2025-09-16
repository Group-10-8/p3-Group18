// TableTemplate.js
// Implements a JavaScript class (TableTemplate) with a static method (fillIn)
// that fills in a table's cells based on a provided dictionary and optional column name.
class TableTemplate {
    // Fills in the table with the given ID using the provided dictionary.
    static fillIn(tableId, dict, columnName) {
        const table = document.getElementById(tableId);
        if (!table) return;

        // Replace placeholders with corresponding values from the dictionary.
        function processTemplate(str, dict) {
            return str.replace(/{{\s*([\w]+)\s*}}/g, (match, prop) => dict[prop] !== undefined ? dict[prop] : "");
        }

        // Get the header row (first row)
        let headerRow = table.rows[0];
        if (!headerRow) return;

        // Replace templates in header cells
        for (let cell of headerRow.cells) {
            cell.innerHTML = processTemplate(cell.innerHTML, dict);
        }

        // Find column index if columnName is given
        let colIndex = -1;
        if (columnName) {
            for (let i = 0; i < headerRow.cells.length; i++) {
                if (headerRow.cells[i].textContent.trim() === columnName) {
                    colIndex = i;
                    break;
                }
            }
            if (colIndex === -1) return;
        }

        // Replace templates in data rows
        for (let i = 1; i < table.rows.length; i++) {
            let row = table.rows[i];
            if (columnName) {
                let cell = row.cells[colIndex];
                if (cell) cell.innerHTML = processTemplate(cell.innerHTML, dict);
            } else {
                for (let cell of row.cells) {
                    cell.innerHTML = processTemplate(cell.innerHTML, dict);
                }
            }
        }

        if (table.style.visibility === "hidden") {
            table.style.visibility = "visible";
        }
    }
}
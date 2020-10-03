"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toHTMLTable = void 0;
function toHTMLTable(headers, rows) {
    const headerHtml = toHTMLTableRow([headers], cell => `<th>${cell}</th>`, 'thead');
    const bodyHtml = toHTMLTableRow(rows, (cell, i) => `<td${i > 0 ? ' nowrap="nowrap" align="right"' : ''}>${cell}</td>`, 'tbody');
    return [
        '<table width="100%">',
        headerHtml,
        bodyHtml,
        '</table>',
    ].join("");
}
exports.toHTMLTable = toHTMLTable;
function toHTMLTableRow(rows, formatCellCB, wrapperElement) {
    return `<${wrapperElement}>${rows.map(row => `<tr>${row.map(formatCellCB).join("")}</tr>`).join("")}</${wrapperElement}>`;
}

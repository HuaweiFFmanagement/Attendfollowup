const SHEET_ID = '18POT-0KDlXu725dnM7E05PHFGHLQmOUFzaWMldCtEwk';
const SHEET_NAME = 'Datos';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
    sheet.clearContents();

    sheet.getRange(1, 1, 1, 3).setValues([[
      'LAST_UPDATE', data.reportDate, data.uploadedBy || 'Manager'
    ]]);

    sheet.getRange(3, 1, 1, 6).setValues([['supervisor','totalCupos','totalPresentes','totalAusentes','pct','stores_json']]);

    const spvRows = data.supervisors.map(s => [
      s.name, s.totalCupos, s.totalPresentes, s.totalAusentes, s.pct, JSON.stringify(s.stores)
    ]);
    if (spvRows.length > 0) sheet.getRange(4, 1, spvRows.length, 6).setValues(spvRows);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const callback = e.parameter.callback;
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet || sheet.getLastRow() < 4) {
      const res = JSON.stringify({ ok: false, error: 'No data yet' });
      return ContentService
        .createTextOutput(callback ? callback + '(' + res + ')' : res)
        .setMimeType(callback ? ContentService.MimeType.JAVASCRIPT : ContentService.MimeType.JSON);
    }

    const meta = sheet.getRange(1, 1, 1, 3).getValues()[0];
    const lastRow = sheet.getLastRow();
    const rows = sheet.getRange(4, 1, lastRow - 3, 6).getValues();

    const supervisors = rows
      .filter(r => r[0] !== '')
      .map(r => ({
        name: r[0], totalCupos: r[1], totalPresentes: r[2],
        totalAusentes: r[3], pct: r[4], stores: JSON.parse(r[5] || '[]')
      }));

    const res = JSON.stringify({ ok: true, reportDate: meta[1], uploadedBy: meta[2], supervisors });
    return ContentService
      .createTextOutput(callback ? callback + '(' + res + ')' : res)
      .setMimeType(callback ? ContentService.MimeType.JAVASCRIPT : ContentService.MimeType.JSON);

  } catch(err) {
    const res = JSON.stringify({ ok: false, error: err.toString() });
    const callback = e.parameter ? e.parameter.callback : null;
    return ContentService
      .createTextOutput(callback ? callback + '(' + res + ')' : res)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
}

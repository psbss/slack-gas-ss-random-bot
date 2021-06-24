const SPREADSHEET_URL = '// スプレッドシートのURL（非公開でも実行可能）';

function message() {
  var spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  var sheet = spreadsheet.getSheets()[0];

  var user_id_data = sheet.getRange(1, 2, sheet.getLastRow(), 1).getValues();
  var user_id = [];

  for (var i in user_id_data) {
    user_id.push(user_id_data[i][0]);
  }
  var random = Math.floor(Math.random() * user_id.length);

  var message = `<!channel>\n`
  message += `<@${user_id[random]}>さんが千楽されてました。よろしくお願いします！`
  message += `\n<${SPREADSHEET_URL}|候補の編集>`;

  var response = {
    response_type: "in_channel",
    text: message,
  }

  return response;
}

function doPost(e) {
  response = message();
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON)
}

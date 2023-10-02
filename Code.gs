function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('CSV Importer')
    .addItem('Import CSV', 'showDialog')
    .addToUi();
}

function showDialog() {
  var htmlOutput = HtmlService.createHtmlOutputFromFile('CSVImporter.html')
    .setWidth(400)
    .setHeight(300);
  
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'CSV Importer');
}

function import_data(data) {
  try {
    var data = Utilities.base64Decode(data);
    var s = Utilities.newBlob(data).getDataAsString();
    var row = Utilities.parseCsv(s);

    var available = row[0];

    var selected = selected_dialog(available);

    row.shift();

    var selectedData = row.map(function(row) {
      return selected.map(function(column) {
        var columnIndex = available.indexOf(column);
        return row[columnIndex] || "";
      });
    });

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.clear();

    var headerRange = sheet.getRange(1, 1, 1, selected.length);
    headerRange.setValues([selected]).setFontWeight("bold");

    sheet.getRange(2, 1, selectedData.length, selected.length).setValues(selectedData);

    Logger.log("Import completed successfully.");
  } catch (error) {
    Logger.log("Error: " + error);
  }
}

function selected_dialog(available) {
  var ui = SpreadsheetApp.getUi();
  var availableStr = available.join(', ');

  var result = ui.prompt("Select Columns", "Available columns:\n" + availableStr + "\n\nChoose columns to import (comma-separated):", ui.ButtonSet.OK_CANCEL);

  if (result.getSelectedButton() === ui.Button.OK) {
    var userInput = result.getResponseText().trim();
    var selected = userInput.split(',').map(function(column) {
      return column.trim();
    });

    selected = selected.filter(function(column) {
      return available.includes(column);
    });

    if (selected.length === 0) {
      throw new Error("No valid columns selected.");
    }

    return selected;
  } else {
    throw new Error("Column selection canceled.");
  }
}

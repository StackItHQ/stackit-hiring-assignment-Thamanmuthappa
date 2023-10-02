# CSV Importer for Google Sheets

For Google Sheets, a CSV importer is provided by this code. It enables users to import data into a Google Sheet by uploading a CSV file, choosing which columns to import, and doing so. The code is made up of client-side HTML/JavaScript and server-side Google Apps Script.

## Setting Up Google Apps Script:

1. **Open Google Sheets**.

2. Select **"Extensions"** > **"Apps Script"** to start a new Google Apps Script project.

3. Create a script file with the project name (e.g., "CSVImporter") and the extension ".gs".

## Google Apps Script (`CSVImporter.gs`):

### `onOpen()` Function:

- Triggered when the Google Sheet is opened.
- Creates a custom menu named "CSV Importer" with an item "Import CSV."
- Clicking "Import CSV" triggers the `showDialog()` function.

### `showDialog()` Function:

- Displays an HTML dialog box within the Google Sheet.
- Creates an `htmlOutput` object with dimensions and shows it as a modal dialog.
- Users interact with the HTML content in this dialog.

### `import_data(data)` Function:

- Receives base64-encoded CSV data from the client-side.
- Decodes and parses the data into a 2D array of CSV rows.
- Prompts the user to select columns for import using `selected_dialog()`.
- Removes the header row from the CSV data.
- Creates a new 2D array containing only the selected columns.
- Clears the active sheet, sets selected columns as headers, and inserts data.

### `selected_dialog(available)` Function:

- Displays a prompt for the user to select columns for import.
- Takes available columns as input.
- Users input comma-separated column names.
- Validates and returns selected columns as an array.

## HTML and JavaScript (`CSVImporter.html`):

### HTML Structure:

- Contains a file input element (`<input type="file">`) for uploading CSV files.

### `handleFile(fileInput)` Function (JavaScript):

- Triggered when a user selects a file.
- Reads and encodes the selected file as base64.
- Calls the `importData()` function in Google Apps Script with the encoded data.

### `importCSV()` Function (JavaScript):

- Currently commented out and not in use.
- Intended to collect selected columns from a dropdown or list.
- Would call the `importData()` function with the selected columns.

## Overall Flow:

- Users open the Google Sheet and click "CSV Importer" in the custom menu.
- The `showDialog()` function displays the HTML dialog.
- Users upload a CSV file using the file input.
- The `handleFile()` JavaScript function reads and encodes the file.
- Encoded data is sent to `import_data()` in Google Apps Script.
- `import_data()` prompts users to select columns, processes data, and inserts it into the active sheet.

This code provides a basic CSV importer framework, but the client-side column selection feature is currently commented out and would need implementation. Enhancements like error handling and UI improvements can be added.
# Expo Camera Barcode Scanning Issue

This repository demonstrates a bug in Expo's Camera API related to barcode scanning.  Even when specifying desired barcode formats using `barCodeScannerSettings`, the `onBarCodeScanned` function triggers for unexpected barcode types.

**Problem:** The `onBarCodeScanned` callback fires for barcode formats not included in the specified `barCodeScannerSettings` resulting in unintended app behavior.  This makes it difficult to reliably process only the expected barcode formats.

**Solution:** The provided solution modifies the `onBarCodeScanned` handler to explicitly check the `type` property of the scanned barcode data.  Only barcodes matching the expected formats are processed, ensuring accurate and predictable results.

To reproduce the bug and see the solution, refer to the included JavaScript files.
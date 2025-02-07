The issue is addressed by filtering the scanned barcodes within the `onBarCodeScanned` callback.  We check the `type` property of the scanned barcode data against the expected formats defined in `barCodeScannerSettings`. This ensures that only the desired barcode types trigger further processing.

```javascript
import * as React from 'react';
import { Camera, BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [scanned, setScanned] = React.useState(false);
  const [barcodeData, setBarcodeData] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    if (scanned) {
      return;
    }

    //Check if the barcode type matches the expected format
    if(type === BarCodeScanner.Constants.BarCodeType.qr){
        setScanned(true);
        setBarcodeData(data);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
      />
      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)}/>
      )}
      {barcodeData && (
        <Text>Barcode data: {barcodeData}</Text>
      )}
    </View>
  );
}
```
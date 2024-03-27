import { Alert, StyleSheet, Text, View } from 'react-native';
import { Camera } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import * as pako from 'pako';

export default function TabOneScreen() {

  const [permission, setPermission] = useState(null);
  const [scannedData, setScannedData] = useState([]);
  const [scannedCodes, setScannedCodes] = useState(new Set());
  const cameraRef = useRef(null);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);


  const handleBarCodeScanned = ({ type, data }) => {
    // Check if the QR code is already scanned
    if (!scannedCodes.has(data)) {
      // Convert the scanned data back into a byte array
      const byteArray = new Uint8Array(data.length);
      for (let i = 0; i < data.length; i++) {
        byteArray[i] = data.charCodeAt(i);
      }

      // Try decompressing the data using pako
      try {
        const decompressedData = pako.inflate(byteArray, { to: 'string' });

        // Parse the decompressed data back into JSON
        const parsedData = JSON.parse(decompressedData);

        // Add the decompressed data to the state
        const newScannedData = [...scannedData, { type, data: parsedData }];
        setScannedData(newScannedData);

        // Add the scanned QR code to the scannedCodes set
        setScannedCodes(prevCodes => new Set(prevCodes.add(data)));

        console.log('Decompressed data:', parsedData);

        Alert.alert('QR code scanned successfully');
      } catch (error) {
        // Data cannot be decompressed
        Alert.alert('Invalid QR code');
        // Do not close the camera
      }
    }
  };

  if(permission === false){
    return <Text>NO PERMISSION OF CAMERA</Text>
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        onBarCodeScanned={handleBarCodeScanned}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  }, camera: {
    flex: 1,
  },
});

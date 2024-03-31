import { Alert, StyleSheet, Text, View } from 'react-native';
import { Camera } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import * as pako from 'pako';
import { NullableBoolean, Boolean } from '@/src/types';

export default function TabOneScreen() {

  const [permission, setPermission] = useState<NullableBoolean>(null);
  const [scan, setScan] = useState(false);
  const [scannedCodes, setScannedCodes] = useState(new Set());
  const cameraRef = useRef(null);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermission(status === "granted");
      setScan(true);
    };

    getBarCodeScannerPermissions();
  }, []);


  // const handleBarCodeScanned = ({ type, data }) => {
  //   // Check if the QR code is already scanned
  //   if (!scannedCodes.has(data)) {
  //     //Convert the scanned data back into a byte array
  //     const byteArray = new Uint8Array(data.length);
  //     for (let i = 0; i < data.length; i++) {
  //       byteArray[i] = data.charCodeAt(i);
  //     }

  //     //Try decompressing the data using pako
  //     try {
  //       const decompressedData = pako.inflate(byteArray, { to: 'string' });
  //       console.log(decompressedData);
  //       // Parse the decompressed data back into JSON
  //       const parsedData = JSON.parse(decompressedData);

  //       // Add the decompressed data to the state
  //       const newScannedData = [...scannedData, { type, data: parsedData }];
  //       setScannedData(newScannedData);

  //       // Add the scanned QR code to the scannedCodes set
  //       setScannedCodes(prevCodes => new Set(prevCodes.add(data)));

  //       console.log('Decompressed data:', parsedData);

  //       Alert.alert('QR code scanned successfully');
  //     } catch (error) {
  //       // Data cannot be decompressed
  //       Alert.alert('Invalid QR code');
  //       // Do not close the camera
  //       console.log(error);
  //     }



  //     // try{
  //     //   const decompressedData = pako.inflate(byteArray,{to:'string'});
  //     //   setScannedCodes(prevCodes => new Set(prevCodes.add(data)));
  //     //   const newDataString = dataString + decompressedData;
  //     //   setDataString(newDataString);
  //     //   checkForDecompressedData();
  //     //   Alert.alert('data successfully scanned')
  //     // }catch(err){
  //     //   Alert.alert('there might be more qrcodes');
  //     //   console.log(err);
  //     // }
  //   //}

  // };

  const handleBarCodeScanned = ({ data, type }) => {
    if (!scannedCodes.has(data)) {
      setScan(false);
      const byteArray = new Uint8Array(data.length);
      for (let i = 0; i < data.length; i++) {
        byteArray[i] = data.charCodeAt(i);
      }
      try {
        const decompressedData = pako.inflate(byteArray, { to: 'string' });
        const parsedData = JSON.parse(decompressedData);
        scannedCodes.add(data);
        Alert.alert(`Read data part ${parsedData.part} of ${parsedData.total}`);
      } catch (error) {
        console.log(error)
        Alert.alert("Not the right QR Code");
      }
    }
    else {
      Alert.alert("This data already read");
    }
  }


  if (permission === false) {
    return <Text>NO PERMISSION OF CAMERA</Text>
  }

  return (
    <>
      {
        scan && (
          <View style={styles.container}>
            <Camera
              ref={cameraRef}
              style={styles.camera}
              onBarCodeScanned={handleBarCodeScanned}
            />
          </View>)
      }
    </>
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

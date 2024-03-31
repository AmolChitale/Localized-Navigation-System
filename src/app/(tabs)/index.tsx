import { Alert, StyleSheet, Text, View } from 'react-native';
import { Camera } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import * as pako from 'pako';
import { NullableBoolean, BuildingData } from '@/src/types';

export default function TabOneScreen() {

  const [permission, setPermission] = useState<NullableBoolean>(null);
  const [scan, setScan] = useState(false);
  const [scannedCodes, setScannedCodes] = useState(new Set());
  const cameraRef = useRef(null);
  const [buildingData, setBuildingData] = useState<BuildingData[]>([]);
  const [part,setPart] = useState<number>(0);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermission(status === "granted");
      setScan(true);
    };

    getBarCodeScannerPermissions();
  }, []);

  useEffect(()=>{
    console.log(buildingData)
  },[buildingData]);


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
        const newBuildingData:BuildingData[] = [...buildingData,parsedData.data];
        setBuildingData(newBuildingData);
        setPart(part+1);
        Alert.alert(`Read data part ${part+1} of ${parsedData.total}`);

      } catch (error) {
        console.log(error)
        Alert.alert("Not the right QR Code");
      }
    }
    else {
      Alert.alert("This data already read");
    }
    setScan(true);
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

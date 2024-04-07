import { Alert, StyleSheet, Text, View } from 'react-native';
import { Camera } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import * as pako from 'pako';
import { NullableBoolean, BuildingData } from '@/src/types';
import { useSharedData } from './_layout';

export default function TabOneScreen() {

  const {sharedData,setSharedData} = useSharedData();
  const {buildingName, setBuildingName} = useSharedData();
  const {part,setPart} = useSharedData();
  const {total,setTotal} = useSharedData();
  const [permission, setPermission] = useState<NullableBoolean>(null);
  const [scan, setScan] = useState(false);
  const [scannedCodes, setScannedCodes] = useState(new Set());
  const cameraRef = useRef<Camera|null>(null);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermission(status === "granted");
      setScan(true);
    };

    getBarCodeScannerPermissions();
  }, []);


  const handleBarCodeScanned = ({ data, type }:{data:any,type:any}) => {
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
        const newBuildingData:BuildingData[] = [...sharedData,...parsedData.data];
        setSharedData(newBuildingData);
        setBuildingName(parsedData.buildingName);
        setPart(part + parsedData.part);
        setTotal(parsedData.total);
        Alert.alert(`Read data part ${part+1} of ${parsedData.total}`);
      } catch (error) {
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
              ref={ref=>cameraRef.current = ref}
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

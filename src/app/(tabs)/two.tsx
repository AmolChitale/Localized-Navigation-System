import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';

import { useSharedData } from './_layout';
import { useEffect } from 'react';

export default function TabTwoScreen() {

  const { sharedData } = useSharedData();

  if (sharedData.length == 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Please Scan a QR First
        </Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

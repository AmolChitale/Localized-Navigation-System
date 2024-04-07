import { StyleSheet, TextInput } from 'react-native';
import { Text, View } from '../../components/Themed';
import { useSharedData } from './_layout';
import { useEffect, useState } from 'react';
import SearchBar from '@/src/components/SearchBar';

export default function TabTwoScreen() {

  const { sharedData, total, part } = useSharedData();

  if (sharedData.length == 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Please Scan a QR First
        </Text>
      </View>
    )
  }

  if (part !== total) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Please Scan all of the parts
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <SearchBar buildingData={sharedData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    fontSize: 16,
    color: '#ffffff',
    borderColor: '#ffffff',
    marginTop: 20,
    borderWidth: 2,
    padding: 10,
    width: '90%',
  },
});

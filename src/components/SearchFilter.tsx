import { FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, View } from './Themed'
import React from 'react'

const SearchFilter = ({ searchQuery, setSearchQuery, data, setSelectedData }: any) => {
  
  const handlePressItem = (item:any)=>{
    setSearchQuery('')
    setSelectedData(item);
  }
  
  return (
    <View style={styles.scrollable}>
      <FlatList data={data} renderItem={
        ({ item }) => {
          if (searchQuery == '') {
            return <View></View>
          }
          if (!isNaN(searchQuery)) {
            if (item.r_no.includes(searchQuery)) {
              return (
                <TouchableOpacity onPress={() => handlePressItem(item)}>
                  <View >
                    <Text style={styles.text}>{item.f_name} - {item.r_no}</Text>
                  </View>
                </TouchableOpacity>
              )
            }
          }
          if (item.f_name.toLowerCase().includes(searchQuery.toLowerCase())) {
            return (
              <TouchableOpacity onPress={() => handlePressItem(item)}>
                <View >
                  <Text style={styles.text}>{item.f_name} - {item.r_no}</Text>
                </View>
              </TouchableOpacity>
            )
          }
          else {
            return <View></View>
          }
        }
      } />
    </View>
  )
}

export default SearchFilter

const styles = StyleSheet.create({
  text: {
    marginLeft: 0,
    padding: 10,
    backgroundColor: '#373636',
    borderRadius: 10,
  },
  scrollable: {
    maxHeight: 200,
    zIndex:1,
    position:"absolute",
    top:50,
    width:"100%"
  },
})
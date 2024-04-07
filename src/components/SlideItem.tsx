import { StyleSheet, Dimensions } from 'react-native'
import { Text,View } from './Themed'
import React from 'react'

const {width,height} = Dimensions.get('screen')

const SlideItem = ({item}:any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item}</Text>
    </View>
  )
}

export default SlideItem

const styles = StyleSheet.create({
  container:{
    width,
    height:height/2,
    alignItems:"center",
    top:200
  },
  title:{
    fontSize:20,
    fontWeight:'bold',
    textTransform:"capitalize",
    textAlign: "center",
  }
})
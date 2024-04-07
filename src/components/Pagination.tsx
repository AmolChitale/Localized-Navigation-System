import { StyleSheet,Animated,Dimensions } from 'react-native'
import { Text,View } from './Themed'
import React from 'react'


const {width} = Dimensions.get('screen')

const Pagination = ({data,scrollX}:any) => {
  return (
    <View style={styles.container}>
      {
        data.map((_:any,idx:any)=>{
            const inputRange = [(idx-1)*width,idx*width,(idx+1)*width];
            const outputRange = [12,30,12]
            const dotWidth = scrollX.interpolate({
                inputRange,
                outputRange,
                extrapolate:'clamp',
            });
            return <Animated.View key={idx.toString()} style={[styles.dot,{width:dotWidth}]}/>
        })
      }
    </View>
  )
}

export default Pagination

const styles = StyleSheet.create({
    container:{
        flexDirection:"row"
    },
    dot:{
        width:12,
        height:12,
        borderRadius:6,
        backgroundColor:"#ccc",
        marginHorizontal:3
    }
})
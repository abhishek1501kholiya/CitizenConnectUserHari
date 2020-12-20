import React from 'react'
import {View,Text,TouchableOpacity,Dimensions,StyleSheet} from 'react-native'
export default class ReportScreen extends React.Component {
    constructor(){
      super()
    }
    render(){
        return(
           <View style={styles.container}>
               <Text>Hare Krishna!</Text>
           </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center'
    }
})
import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity,FlatList,SafeAreaView} from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 
import firebase from 'firebase'
import db from './Config'
class SettingsScreen extends React.Component{
    constructor(){
        super()
        this.state = {
          
            complaints : [],
            userId: firebase.auth().currentUser.uid
           
        }
        
    }

 
render(){
 
  
    return(
       <View>
            
       </View>
    )   
 }    


}   
export default SettingsScreen
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})
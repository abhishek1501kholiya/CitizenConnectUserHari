import React from 'react'
import {View,Text,TouchableOpacity,StyleSheet, Dimensions} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'; 
const SplashScreen = ({navigation})=>{
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                 <Text style={{fontWeight:'bold',fontSize:28}}>
                Citizen Connect 
                 </Text>
                
            </View>

            <View style={styles.footer}
            
            >
                <Text style={styles.title}>Get Help instantly</Text>
               
             
                <TouchableOpacity onPress={()=>{navigation.navigate('SignIn')}} style={{width:150,height:35,borderRadius:10,backgroundColor:'#08d4c4',alignItems:'center',marginTop:25}}>
                     <Text style={{fontWeight:'bold',color:'white',marginTop:10}}>Get Started</Text>
                     <MaterialIcons name="navigate-next" size={24} color="black" />
                </TouchableOpacity>
              
            </View>

        </View>
    )
}
export default SplashScreen
const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#009387'
    },
    header:{
        flex:2,
        justifyContent:'center',
        alignItems:'center'
    },
    footer:{
        flex:1,
        backgroundColor:'#fff',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingVertical:50,
        paddingHorizontal:30
    },
    logo:{
        width:height_logo,
        height:height_logo
    },
    title:{
        color:'#05375a',
        fontSize:30,
        fontWeight:'bold'
    },
    text:{
        color:'grey',
        marginTop:5
    },
    button:{
        alignItems:'center'
    },
    signIn:{
        width:50,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50,
        flexDirection:'row'
    },
    textSign:{
        color:'white',
        fontWeight:'bold'
    }

});
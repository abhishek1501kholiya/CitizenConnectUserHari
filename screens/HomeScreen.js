import React from 'react'
import {View,Text,TouchableOpacity,StyleSheet,Dimensions} from 'react-native'
import {Card} from 'react-native-paper'
import {FontAwesome5} from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'; 
 const HomeScreen = ({navigation})=>{
  var today = new Date();

  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
 
  
  
    return(
  
      
      <View style={styles.container}>
         <View style={styles.header}>
            <Text style={styles.text_header}>Get Help instantly</Text>
         </View>

         <View style={[styles.footer]}>
           <Text style={{alignSelf:'center' , fontWeight:'bold',fontSize:18,paddingBottom:35}}>Services</Text>

           <View style={{justifyContent:'center',flexDirection:'column',alignItems:'baseline'}}>
           <TouchableOpacity onPress={()=>{navigation.navigate('Explore')}} style={{width:250,height:55,backgroundColor:'blue',justifyContent:'center',alignItems:'center',alignSelf:'center',borderRadius:10}}>
              <Text style ={{fontWeight:'bold',alignSelf:'center',color:'white'}}>Report</Text>
           </TouchableOpacity>

           <TouchableOpacity  onPress={()=>{}}  style={{width:250,height:55,backgroundColor:'#009397',justifyContent:'center',alignItems:'center',alignSelf:'center',borderRadius:10,marginTop:20,marginBottom:20}}>
              <Text style ={{fontWeight:'bold',alignSelf:'center'}}>License</Text>
           </TouchableOpacity>
 
         </View>  
        
             <TouchableOpacity onPress={()=>{navigation.navigate("Pickup")}}style={{width:250,height:55,backgroundColor:'#00B9F5',borderRadius:10,alignItems:'center',alignSelf:'center'}}>
                <FontAwesome5 name="truck-pickup" size={22} color="black" />
                <Text style={{color:'black',fontWeight:'bold'}}>Pickup</Text>
             </TouchableOpacity>
      

       

       </View>

     


      </View>
    )
  }
export default HomeScreen
const styles= StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'lightblue'
},
header:{
    flex:1,
    justifyContent:'center',
    paddingHorizontal:20,
    paddingBottom:50
},
footer:{
    flex:3,
    backgroundColor:'#fff',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    paddingHorizontal:20,
    paddingVertical:30
},
text_header:{
    color:'#fff',
    fontWeight:'bold',
    fontSize:30
},
text_footer:{
    color:'#05375a',
    fontSize:18
},
})
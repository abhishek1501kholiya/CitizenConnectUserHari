import React from 'react'
import {View,Text,TouchableOpacity,TextInput} from 'react-native'
//import * as ImagePicker from 'expo-image-picker '
import { Ionicons } from '@expo/vector-icons'; 
import * as Permissions from "expo-permissions";
import {Avatar} from 'react-native-paper'
import firebase from 'firebase'
import db from './Config'
import * as ImagePicker from 'expo-image-picker'
import UserPermissions from '../Utilities/UserPermissions'

class ProfileScreen extends React.Component{
  constructor(){
      super()
      this.state={
          userId:firebase.auth().currentUser.uid,
          name:'',
          avatar:null,
          Phoneno:''
       
      }
  }
  

   render(){
  
    var userId = this.state.userId
    var name
    var email
    var Phoneno
    
    //to get the User's name from the database
    var userRef = db.ref('Users/' + this.state.userId).on("value",(data)=>{
       
        name = data.val().firstName;
    });

    //to get the User's email from the database
     var emailRef = db.ref('Users/' + this.state.userId).on("value",(data)=>{
       console.log(data.val().email);
       email = data.val().email;
   });

   var emailRef = db.ref('Users/' + this.state.userId).on("value",(data)=>{
       console.log(data.val().Phonenumber)
       Phoneno = data.val().Phonenumber
   })


    
    return(
     <View style={{marginLeft:15,marginTop:20,}}>
     

        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Home')}}>
              <Ionicons name="ios-arrow-back" size={44} color="black" />
        </TouchableOpacity>
         
    
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
         
            <Text style={{fontWeight:'bold',fontSize:28}}>Your Profile</Text>
        </View>

        <View style={{marginTop:50,alignItems:'center'}}>

            <View>
                <Text style={{fontWeight:'bold',fontSize:20}}>Your Name</Text>  
                 
             </View>          
  

            <TextInput style={{width:'80%',height:'10%',borderWidth:1,borderColor:'black'}}placeholder={name} onChangeText={(name)=>{this.setState({
                 name:name
            })}}></TextInput>

            <View style={{marginTop:70,marginBottom:-50}}>
                <Text style={{fontWeight:'bold',fontSize:20}}>Your Phoneno</Text>
            </View>
               <TextInput style={{marginTop:50,width:'80%',height:35,borderWidth:1,borderColor:'black'}}placeholder={Phoneno} keyboardType={"numeric"} maxLength={10}   onChangeText={(Phoneno)=>{this.setState({
                   Phoneno:Phoneno
               })}}  >
              </TextInput>

            <View style={{marginTop:50,marginBottom:0}}>
                <Text style={{fontWeight:'bold'}}>Your registered emailId</Text>
            </View>
            <Text>{email}</Text>

             <TouchableOpacity style={{marginTop:50,width:200,height:45,backgroundColor:'green',alignSelf:'center',alignItems:'center',borderRadius:10,backgroundColor:'#009387'}} onPress={()=>{
               if(this.state.name !== null && this.state.name!=='' && this.state.Phoneno !== null && this.state.Phoneno !==''){
                var ref = db.ref('Users/'+ this.state.userId + '/')
                 ref.update({
                    firstName:this.state.name,
                    Phonenumber : this.state.Phoneno

                  
                 })
                 alert('Profile Updated Sucessfully')
            
                }else{
                    alert('Kindly Fill all the fields')
                }}
              }

                
              
             > 
                 <Text style={{fontWeight:'bold',textAlign:'center',marginTop:5,}}>Save</Text>
             </TouchableOpacity>
      
        </View>
    </View>  
    )
    }
}
export default ProfileScreen
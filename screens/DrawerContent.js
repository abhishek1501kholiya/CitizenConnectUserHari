import React from 'react'
import {View,StyleSheet,TouchableOpacity} from 'react-native'
import {Avatar,Title,Caption,Paragraph,Drawer,Text,TouchableRipple,Switch}from 'react-native-paper'
import {DrawerContentScrollView,DrawerItem} from '@react-navigation/drawer'

import {FontAwesome5} from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons'
import {Icon } from '@expo/vector-icons/MaterialCommunityIcons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import db from './Config'
import firebase from 'firebase'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from "expo-permissions";
import UserPermissions from '../Utilities/UserPermissions'
import { AntDesign } from '@expo/vector-icons'; 
//import * as ImagePicker from 'expo-image-picker'

export class DrawerContent extends React.Component{
   constructor(){
       super()
       this.state={
         name:'',
         email:'',
         userid:'',
         avatar:null
          
       }
    
   }

handlePickAvatar = async ()=>{
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    if(!cancelled){
        this.uploadImage(uri ,this.state.userid)
    }
}
uploadImage = async(uri,imageName)=>{
    const response = await fetch(uri)
    const blob = await response.blob()
    
    var ref  = firebase.storage().ref().child("user_profiles/" + imageName);
    return ref.put(blob).then((response) => {
        this.fetchImage(imageName);
    });

    
}
fetchImage = (imageName)=>{
    var storageref = firebase.storage().ref().child("user_profiles/" + imageName);

    storageref.getDownloadURL().then((url)=>{
        this.setState({
            avatar:url
        })
    })
    .catch((error)=>{
        this.setState({avatar:'#'})
    })
}
componentDidMount(){
    
    firebase.auth().onAuthStateChanged(user => {
        // your code
        if(user){
            this.setState({
                userid:firebase.auth().currentUser.uid
            })
            this.fetchImage(this.state.userid)
          
             var name; 
             var email;
                 var userid ; 
           
                 userid = firebase.auth().currentUser.uid
                 if(userid !== null && userid !== undefined && this.state.userid!== null && this.state.userid !== undefined){
                     var userRef = db.ref('Users/' + this.state.userid).on("value",(data)=>{
                         // name = data.val().firstName;
                         
                         //    name = data.val().firstName
                         //    console.log(name)
           
                         // this.setState({
                     //   if(data.val().firstName !== null ){
                             if(data.val()){
                               name =  data.val().firstName
                             }
                      //  }
                        
                             if(name != null && name != undefined){
                               this.setState({
                                     name: name
                                 })
                             }
                        // })
                       //  console.log(this.state.name)
                          //  alert('hello')
                         
                       });
                     
                 
                     var emailRef = db.ref('Users/' + this.state.userid).on("value",(data)=>{
                       
                             //  email= data.val().email
                          //   this.setState({
                              if(data.val()){
                                email = data.val().email
                              }
                               if(email!=null && email != undefined){
                                    this.setState({
                                        email:email
                                   })
                                }
                             //})
                              
                       
                       });
             
               //   }  
                       
                
               //}
           
           }

        }
        else{

        }
    })
}

render(){   
   
   //  console.log(name + 'hello')
    
   const  signOut = ()=>{
        firebase.auth().signOut();
        this.props.navigation.navigate('SignInScreen')
        
    }
    return(
        
     <View style={{flex:1}}>
        <DrawerContentScrollView>
            <View style={style.draweContent}>
                <View style={[style.userInfoSection,{backgroundColor:'lightblue'}]}>
                        <View style={{flexDirection:'row',marginTop:15}}>
                            <TouchableOpacity onPress={()=>{
                               this.handlePickAvatar()
                            }}>
                              <Avatar.Image style={{marginLeft:30}}
                                
                                 source={{
                                
                                     uri: this.state.avatar 
                                   
                                 }}
                                 size={100}
                              />
                              
                              </TouchableOpacity>
                        </View>
                       

                        <View style={{}}>
                              {
                        


                              }
                                <Title style={[style.title,{marginTop:15,fontWeight:'bold'}]}>{this.state.name }</Title>
                                  
                                <Caption style={style.caption}>{ this.state.email }</Caption>
                        </View>

                 </View>
                    
            </View>
        </DrawerContentScrollView>

        <Drawer.Section style={[{marginBottom:175}]}>
             <DrawerItem style={{border:1,backgroundColor:'white'}}
              
               icon={({color,size})=>{
                <MaterialIcons name="account-circle" size={size} color={color} />
               }}
               label='Profile'
               onPress={()=>{this.props.navigation.navigate('Profile')}}
             
             />
     
               
   
             <DrawerItem style={{border:1,backgroundColor:'grey',marginTop:20}}
              
               icon={({color,size})=>{
                <FontAwesome5 name="home" size={24} color="black" />
               }}
               label='Home'
               onPress={()=>{this.props.navigation.navigate('Home')}}
             
             />
       

        
           
      
      </Drawer.Section>

   
         
         <Drawer.Section style={style.bottomDrawerSection}>
             <DrawerItem style={{backgroundColor:'pink'}}
              
               icon={({color,size})=>{
                    
                <FontAwesome  onPress={()=>{signOut()}}name="sign-out" size={24} color="black" />
               }}
               label='Sign Out'
               onPress={()=>{this.props.navigation.navigate('SignIn')}}
             
             />
         </Drawer.Section>
            
    </View>
  )
 }
} 
const style = StyleSheet.create({
    draweContent:{
        flex:1,
    },
    userInfoSection:{
        paddingLeft:20,
    },
    title:{
        fontSize:16,
        marginTop:3,
        fontWeight:'bold'
    },
    caption:{
        fontSize:14,
        lineHeight:14
    },
    row:{
        marginTop:20,
        flexDirection:'row',
        alignItems:'center'
    },
    section:{
        flexDirection:'row',
        alignItems:'center',
        marginRight:15,
    },
    paragraph:{
        fontWeight:'bold',
        marginRight:3,
    },
    drawerSection:{
        marginTop:15,
    },
    bottomDrawerSection:{
        marginBottom:15,
        borderTopColor:'#f4f4f4',
        borderTopWidth:1
    },
    preference:{
        flexDirection:'row',
        justifyContent:'center',
        paddingVertical:12,
        paddingHorizontal:16,
    }
    

});
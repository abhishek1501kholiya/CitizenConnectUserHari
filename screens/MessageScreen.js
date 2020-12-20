import React from 'react'
import {View,Text,TouchableOpacity,StyleSheet,FlatList,Image,TextInput,ScrollView} from 'react-native'
import firebase  from 'firebase'
import { Ionicons } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from "expo-permissions";
import UserPermissions from '../Utilities/UserPermissions'
import DropDownPicker from 'react-native-dropdown-picker';
import db from './Config'

export default class ExploreScreen extends React.Component{
 
  constructor(){
    super()
    this.state={
      ImageRef:'',
      imagehelp:'',
      complain:'',
      reason:'',
      location:'',
      userID: '',
      email:'',
      name:''
    }
  }
  
  handlePick= async ()=>{
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    if(!cancelled){
        //this.uploadImage(uri)
        this.setState({
          imagehelp:uri
        })

    }
}
submitClicked = ()=>{
  this.uploadImage(this.state.imagehelp)
}
uploadImage = async(uri)=>{
    const response = await fetch(uri)
    const blob = await response.blob()
   if(uri !== null && uri !== undefined){
     console.log(uri);
    var image = this.state.imagehelp
    var image2 = image.slice(0,5)
    alert(image2)
    var ref  = firebase.storage().ref().child("Complaints/" + image2+ '1');
    return ref.put(blob).then((response) => {
      this.setState({
        ImageRef:uri
     }) 

       var userID = firebase.auth().currentUser.uid
       //so that the user can get the complain name under their node
       var userRef = db.ref('Users/' + userID ).child('Complains');
       var postData={
         ComplainName : this.state.complain
       }
       var newUserRef = userRef.push();
       newUserRef.set(postData)
       var useremail = db.ref('Users/' + userID).on('value',(data)=>{
          var email = data.val().email

          this.setState({
            email : email
          })
       });

       var username = db.ref('Users/' + userID).on('value',(data)=>{
         var name = data.val().firstName 
         this.setState(
           {
              name : name
           }
         )
       })
       
       var complainRef = db.ref('Users/').child('Complains/');
       var postData2={
         url:this.state.ImageRef,
         Title:this.state.complain,
         reason:this.state.reason,
         location:this.state.location,
         email: this.state.email,
         name:this.state.name

       }
       var newComplainRef = complainRef.push();
       newComplainRef.set(postData2)
  
      });
   } 
   
}
render(){
  
  return(
    <ScrollView>
     
       <Text style={{textAlign:'center',fontWeight:'bold',fontSize:24}}>Report</Text>
      <View>
        <TouchableOpacity onPress={()=>{this.handlePick()}} style={{alignSelf:'center',alignItems:'center'}}>
          <Ionicons name="ios-add-circle" size={44} color="black" />
        </TouchableOpacity>
         <Text style={{fontWeight:'bold', textAlign:'center'}}>You can add an image to support your complain</Text>
        
         <View>
           <Image  source={this.state.imagehelp } style={{width:300,height:300,alignSelf:'center'}}/>
         </View>

         <View style={{alignItems:'center'}}>
            <Text style={{fontWeight:'bold', fontSize:24,textAlign:'center'}}>Complain Type</Text>
            <TextInput placeholder="Eg - Street Light not Working" onChangeText={(complain)=>{this.setState({
              complain:complain
            })}} style={{width:200,height:35,borderWidth:1,borderColor:'black'}}></TextInput>

         </View>

         <View  style={{justifyContent : 'center',alignSelf:'center',alignItems:'center'}}>
            <Text>Location</Text>
            <TextInput placeholder="Enter The Location" style={{ width:150,height:35,borderRadius:10,borderWidth:2,borderColor:'black'}} onChangeText={(location)=>{this.setState({location:location})}}></TextInput>
         </View>

         <View style ={{marginBottom:50}} >
           <Text style={{fontWeight:'bold',fontSize:24,textAlign:'center',marginTop:50}}>Description of the Complaint</Text>
           <TextInput multiline={true} style={{width:250,height:75,borderWidth:1,borderColor:'black',alignSelf:'center'
          }}placeholder="Tell your Complaint in deep" onChangeText={(reason)=>{this.setState({
            reason:reason
          })}}></TextInput>
         </View>
        <View>
           <TouchableOpacity onPress={()=>{ this.submitClicked()
            alert('Your Complain registered sucessfully')}}style={{marginBottom:20,width:150,height:35,backgroundColor:'green',alignItems:'center',alignSelf:'center',borderRadius:10}}>
             <Text style ={{fontWeight:"bold",fontSize:24}}>Submit</Text>
           </TouchableOpacity>
        </View>
     
       </View>
    </ScrollView>
  )

}
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})
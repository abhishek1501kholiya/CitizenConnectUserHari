import React from 'react'
import {View,Text,TouchableOpacity,StyleSheet,Dimensions,Platform,TextInput,KeyboardAvoidingView} from 'react-native'
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';  
import { AntDesign } from '@expo/vector-icons'; 
// /import { ThemeProvider } from '@react-navigation/native';
import db from './Config'
import firebase from 'firebase'

class SignUpScreen extends React.Component {
    constructor(){
        super()
        this.state={
            name:'',
            email:'',
            password:'',
            Phoneno:'',
            check_textInputChange:false,
             secureTextEntry:true
        }
    }
    render(){
        return(
           <KeyboardAvoidingView style={styles.container} behavior={"padding"} enabled>
               <View style={styles.header}>
                   <Text style={styles.text_header}>Register Now</Text>
               </View>
              
              <View style={styles.footer}>
                   <Text style={styles.text_footer}>Name</Text>
                   <View style={styles.action}>
                        <TextInput placeholder=" Your Name" style={[styles.textInput,{borderWidth:1,borderColor:'black',borderRadius:10,height:35}]}
                         autoCapitalize="none"
                         onChangeText={(name)=>{
                             this.setState({
                                 name:name
                             })
                         }}
                        ></TextInput>
                   </View>

                   <Text style={[styles.text_footer,{marginTop:15}]}>Email</Text>
                   <View style={styles.action}>
                   <FontAwesome name="user-o" size={24} color="black" />

                    <TextInput placeholder="Your Email" style={styles.textInput} 
                     autoCapitalize="none"
                     onChangeText={(email)=>{this.setState({
                        email:email
                      })}}
                     ></TextInput>

                     {this.state.email ?
                        <Feather name="check-circle" size={20} color="green" />

                      :null}
                    </View>

                    <Text style={[styles.text_footer,{marginTop:15}]}>Password</Text>
                    <View style={styles.action}>
                      <FontAwesome style={{marginBottom:5,marginRight:5}} name="lock" size={24} color="black" />
                      <TextInput placeholder="Your Password" 
                        style={[styles.textInput,{borderWidth:1,borderColor:'black',borderRadius:0}]} 
                        secureTextEntry={this.state.secureTextEntry===true ? true : false}
                        autoCapitalize="none"
                        onChangeText={(password)=>{
                        this.setState({
                           password:password
                         })
                         }}
                      ></TextInput>
                     
                
                     

                    </View>
                    <View style={[styles.text_footer]}>
                   
                    <TextInput style ={[{borderWidth:1,borderColor:'black',marginLeft:40,height:35,width:250,marginTop:25}]} placeholder="Your Phone number"  maxLength={10}
                        keyboardType={"numeric"} onChangeText={(Phoneno)=>{this.setState({
                          Phoneno:Phoneno
                        })}}></TextInput>
                      </View>
                      

                    <View style={[styles.button,{marginTop:100}]}>
                
                    <TouchableOpacity  onPress={()=>{
                       if(this.state.name != null && this.state.name != '' && this.state.password != null && this.state.password != ' ' && this.state.email != null && this.state.email !='' && this.state.Phoneno !== null && this.state.Phoneno !== ''){
                        firebase
                        .auth()
                        .createUserWithEmailAndPassword(this.state.email, this.state.password)
                        .then(() => {
                          alert('account created sucessfully')
                          // var ref = db.ref('Users/').set({
                            //  name:name,
                             // email:email,
                          // })
                          var rootRef = db.ref().child("Users");
                          var userID = firebase.auth().currentUser.uid;
                          var userRef = rootRef.child(userID);
                          var userData = {
                            "firstName":this.state.name,
                            "email":this.state.email,
                            "Phonenumber":this.state.Phoneno
                          }
                          userRef.set(userData,(error)=>{
                            if(error){
                              var errorCode = error.code;
                              var errorMessage = error.message;
                              console.log(errorCode);
                              console.log(errorMessage)
                            }
                          }
                          )
                          this.props.navigation.navigate('SignIn')
                
                        })
                        .catch((error) => {
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            return alert(errorMessage);
                        });
                          
                      }else{
                        alert('kindly fill all the fields')
                      }
                     }}style={{width:200,height:45,borderRadius:10,backgroundColor:'#08D4C4',alignItems:'center'}}>
                     <Text style={{fontWeight:'bold',marginTop:10}}> REGISTER </Text>
                    </TouchableOpacity>

                   <TouchableOpacity onPress={()=>{this.props.navigation.navigate('SignIn')}}style={{marginTop:30,width:200,height:45,borderRadius:10,borderColor:'#009387',alignItems:'center',borderWidth:1,}}>
                    <Text style={{fontWeight:'bold',marginTop:10}}>Sign In </Text>
                   </TouchableOpacity>

        
                   </View>
           
                    

              </View>
            

           </KeyboardAvoidingView>
        )
    }
    
}
export default SignUpScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#009387'
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
    action:{
        flexDirection:'row',
        marginTop:10,
        borderBottomColor:'#f2f2f2',
        paddingBottom:5
    },
    textInput:{
        flex:1,
        marginTop:Platform.OS === 'ios' ? 0 : -12,
        paddingLeft:10,
        color:'#05375a'
    },
    button:{
        alignItems:'center',
        marginTop:50
    },
    signIn:{
        width:'100%',
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    },
    textSign:{
        fontSize:18,
        fontWeight:'bold'
    }
});
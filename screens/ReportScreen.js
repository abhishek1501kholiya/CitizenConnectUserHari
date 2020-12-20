import React ,{useState}from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Platform,Button,Picker,TextInput,KeyboardAvoidingView} from 'react-native'
//import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import firebase from 'firebase'
import db from './Config'

class DetailsScreen extends React.Component{
 constructor(){
   super()
   this.state={
     picker : 'Bio',
     numberOfGarbageBags:1,
     location:'',
     timeSlot:'7:00am - 8:00am',
     userId:firebase.auth().currentUser.uid
   }
 }
 
// async componentDidMount(){
//   try{
//   //  alert('Working')
//     var respone = await fetch('http://worldtimeapi.org/api/timezone/Indian/Cocos')
//     if(responese !== undefined){
//     var responseJSON = await response.json()
//     }
//      var datetime = responseJSON.datatime;
//      var date = datetime.slice(5,7);
//      console.log(date)

//   }catch(err){
//     alert(err)
//   }
 
//  }
componentWillMount(){
 
}
 
 render(){
  //var time;
  //var date;


  //const yesterday = moment().subtract(1,'day');
  //const disablePastDt = current =>{
   //  return current.isAfter(yesterday)
  //};
  var today = new Date();
   today.setDate(today.getDate()+1)
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var name, phoneNumber;
  var userref = db.ref('Users/' + this.state.userId ).on('value',(data)=>{ 
       phoneNumber = data.val().Phonenumber;
       name = data.val().firstName
  });
  
  const Schedule = ()=>{
     
  
    var ref = db.ref('Users/').child('Schedules');
    var scheduleData = {
       timeSlot : this.state.timeSlot,
       kindOfWaste: this.state.picker,
       numberOfGarbageBags:this.state.numberOfGarbageBags,
       location:this.state.location,
       phoneNumber:phoneNumber,
       date:date,
       name : name
    }
    var newScheduleData  = ref.push()
    newScheduleData.set(scheduleData)

    var ref2 = db.ref('Users/' + this.state.userId).child('Schedules');
    var userScheduleData ={
      timeSlot:this.state.timeSlot,
      kindOfWaste:this.state.picker,
      numberOfGarbageBags:this.state.numberOfGarbageBags,
      date:date + 1
    }
    var newUserScheduleDate = ref2.push();
    newUserScheduleDate.set(userScheduleData)
    alert('Your Pickup Scheduled sucessfully')
    this.props.navigation.navigate('Home')
  }
  
  return (
    <KeyboardAvoidingView  behavior={"padding"} enabled>
       <Text style={{textAlign:'center',fontWeight:'bold',fontSize:28}}>Schedule the garbage Truck</Text>
        <View style={{justifyContent:'center',alignSelf:'center',alignItems:'center',marginTop:50}}>
          <Text style={{fontWeight:'bold',fontSize:20}}>Select a Time Slot for tomorrow</Text>
          <View >
          <Picker
           selectedValue={this.state.timeSlot}
           style={{ height: 50, width: 150 }}
           onValueChange={(itemValue, itemIndex) => this.setState({timeSlot:itemValue})}
         >
          <Picker.Item label="7:00am - 8:00am" value="7:00am - 8:00am" />
          <Picker.Item label="8:00am - 9:00am" value="8:00am - 9:00am" />
          <Picker.Item label="9:00am - 10:00am" value="9:00am - 10:00am" />

        </Picker>
          </View>
        </View>
       <View style={{marginTop:25,alignItems:'center',alignSelf:'center'}}>
         <Text style={{fontWeight:'bold',fontSize:20}}>Kind of Waste</Text>
         <Picker
           selectedValue={this.state.picker}
           style={{ height: 50, width: 150 }}
           onValueChange={(itemValue, itemIndex) => this.setState({picker:itemValue})}
         >
          <Picker.Item label="Bio" value="Bio" />
          <Picker.Item label="Non-Bio" value="Non-Bio" />
          <Picker.Item label="Both" value="Both" />

        </Picker>

        <Text style={{fontWeight:'bold',marginTop:25,fontSize:20}}>Number of bags of garbage</Text>
        <Picker
           selectedValue={this.state.numberOfGarbageBags}
           style={{ height: 50, width: 150 }}
           onValueChange={(itemValue, itemIndex) => this.setState({numberOfGarbageBags:itemValue})}
         >
          <Picker.Item label={1} value={1} />
          <Picker.Item label={2} value={2}/>
          <Picker.Item label={3} value={3} />
          <Picker.Item label={5} value={5}/>
          <Picker.Item label={'7+'} value={7} />
          
        </Picker>

      </View>

      <View style={{marginTop:25,alignSelf:'center',alignSelf:'center'}}>
         <Text style={{fontWeight:'bold',fontSize:20}}>Enter the location</Text>
        <TextInput placeholder="Location of Pickup" style={{width:250,height:35,borderWidth:1,borderColor:'black'}} onChangeText={(location)=>{this.setState({
          location : location
        })}}></TextInput>
      </View>

      <View style={{marginTop:50,alignSelf:'center',alignItems:'center'}}>
        <TouchableOpacity onPress={()=>{
           Schedule()
        }}style={{width:150,height:35,backgroundColor:'blue',borderRadius:10}}>
           <Text style={{textAlign:'center',fontWeight:'bold'}}>Schedule</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
      }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 40,
      alignItems: "center"
    }
  });
export default DetailsScreen
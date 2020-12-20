import React from 'react'
import {View,Text,TouchableOpacity} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import HomeScreen from './HomeScreen'
import DetailsScreen from './ReportScreen'
import ExploreScreen from './MessageScreen'
import ProfileScreen from './ProfileScreen'
import {FontAwesome5} from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons'
import ReportScreen from './ReportrealScreen'
import { AntDesign } from '@expo/vector-icons'; 
const HomeStack = createStackNavigator();
const ReportStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const MainTabScreen = ()=>{
return(
    <Tab.Navigator
    initialRouteName="Home"
    activeColor="#e91e63"
    style={{ backgroundColor: 'tomato' }}
  >
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <FontAwesome5 name="home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Pickup"
      component={ReportStackScreen}
      options={{
        tabBarLabel: 'Pickup',
        tabBarIcon: ({ color }) => (
          <FontAwesome5 name="truck-pickup" size={22} color="black" />
        ),
      }}
    />
    <Tab.Screen
      name="Explore"
      component={ExploreScreen}
      options={{
        tabBarLabel: 'Report',
        tabBarIcon: ({ color }) => (
          <AntDesign name="notification" size={24} color="black" />
        ),
      }}
    />
     <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => (
            <MaterialIcons name="account-circle" size={24} color="black" />

        ),
      }}
    />
  </Tab.Navigator>
)

}
const HomeStackScreen = ({navigation})=>(
   <HomeStack.Navigator screenOptions={{
         headerStyle:{
          backgroundColor:'#009397',
          height:65
       },
        headerTitleStyle:{
         fontWeight:'bold'
       }
      }}>
          <HomeStack.Screen name="Home" component={HomeScreen} options={{
           title:'Go News!',
           headerLeft:()=>(
            <TouchableOpacity  style={{marginLeft:15}}onPress={()=>{navigation.toggleDrawer()}}>
                <FontAwesome5  name="bars" size={24} color="#161924"/>
            </TouchableOpacity> 
          
           )
          }}/>

        
      
     </HomeStack.Navigator>
)

const ReportStackScreen = ({navigation})=>(
  <ReportStack.Navigator screenOptions={{
        headerStyle:{
         backgroundColor:'#009397',
         height:65
      },
       headerTitleStyle:{
        fontWeight:'bold',
        
      },
      headerLeft:()=>(
        <TouchableOpacity  style={{marginLeft:15}}onPress={()=>{navigation.toggleDrawer()}}>
            <FontAwesome5  name="bars" size={24} color="#161924"/>
        </TouchableOpacity> 
      
       )
     }}>
        <ReportStack.Screen name="Pickup" component={DetailsScreen}/>
        <ReportStack.Screen name="Home" component={HomeScreen} />
      
      
  </ReportStack.Navigator>
)
export default MainTabScreen
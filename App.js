import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useMemo} from 'react';
import { StyleSheet, Text, View , ActivityIndicator } from 'react-native';
import {DrawerActions, NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import HomeScreen from './screens/HomeScreen'
import {FontAwesome5} from '@expo/vector-icons'
import MainTabScreen from './screens/MainTabScreen'
import {DrawerContent} from './screens/DrawerContent'
import SettingsScreen from './screens/SettingsScreen'
import RootStackScreen from './screens/RootStackScreen'
import {AuthContext} from './components/Context'
import SignInScreen from './screens/SignInScreen'
import SignUpScreen from './screens/SignUpScreen'
import ReportScreen from './screens/ReportrealScreen'
import DetailsScreen from './screens/ReportScreen'
import SplashScreen from './screens/SplashScreen'
const Drawer= createDrawerNavigator();
export default function App() {
  const [isLoading,setIsLoading] = React.useState(true);
  const [userToken,setUserToken] = React.useState(null);

   const authContext = React.useMemo(()=>({
     signIn:()=>{
       setUserToken('fgkj')
       setIsLoading(false)
     },
     signOut:()=>{
        setUserToken(null)
        setIsLoading(false)
     },
    signUp:()=>{
       setUserToken('fgkj')
       setIsLoading(false);
     }
   }))
  
    useEffect(()=>{
       setTimeout(()=>{
         setIsLoading(false);
       },100)
    },[]);

   if(isLoading){
     return(
       <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
         <ActivityIndicator size="large"/>
      </View>
     )
   }
   return (
   
      <NavigationContainer>
      
    
        <Drawer.Navigator drawerContent={props=> <DrawerContent{...props} />}>
        <Drawer.Screen name="Splash" component={SplashScreen}/>
            <Drawer.Screen name="SignIn" component={SignInScreen}/>
            <Drawer.Screen name="SignUp" component={SignUpScreen}/> 
             <Drawer.Screen name="HomeDrawer" component={MainTabScreen}/>
             <Drawer.Screen name="SettingsScreen" component={SettingsScreen}/>
             <Drawer.Screen name="Report" component={ReportScreen}/>
             <Drawer.Screen name="Pickup" component={DetailsScreen}/>
     
      </Drawer.Navigator> 
     </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

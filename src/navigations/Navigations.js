import { View, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import Home from '../screens/HomeScreen';
import { Auth, Hub } from 'aws-amplify';


export{SigninScreen};

const Navigation = () => {
  const [ user, setUser] = useState(undefined);

  const checkUser = async() =>{
    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      setUser(authUser);
    } catch (e) {
      setUser(null);
    }
  }
  useEffect(()=>{
    checkUser();
  },[]);

  useEffect(()=>{
    const listener = (data) =>{
      if (data.payload.event === 'signIn' || data.payload.event === 'signOut'){
        checkUser();
      }
    };
    Hub.listen('auth', listener);
    return() => Hub.remove('auth', listener);
  },[])

  if (user === undefined){
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator/>
      </View>
    )
  }



  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {user ? (
            <Stack.Group>
              <Stack.Screen name="Home" component={Home}/>
            </Stack.Group>
          ):(
            <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SigninScreen" component={SigninScreen}/>
            <Stack.Screen name="Signup" component={SignupScreen}/>
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen}/>
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
            <Stack.Screen name="NewPassword" component={NewPasswordScreen}/>
            </Stack.Group>
          )}
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
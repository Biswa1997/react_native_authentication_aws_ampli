import React, {useState} from 'react'
import { View, StyleSheet, Image, useWindowDimensions, ScrollView, Alert, ActivityIndicator } from 'react-native';
import logo from '../../../assets/images/logo.png';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import SocialSigninButton from '../../components/SocialSigninButton/SocialSigninButton';
import { useNavigation } from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';

const SigninScreen = () => {
  const {height} = useWindowDimensions();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const {control, handleSubmit, formState:{error}} = useForm();

  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  const onSigninPressed = async(data) => {
    if(loading){
      return
    }
    setLoading(true);
    try {
      await Auth.signIn(data.username, data.password)
      // navigation.navigate("Home");
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
    setLoading(false);
  }
  const onForgotPasswordPressed = () => {
    console.warn("Forgot Password?");
    navigation.navigate("ForgotPassword");
  }
  const onSignupPressed = () => {
    console.warn("Signup");
    navigation.navigate("Signup");
  }
  

  return (
    <ScrollView showsVerticalScrollIndicator={false}>

    <View style={styles.root}>
     
        <Image source={logo} style={[styles.logo, {height: height * 0.3}]} resizeMode='contain'/>
      

        <CustomInput placeholder='Username' name="username" control={control} rules={{required: "Username is required"}}/>
        <CustomInput placeholder='Password' name="password" control={control} secureTextEntry={true} rules={{required: "Password is required", minLength: {value: 8, message: 'Password should be minimum 8 chracters long.'}}}/>


    <CustomButton text={loading ? <ActivityIndicator/> : "Signin"} onPress={handleSubmit(onSigninPressed)} type='PRIMARY'/>
    <CustomButton text="Forgot password?" onPress={onForgotPasswordPressed} type='TERTIARY'/>

    <SocialSigninButton/>

    <CustomButton text="Don't have an account? Create one!" onPress={onSignupPressed} type='TERTIARY'/>
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root:{
    alignItems: 'center',
    padding: 30,
  },
  logo:{
    width: '70%',
    maxWidth: 300,
    height: 200,
  },
})

export default SigninScreen

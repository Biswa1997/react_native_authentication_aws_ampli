import React, {useState} from 'react'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import { useRoute } from '@react-navigation/native';
import { Auth } from 'aws-amplify';

const ConfirmEmailScreen = () => {
  const route = useRoute();
  const {control, handleSubmit, watch} = useForm({
    defaultValues: {username: route?.params?.username}
  });
  const username = watch("username");
  
  const navigation = useNavigation();

  const onConfirmPressed = async(data) => {
    try {
      await Auth.confirmSignUp(data.username, data.code);
      navigation.navigate("Signin");
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  }
  const onSigninPressed = () => {
    navigation.navigate("SigninScreen");
  }
  const onResendPressed = async() => {
    try {
      await Auth.resendSignUp(username);
      Alert. alert("Success", 'Code was resent to your email!');
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  }
  

  return (
    <ScrollView showsVerticalScrollIndicator={false}>

    <View style={styles.root}>
        <Text style={styles.title}>Confirm your Email</Text>

        <CustomInput 
        placeholder='Username' 
        name="username" 
        control={control} 
        rules={{
          required: "Username is required."
        }}/>

        <CustomInput 
        placeholder='Enter your confirmation code' 
        name="code" 
        control={control} 
        rules={{
          required: "Confirmation code is required."
        }}/>
        
    <CustomButton text="Confirm" onPress={handleSubmit(onConfirmPressed)}/>

    <CustomButton text="Resend code" onPress={onResendPressed} type='SECONDARY'/>
    <CustomButton text="Back to Signin" onPress={onSigninPressed} type='TERTIARY'/>
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root:{
    alignItems: 'center',
    padding: 30,
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10
  },
  text:{
    color: 'grey',
    fontSize: 12,
    marginVertical: 10
  },
  links:{
    color: 'red'
  }
})

export default ConfirmEmailScreen
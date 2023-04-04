import React, {useState} from 'react'
import { View, Text, StyleSheet, ScrollView , Alert} from 'react-native';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import { Auth } from 'aws-amplify';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const {control, handleSubmit} = useForm();

  const onSendPressed = async(data) => {
    try {
      await Auth.forgotPassword(data.username);
      navigation.navigate("NewPassword");
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  }
  const onSigninPressed = () => {
    navigation.navigate("SigninScreen");
  }
  

  return (
    <ScrollView showsVerticalScrollIndicator={false}>

    <View style={styles.root}>
        <Text style={styles.title}>Reset your Password</Text>
        <CustomInput placeholder='Username' name='username' control={control} 
        rules={{
          required: "Username is required"
        }}/>
        
    <CustomButton text="Send" onPress={handleSubmit(onSendPressed)}/>

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

export default ForgotPasswordScreen
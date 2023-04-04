import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, useWindowDimensions, ScrollView, Alert } from 'react-native';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import SocialSigninButton from '../../components/SocialSigninButton/SocialSigninButton';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import {Auth} from 'aws-amplify';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const SignupScreen = () => {
  const navigation = useNavigation();

  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [passwordRepeat, setPasswordRepeat] = useState('');
  const { control, handleSubmit, watch, formState: { error } } = useForm();
const pwd = watch('password');

  const onRegisterPressed = async(data) => {
    const {username, email, password, name} = data;
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {email, name, preferred_username: username}
      })
      navigation.navigate("ConfirmEmail", {username});
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  }
  const onTermofUsePressed = () => {
    console.warn("Term of Use");
  }
  const onPrivacyPolicyPressed = () => {
    console.warn("Privacy Policy");
  }
  const onSigninPressed = () => {
    console.warn("Signin");
    navigation.navigate("SigninScreen");
  }


  return (
    <ScrollView showsVerticalScrollIndicator={false}>

      <View style={styles.root}>
        <Text style={styles.title}>Create Account</Text>

        <CustomInput
          placeholder='Full name'
          name="name"
          control={control}
          rules={{
            required: "Full name is required",
            minLength: { value: 3, message: 'Full name should be minimum 3 chracters long.' },
            maxLength: { value: 15, message: 'Full name should be maximum 15 chracters long.' }
          }} />

        <CustomInput
          placeholder='Username'
          name="username"
          control={control}
          rules={{
            required: "Username is required",
            minLength: { value: 3, message: 'Username should be minimum 3 chracters long.' },
            maxLength: { value: 15, message: 'Password should be maximum 15 chracters long.' }
          }} />
        <CustomInput
          placeholder='Email'
          name="email"
          control={control}
          rules={{ required: "Email is required" , pattern: {value: EMAIL_REGEX, message:"Email is invalid"}}}
        />
        <CustomInput
          placeholder='Password'
          name="password"
          control={control}
          secureTextEntry={true}
          rules={{
            required: "Password is required",
            minLength: { value: 8, message: 'Password should be minimum 8 chracters long.' }
          }}
        />
        <CustomInput
          placeholder='Reapeat Password'
          name='password-repeat' 
          control={control} secureTextEntry={true}
          rules={{
            validate: value => value===pwd || 'Password do not match.'
          }} />

        <CustomButton text="Register" onPress={handleSubmit(onRegisterPressed)} />

        <Text style={styles.text}>By registering, you coonfirm that you accept our <Text style={styles.links} onPress={onTermofUsePressed}>Terms of Use</Text> and <Text style={styles.links} onPress={onPrivacyPolicyPressed}>Privacy Policy</Text>.</Text>

        <SocialSigninButton />

        <CustomButton text="Already have an account? Signin!" onPress={onSigninPressed} type='TERTIARY' />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10
  },
  text: {
    color: 'grey',
    fontSize: 12,
    marginVertical: 10
  },
  links: {
    color: 'red'
  }
})

export default SignupScreen
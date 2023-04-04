import React from 'react'
import CustomButton from '../CustomButton/CustomButton'

const onSigninFacebook = () => {
    console.warn("Facebook");
  }
  const onSigninGoogle = () => {
    console.warn("Google");
  }
  const onSigninApple = () => {
    console.warn("Apple");
  }

const SocialSigninButton = () => {
  return (
    <>
    <CustomButton text="Signin with Google" onPress={onSigninGoogle} bgColor='#FAE9EA' fgColor='#DD4D44'/>
    <CustomButton text="Signin with Facebook" onPress={onSigninFacebook} bgColor='#E7EAF4' fgColor='#4765A9'/>
    <CustomButton text="Signin with Apple" onPress={onSigninApple} bgColor='#e3e3e3' fgColor='#363636'/>
    </>
  )
}

export default SocialSigninButton
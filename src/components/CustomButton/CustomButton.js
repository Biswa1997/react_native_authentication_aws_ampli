import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native'

const CustomButton = ({onPress, text, type='PRIMARY', bgColor, fgColor}) => {
  return (
    <Pressable 
    style={[styles.container, styles[`container_${type}`], bgColor ? {backgroundColor: bgColor} : {}]} 
    onPress={onPress}
    >
        <Text style={[styles.text, styles[`text_${type}`], fgColor ? {color: fgColor} : {}]}>{text}</Text>

    </Pressable>
  )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        padding: 12,
        marginVertical: 3,
        alignItems: 'center',
        borderRadius: 5
    },
    container_PRIMARY:{
        backgroundColor: 'red',
    },
    container_TERTIARY:{

    },
    container_SECONDARY:{
        borderColor: 'red',
        borderWidth: 2
    },
    text:{
        color: 'white',
        fontWeight: 'bold',
    },
    text_PRIMARY:{

    },
    text_TERTIARY:{
        color: 'grey',
    },
    text_SECONDARY:{
        color: 'red',
    },
})
export default CustomButton
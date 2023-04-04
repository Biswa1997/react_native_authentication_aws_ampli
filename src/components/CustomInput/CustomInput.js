import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';

const CustomInput = ({ control, name, rules = {}, placeholder, secureTextEntry }) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
        <View style={[styles.container, {borderColor: error ? 'red' : '#e8e8e8'}]}>
          <TextInput
            placeholder={placeholder}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            style={styles.input}
            secureTextEntry={secureTextEntry} />
        </View>
        {error && <Text style={{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>}
        </>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,

    elevation: 5,
    shadowColor: '#52006A',

  },
  input: {}
})

export default CustomInput
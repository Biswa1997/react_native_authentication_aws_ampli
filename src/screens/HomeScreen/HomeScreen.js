import { View, Text } from 'react-native'
import React from 'react'
import { Auth } from 'aws-amplify';

const Home = () => {
  const signOut = () => {
    Auth.signOut();
  }
  return (
    <View>
      <Text style={{fontSize: 24, alignSelf: 'center'}}>HomeScreen</Text>
      <Text
      onPress={signOut}
      style={{
        width: '100%',
        textAlign: 'center',
        color: 'red',
        marginTop: 'auto',
        marginVertical: 20,
        fontSize: 20
      }}
      >Sign Out</Text>
    </View>
  )
}

export default Home
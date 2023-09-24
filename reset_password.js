import { useNavigation } from '@react-navigation/native';
/* eslint-disable no-undef */
import React, { useState  } from 'react';
import { View  } from 'react-native';
import {  Input, Icon, Button } from '@rneui/themed';

export default PasswordResetScreen = () => {
  const [errormessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation();
  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',

    }}>

      <Input

        leftIcon={{ type: 'entypo', name: 'email' }}
        placeholder=' Entrez votre gmail'
        errorStyle={{ color: 'red' }}
        errorMessage={errormessage}
        onChangeText={(text) => setEmail(text)}

      />
      <Button radius={"sm"} type="solid" buttonStyle={{
        backgroundColor: 'green',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 30,
      }}
        loading={loading}
        disabled={!(email)}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        titleStyle={{ fontWeight: 'bold', padding: 10 }} onPress={() => {
          {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            if (reg.test(email) === false) {
              setErrorMessage("Entrez un gmail valide.")
            }
            else {
              setErrorMessage("");
              setLoading(true)
              fetch('https://meubious.com/api/reset-password/?email=' + email, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },

              })
                .then((response) => response.json())
                .then((response) => {
                  console.log(response)
                  setLoading(false)
                  if (response.is_valid) {
                    navigation.navigate('reset_password_code', { code: response.code, email: email })
                  } else {
                    setErrorMessage(response.message);
                  }
                }

                )

            }
          }
        }}>
        Continuer
        <Icon name="arrow-forward" type='ionicon' color='white' />
      </Button>
    </View>
  )
}
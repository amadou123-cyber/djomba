 
import { useNavigation, useRoute } from '@react-navigation/native';
/* eslint-disable no-undef */
import React, { useState, useEffect  } from 'react';
import { View, StyleSheet,   SafeAreaView, Image,   Dimensions,  TouchableOpacity, TextInput, Modal, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { Text,Input, Icon,Button  } from '@rneui/themed';
 
export default ResetPasswordCodeScreen = () => {
    const [errormessage,setErrorMessage] = useState('');
    const [code,setCode]  = useState('');
    const route = useRoute()
    const code_received = route.params.code
    const email = route.params.email
    const navigation = useNavigation();
    return (
        <View style={{
            flex:1, 
            alignItems:'center',
            justifyContent:'center',

        }}>
           
            <Input
             keyboardType='number-pad'
             maxLength={6}
            leftIcon={{ type: 'ant-design', name: 'codesquare' }}
      placeholder=' Entrez le code envoyé à votre gmail.'
      errorStyle={{ color: 'red' }}
      errorMessage={errormessage}
      onChangeText={(text) => 
        {    setCode(text);
             console.log(text,code_received)
            if (text.length === 6){
              if ( parseInt(text )   ==  parseInt(code_received) ){
                navigation.navigate('reset_password_last',{email:email })
              }
              else {
                setErrorMessage( "ce code n'est pas valable.")
              }
            }
            else {
                setErrorMessage( " ")
            }
            
        }}
      
    /> 
                             
        </View>
    )
}
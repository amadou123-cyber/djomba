import { useNavigation, useRoute } from '@react-navigation/native';
/* eslint-disable no-undef */
import React, { useState, useEffect  } from 'react';
import { View, StyleSheet,   SafeAreaView, Image,   Dimensions,  TouchableOpacity, TextInput, Modal, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { Text,Input, Icon,Button  } from '@rneui/themed';
import { useLogin } from './context/loginprovider';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
export default ResetPasswordLastScreen = () => {
    const [errormessage_password,setErrorMessagePassword] = useState('');
    const [errormessage_name,setErrorMessageName] = useState('');
 
    const [loading,setLoading] = useState(false);
    const [password,setPassword] = useState('');
    const route = useRoute()
    const email = route.params.email;
    const { setIsLoggedIn,setUserProfile ,setToken} =  useLogin();
    const navigation = useNavigation();
    return (
        <View style={{
            flex:1, 
            alignItems:'center',
            justifyContent:'center',

        }}>
                        <Input
                rightIcon={{type:'feather',name:'check',color:'green'}}
              
         leftIcon={{ type: 'entypo', name: 'email' }}
  disabled
   errorStyle={{ color: 'red' }}
   value={email}
 
   onChangeText={(text) => setName(text)
      }
   
 />
           
             
                <Input
         
     
         leftIcon={{  type:'feather', name: 'key' }}
   placeholder='Nouveau mot de passe'
   errorStyle={{ color: 'red' }}
   errorMessage={errormessage_password}
   onChangeText={(text) => {setPassword(text)
    if (text.length < 5){
        setErrorMessagePassword('le mot de passe doit avoir au moins 5 lettres.')
    }
    else {
        setErrorMessagePassword('')
    }
      }}
   
 /> 
         <Button radius={"sm"} type="solid" buttonStyle={{
                backgroundColor:  'green',
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 30,
              }}
              loading={loading}
              disabled ={ !( password.length >5)}
              containerStyle={{
                width: 300,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              titleStyle={{ fontWeight: 'bold', padding:10 }} onPress={() => { 
                setLoading(true)
                const data = new FormData();
               
                data.append('email',email);
                data.append('password',password);
                
                fetch('https://meubious.com/api/reset-password-dating/' , {
                    method: 'POST',
                    headers: {
                    
                        'Content-Type': 'multipart/form-data',
                    },
                    body:data
                  
                  })
                    .then((response) => response.json())
                    .then((response) => {
                        console.log(response);
                        setLoading(false)
                       if (response.is_valid){
                         
                        navigation.navigate('Connexion')
                 

                       } else {
                        setLoading(false);
                       } 
                          })
              }
               }>
             Changement du mot passe
             <Icon name="refresh-ccw" type='feather' color='white' />
</Button>                    
        </View>
    )
}
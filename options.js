import Ionicons from '@expo/vector-icons/Ionicons';
import { Button, StyleSheet, Text, TextInput, View, Image, Alert } from 'react-native';

export const navOptions = (nav) => {
     
  
    return {
        headerTitleAlign:"center",
 
        headerStyle:{
            backgroundColor:'#f4f4f4'
        } ,
        headerLeft: () => {
            return  <Ionicons name='arrow-back' color='black' size={30} onPress={() => nav.goBack()}/>
          } 
         
    }
}
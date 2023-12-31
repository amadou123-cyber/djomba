import { View, Text } from 'react-native'
import React, { useState,useEffect } from 'react'
import { useLogin } from './context/loginprovider';
import { FlatList } from 'react-native';
import { ListItem } from '@rneui/themed';

const FAQ = () => {
    const [faqs,setfaqs] = useState([])
    const url  = 'https://meubious.com/api/faq/';
    const {token} = useLogin()
    const faq = () => {
      fetch(url ,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        // body : 
  
      }).then((response) => response.json())
        .then((json) => { setfaqs(json)  })
        .catch((error) => { })
  
    };
    useEffect(
      faq, []
  
    )
  return (
     <FlatList data={faqs} keyExtractor={item => item.id} renderItem={({item,index}) =>(
        <ListItem>
            <ListItem.Content>
            <ListItem.Title style={{ fontStyle:'italic',fontWeight:'bold',margin:5}}>{index+1}.{item.question}</ListItem.Title>
            <ListItem.Subtitle style={{ fontStyle:'italic',}}>{item.response}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
     )} />
  )
}

export default FAQ
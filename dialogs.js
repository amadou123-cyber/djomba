import { StyleSheet, FlatList, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Avatar, Badge, Button, ListItem } from '@rneui/themed';

import Ionicons from '@expo/vector-icons/Ionicons';
import { useLogin } from './context/loginprovider';
import { useRef } from 'react';

export default function Dialog({ route, navigation }) {

  const { lastmessage, token, userprofile } = useLogin();
  const [data, setData] = useState([]);
  const [canLoad, setCanLoad] = useState(true);
  const [searching, setSearching] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);

  const getMessages = async () => {

    try {


      setSearching(true);
      const response = await fetch(`https://meubious.com/api/dialogs-dating/?page=${currentPage}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        // body : 

      });
      const json = await response.json();


      if (!json.dialogs) {

        setData([])
      } else {
        if (currentPage === 1) {
          setData(json.dialogs)
        }
        else {
          setData([...data, ...json.dialogs])
        }
      }
      setSearching(false);
      if (!json.pagination) {
        setCanLoad(false)
      } else { setCanLoad(true); setCurrentPage(currentPage + 1) }

    } catch (error) {
      //console.error(error);
    } finally {
      //
    }

  }
  useEffect(() => {

    setData([]);
    setCurrentPage(1);
    getMessages();
  }, [userprofile, lastmessage])
  return (
    <View style={{ flex: 1, padding: 10, justifyContent: 'center', textAlign: 'center' }}>

      <FlatList
        ListFooterComponent={() =>
          canLoad ? <Button loading={searching} onPress={getMessages} buttonStyle={{ padding: 10, margin: 30, width: 100, alignSelf: 'center' }} icon={{
            name: 'plus',
            type: 'font-awesome',
            size: 15,
            color: 'white',
          }} title='Voir Plus' /> : null}
        data={data}

        ListEmptyComponent={() => {
          return (
            !canLoad ?
              <Text style={{
                textAlign: 'center',
                fontSize: 17,
                fontWeight: '100',
                color: 'black',
                marginTop: 100
              }}>Pas de chats</Text> : null

          )

        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `${item.chat}-${index}`}
        renderItem={({ item }) => (
          <ListItem bottomDivider onPress={() => { navigation.navigate('Chat', item) }}>
            <Avatar
              rounded
              size={50}
              source={{ uri: 'https://meubious.com' + item.user.image }}
            />
            <ListItem.Content>
              <ListItem.Title style={{
                fontSize: 15,
                fontWeight: 'bold',

              }}>{item.user.nom} {item.user.online ? <Ionicons name="ellipse" size={12} color="green" /> : null}  </ListItem.Title>

              <ListItem.Subtitle ellipsizeMode='middle' numberOfLines={1}> {userprofile.id === item.chat.message.user.profile ? (item.chat.message.received ? <Ionicons name="eye" size={16}></Ionicons> : <Ionicons name="eye-off" size={16}></Ionicons>) : (!item.chat.message.received ? <Badge status="success" > </Badge> : null)}  {item.chat.message.text ? item.chat.message.text : 'Photo'}  </ListItem.Subtitle>
              <ListItem.Subtitle style={{
                color: '#37859b',

                right: 0
              }}>{item.chat.message.date}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )}

      />

    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,


    padding: 8,
    flexDirection: 'row',
    display: "flex",

    margin: 1,
    borderColor: "#c5c5c5",
    borderRadius: 10,
    marginVertical: 5


  },
  containerimage: {
    width: 60,
    height: 48,

    marginRight: 10
  }
});
import { StyleSheet, FlatList, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Avatar, Badge, Button, ListItem } from '@rneui/themed';

import Ionicons from '@expo/vector-icons/Ionicons';
import { useLogin } from './context/loginprovider';
import { useRef } from 'react';

export default function Notifications({ route, navigation }) {

    const { setNotification, token, userprofile } = useLogin();
 
    const [data, setData] = useState([]);
    const [canLoad, setCanLoad] = useState(true);
    const [searching, setSearching] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)
    const getMessages = async () => {

        try {


            setSearching(true);
            const response = await fetch(`https://meubious.com/api/notifications/?page=${currentPage}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                // body : 

            });
            const json = await response.json();



            if (!json.notifications) {

                setData([])
              } else {
                if (currentPage === 1) {

                  setData(json.notifications)
                }
                else {
                  setData([...data, ...json.notifications])
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

       
        getMessages();
    }, [userprofile ])
    return (
        <View style={{ flex: 1, padding: 10, justifyContent: 'center', textAlign: 'center' }}>

            <FlatList

                data={data}
                ListFooterComponent={() =>
                    canLoad ? <Button loading={searching} onPress={getMessages} buttonStyle={{ padding: 10, margin: 30 ,borderRadius:50, alignSelf: 'center' }} icon={{
                      name: 'arrow-down',
                      type: 'font-awesome',
                      size: 15,
                      color: 'white',
                    }} /> : null}
                ListEmptyComponent={() => {
                    return (
                    (!searching ?
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 17,
                            fontWeight: '100',
                            color: 'black',
                            marginTop: 100
                        }}>Pas de Notifications</Text>: null)

                    )

                }}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => `${item.chat}-${index}`}
                renderItem={({ item }) => (
                    <ListItem bottomDivider onPress={() => 
                        fetch(`https://meubious.com/api/notification/${item.id}/`, {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'multipart/form-data',
                              'Authorization': `Token ${token}`,
                             
                              
                            },
                            //body: data,
                          })
                            .then((response) => response.json())
                            .then((response) => { 
                                 const item_id = item.id;
                                setData(data.filter(item => item.id !== item_id))   
                            if (response.is_valid) { 
                                navigation.navigate('ProfileDetail', { id: item.from_dating.profile, name: item.from_dating.nom, age: getAge(item.from_dating.birthdate) })
                            
                          }
                            
                        })
                            .catch((error) => {
                              //console.log('error', error);
                            }) 
                     
                    }>
                        <Avatar
                            rounded
                            size={50}
                            source={{ uri: 'https://meubious.com' + item.from_dating.image }}
                        />
                        <ListItem.Content>
                            <ListItem.Title style={{
                                fontSize: 15,
                                fontWeight: 'bold',

                            }}>{item.from_dating.nom} {item.from_dating.online ? <Ionicons name="ellipse" size={12} color="green" /> : null}  </ListItem.Title>

                            <ListItem.Subtitle >{item.message} </ListItem.Subtitle>
                            <ListItem.Subtitle style={{ color: '#37859b', right: 0 }}>{item.created_date}</ListItem.Subtitle>
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
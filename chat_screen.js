import { FlatList, TouchableWithoutFeedback, Keyboard, Image, Platform, StyleSheet, Alert, TouchableOpacity, TextInput, KeyboardAvoidingView, Text, Modal, View, ActivityIndicator } from "react-native";
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation, useRoute } from "@react-navigation/native";
 
import { HeaderBackButton } from "@react-navigation/elements";
import { Avatar, Card, Icon, SpeedDial, Button, Input ,ListItem} from "@rneui/themed";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { useLogin } from "./context/loginprovider";
import { useHeaderHeight } from '@react-navigation/elements'
import tw from 'twrnc';
import ImageView from "react-native-image-viewing";
import * as ImagePicker from 'expo-image-picker'; 
import { useRef } from "react";
 
 
 




export default function MyChat() {
    const navigation = useNavigation() //call for navigation
    const route = useRoute().params;
    const  height = useHeaderHeight();
    const {setLastMessage} = useLogin();
   const ws = useRef(null);
   const [socketclose,setSocketClose] = useState(false);
    const [message, setMessage] = useState('')
    const [open, setOpen] = useState(false)
    const { userprofile, token } = useLogin();
    const [images, setImages] = useState(null);
    const [visible,setVisible] = useState(false);
    const[loading,setLoading] =  useState(false);
    const[canLoad,setCanLoad] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);    
    const user = route.user;
    const [image,setImage] = useState(null)
 
    const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)
 

   
    const [messages, setMessages] = useState([ ]);
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing:true,
          quality:1
    
        });
    
        console.log(result);
    
        if (!result.canceled) {
         
         console.log('called ... ')

       

            const data = new FormData();

            result.assets.forEach((item, i) => {
           
                data.append("photos", {
                    uri: item.uri,
                    type: "image/jpg",
                    name: `filename_${i}.jpg`,
                });
 
            });
            data.append('message', '');
       
            fetch('https://meubious.com/api/messages-dating/' + route.chat.id + "/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${token}`,
                },
                body: data

            }).then((response) => response.json())
                .then((json) => {
                    
                    if (!json.is_valid) {
                        alert('Erreur...')
                    }
                    else {
                        setMessages(messages => [   json.message, ...messages ]);

                    }

                })
                .catch((error) => {
                    console.log('error', error);
                });

       
        }
      };
 
    const getMessages = async () => {
        try {
            console.log('page ',currentPage)
            setLoading(true)
            console.log(currentPage)
            const response = await fetch('https://meubious.com/api/messages-dating/' + route.chat.id + `/?page=${currentPage}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                // body : 

            });
            const json = await response.json();
           
            if (currentPage === 1) { 
            setMessages(json.messages);
        }
        else {
            setMessages([...messages,...json.messages]);

        }
        if(!json.pagination){setCanLoad(false)}else{setCanLoad(true)}
         
             


        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getMessages();
    }, [route.chat.id,currentPage])
     
    useLayoutEffect(() => {
        navigation.setOptions({
            title: '',
            headerLeft: () => (
                <View style={{
                    padding: 5, flexDirection: 'row',
                    display: "flex",
                }} >
                    <HeaderBackButton label='' style={{ marginRight: 15, marginLeft: 0 }} onPress={() => { navigation.goBack() }} />
 <TouchableOpacity style={{flexDirection: 'row' }} onPress={() =>navigation.navigate('ProfileDetail',{id:user.profile,name:user.nom,age:getAge(user.birthdate)})}> 
                    <Avatar   
                        size={50}
                        rounded
                        source={{
                            uri: 'https://meubious.com'+user.image,
                        }}
                    />
                    <View style={{
                        marginLeft: 10,
                    }}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                        }}  > {user.nom}{" "}{user.online ? <Ionicons name="ellipse" size={12} color="orange" /> : null}</Text>
                        <Text> {user.online ? 'En ligne' : 'Hors ligne'} </Text>
                    </View>
                    </TouchableOpacity>
                </View>
            ) 
        })
    }, [navigation]);
     
    const renderItem =  ({ item }) =>
    item.user.profile === userprofile.id ?
        <TouchableOpacity
            style={[tw`rounded-lg rounded-tr-none px-3 py-2 mx-1 my-1 `, {
                alignSelf: 'flex-start', marginLeft: 'auto', backgroundColor: '#3cb371'
            }]} onLongPress={() => Alert.alert('Suppression ', `Voulez vous vraiment supprimer ce message ?`, [
                {
                    text: 'Oui', onPress: () => {
                        const data = new FormData();
                        data.append('pk', item._id);
                        setMessages(messages.filter(message => message._id !== item._id))
                        fetch(`https://meubious.com/api/messages-dating/${route.chat.id}/`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                'Authorization': `Token ${token}`,

                            },
                            body: data,
                        })
                            .then((response) => response.json())
                            .then((response) => {

                            })
                            .catch((error) => {
                                console.log('error', error);
                            });
                    }
                },
                { text: 'Non' }
            ])}>
            <Text style={tw`text-black `}>{item.text} </Text>
            <FlatList
                data={item.images}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <TouchableOpacity style={{ width: 200, height: 200, paddingBottom: 8 }} onPress={ () => {setImages([{uri : item.url}]);setVisible(true) }}>
                        <Image style={{ width: '100%', height: '100%' }} source={{ uri: item.url }}></Image>
                    </TouchableOpacity>
                }
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{
                    color: 'white',
                    fontStyle: 'italic'
                }}>{item.date} </Text>
                {item.received ? <Text><Ionicons name="eye" size={17}> </Ionicons></Text> : <Text><Ionicons name="eye-off" size={17}> </Ionicons></Text>}</View>

        </TouchableOpacity>

        : <View style={[tw`rounded-lg rounded-tl-none px-3 py-2 mx-1 my-1 ml-14`, {
            alignSelf: 'flex-start', backgroundColor: 'white',
        }]}>
            <Image style={tw`h-10 w-10 rounded-full absolute top-0 -left-12`} source={{ uri: 'https://meubious.com'+user.image }}></Image>
            <Text style={tw`text-black `}>{item.text}  </Text>
            <FlatList
                data={item.images}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <TouchableOpacity style={{ width: 200, height: 200, paddingBottom: 8 }} onPress={() => {setImages([{uri : item.url}]);setVisible(true) }}>
                        <Image style={{ width: '100%', height: '100%' }} source={{ uri: item.url }}></Image>
                    </TouchableOpacity>
                }
            />
            <Text style={{
                color: '#37859b',
                fontStyle: 'italic'
            }}>{item.date}</Text></View>
 


    const renderLoader = () => {
        return (
          canLoad ?
            <View >
              <ActivityIndicator size="large" color="#aaa" />
            </View> : null
        );
      }; 
      const loadMoreItem = () => {
        if (canLoad && !loading){ 
          
        setCurrentPage(currentPage + 1);
      } 
      };
      
      const SendMessage = useCallback((message = []) => {

        const message_item = message;
        setMessage('');
        const sendMessages = async () => {
            try {

                data = new FormData()
                if (image) {
                    assets.forEach((item, i) => {
                        console.log(item)
                        data.append("photos", {
                            uri: item.uri,
                            type: "image/jpg",
                            name: `filename_${i}.jpg`,
                        });
                    });
                }
                data.append('message', message_item)
                const response = await fetch('https://meubious.com/api/messages-dating/' + route.chat.id + "/", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Token ${token}`,
                    },
                    body: data

                });
                const json = await response.json();
                if (!json.is_valid) {
                    alert('Erreur...')
                }
                else {
                    setMessages(messages => [json.message, ...messages]);
                    setLastMessage(json.message)

                }

            } catch (error) {
                console.error(error);
            }
        }
        sendMessages()
    }, []);
                     
   return (
    <> 
    <ImageView
            images={images}
            imageIndex={0}
            
            visible={visible}
            onRequestClose={() => setVisible(false)}
        />
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? "padding" : "height"}
    style={tw`flex-1`}
    keyboardVerticalOffset={height + 47}
>
 
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FlatList ListFooterComponent={renderLoader}
             onStartReached={loadMoreItem}
             onEndReachedThreshold={0.1}
            data={messages}
          inverted
            style={tw`pl-4`}
            bounces={false}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item,index) => `${item._id}${index}`}

        />


    </TouchableWithoutFeedback>

</KeyboardAvoidingView>

<View style={[tw`flex-row bg-white justify-between items-center border-t border-gray-200 px-1 py-1 `]}>
    <Input multiline numberOfLines={2} rightIcon ={message ? {
            type: 'font-awesome', name: 'send',color:'green',size:28,onPress:() => message ? SendMessage(message) : null
        }:<Icon
        type="font-awesome"
        name="camera"
        style={{
            marginBottom: 5,
            marginRight:4,
            transform: [{ rotateY: '180deg' }],
        }}
        size={25}
        color='blue'
        onPress={()=> pickImage() }
        tvParallaxProperties={undefined}
    />}
        containerStyle={  { flex: 1 ,borderBottomWidth:0  } } placeholder='message ...' onChangeText={(text) => setMessage(text)} value={message} />



         
</View>
</>
    );
}
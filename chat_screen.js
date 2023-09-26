import { FlatList, TouchableWithoutFeedback, Keyboard,KeyboardAvoidingView, Image,   Alert, TouchableOpacity,   Text,   View  } from "react-native";
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigation, useRoute } from "@react-navigation/native";

import { HeaderBackButton } from "@react-navigation/elements";
import { Avatar,  Icon,   Button, Input  } from "@rneui/themed";
import {   Ionicons } from "@expo/vector-icons";
import { useLogin } from "./context/loginprovider";
 
import tw from 'twrnc';
import ImageView from "react-native-image-viewing";
import * as ImagePicker from 'expo-image-picker';
 
 export default function MyChat() {
    const navigation = useNavigation() //call for navigation
    const route = useRoute().params;
    const { setLastMessage } = useLogin();
    const [message, setMessage] = useState('')
    const { userprofile, token } = useLogin();
    const [images, setImages] = useState(null);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [opened,setopened] = useState(false)
    const [canLoad, setCanLoad] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const user = route.user;
    const ws = useRef(null);
    const [image, setImage] = useState(null)
    const [hasimage, sethasimage] = useState(false)

    const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)
    const [messages, setMessages] = useState([]);
    const [last, setLast] = useState(1)
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1

        });
        if (!result.canceled) {
            const data = new FormData();
            sethasimage(true);
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

                    if (json.is_valid) {
                        //

                        setMessages(messages => [json.message, ...messages]);
                        sethasimage(false);
                        setLastMessage(json.message);


                    }

                })
                .catch((error) => {
                    //console.log('error', error);
                });


        }
    };

    const getMessages = async () => {
        try {

            setLoading(true);
            const response = await fetch('https://meubious.com/api/messages-dating/' + route.chat.id + `/?page=${currentPage}&last=${last}`, {
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
                setLast(json.last);
            }
            else {
                setMessages([...messages, ...json.messages]);

            }
            if (!json.pagination) { setCanLoad(false) } else { setCanLoad(true) }




        } catch (error) {
            // console.error(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getMessages();
    }, [route.chat.id, currentPage])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: '',
            headerLeft: () => (
                <View style={{
                    padding: 5, flexDirection: 'row',
                    display: "flex",
                }} >
                    <HeaderBackButton label='' style={{ marginRight: 15, marginLeft: 0 }} onPress={() => { navigation.goBack() }} />
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigation.navigate('ProfileDetail', { id: user.profile, name: user.nom, age: getAge(user.birthdate) })}>
                        <Avatar
                            size={50}
                            rounded
                            source={{
                                uri: 'https://meubious.com' + user.image,
                            }}
                        />
                        <View style={{
                            marginLeft: 10,
                        }}>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                            }}  > {user.nom}{" "}{user.online ? <Ionicons name="ellipse" size={12} color="green" /> : null}</Text>
                            <Text > {getAge(user.birthdate)} ans </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <Icon name='report' color='red' type='octicon' onPress={() => Alert.alert('Signaler', 'Voulez vous vraiment signaler cette personne ?', [
                    {
                        text: 'Oui', onPress: () => navigation.navigate('Report', { id: user.id, name: user.nom, age: user.birthdate, image: user.image })
                    },
                    {
                        text: 'Non'
                    }
                ])}></Icon>
            )
        })
    }, [navigation]);
    useEffect(() => {
        const socket = new WebSocket(`wss://meubious.com/ws/chat/chatdating_${route.chat.id}/`);
    
        socket.onopen = () => {
          console.log("opened chat");
        };
    
        socket.onclose = () => {
          console.log("closed chat ");
          setopened(!opened)
        };
    
        socket.onmessage = (event) => {
          const data = JSON.parse(event.data) ;
          if (data.type==='chat_message'){
            setMessages(messages => [data.message, ...messages]);
                    setLastMessage(data.message._id) 
 
          }
                            
           
       
        } 
        ws.current = socket;
        return () => {
          socket.close();
        };
    
         
    
       
      }, [ opened,route.chat.id]);

    const renderItem = ({ item }) =>
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
                                    //console.log('error', error);
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
                        <TouchableOpacity style={{ width: 200, height: 200, paddingBottom: 8 }} onPress={() => { setImages([{ uri: item.url }]); setVisible(true) }}>
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
                <Image style={tw`h-10 w-10 rounded-full absolute top-0 -left-12`} source={{ uri: 'https://meubious.com' + user.image }}></Image>
                <Text style={tw`text-black `}>{item.text}  </Text>
                <FlatList
                    data={item.images}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <TouchableOpacity style={{ width: 200, height: 200, paddingBottom: 8 }} onPress={() => { setImages([{ uri: item.url }]); setVisible(true) }}>
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
                <Button buttonStyle={{
                    backgroundColor: 'violet',
                    borderWidth: 2,
                    borderColor: 'white',
                    borderRadius: 30,
                }}

                    loading={loading}
                    disabled={loading}
                    containerStyle={{
                        
                        alignSelf: 'center',
                        marginHorizontal: 20,
                        marginVertical: 10,
                    }}
                    icon ={{name:'arrow-up',type:'font-awesome'}}
                    titleStyle={{ fontWeight: 'bold', padding: 5 }} onPress={
                        () => {
                            if (canLoad && !loading) {

                                setCurrentPage(currentPage + 1);

                            }
                        }
                    } >
                     

                </Button> : null
        );
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
                data.append('message', message_item);
                data.append('other',user.profile);
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

 
 alert('erreur ...')
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
    style = {{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : null}> 

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <FlatList ListFooterComponent={renderLoader}
  
                    ListHeaderComponent={() =>
                    (
                        hasimage ? <Text style={{
                            alignSelf: 'center',
                            margin: 10,
                            borderWidth: 1,
                            padding: 5,
                            borderRadius: 10,
                            backgroundColor: 'violet'
                        }}>Image en cours d'envoie ...</Text> : null
                    )}

                    data={messages}
                    inverted
                    style={tw`pl-4`}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `${item._id}${index}`}

                />
            </TouchableWithoutFeedback>
            <View style={[tw`flex-row bg-white justify-between items-center border-t border-gray-200 px-1 py-1 `]}>
                <Input multiline numberOfLines={2} rightIcon={message ? {
                    type: 'font-awesome', name: 'send', color: 'green', size: 28, onPress: () => message ? SendMessage(message) : null
                } : <Icon
                    type="font-awesome"
                    name="camera"
                    style={{
                        marginBottom: 5,
                        marginRight: 4,
                        transform: [{ rotateY: '180deg' }],
                    }}
                    size={25}
                    color='blue'
                    onPress={() => pickImage()}
                    tvParallaxProperties={undefined}
                />}
                    containerStyle={{ flex: 1, borderBottomWidth: 0 }} placeholder='message ...' onChangeText={(text) => setMessage(text)} value={message} />

            </View>
            </KeyboardAvoidingView>
        </>
    );
}
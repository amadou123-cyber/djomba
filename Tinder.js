import { View, Text, Image, RefreshControl, TouchableOpacity, ActivityIndicator, FlatList, Platform } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { withBadge, Icon, Card, Button, Badge, Avatar } from '@rneui/themed';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useLogin } from './context/loginprovider';


const Tinder = () => {
 
  
 
  const [datings, setDatings] = useState([])
  const [loading, setLoading] = useState(false);

  const { userprofile,  token ,setLastMessage  } = useLogin();
   const [message,setMessage] = useState(0)
  const [notification,setNotification] = useState(0)
  const ws = useRef(null); 
  const [opened,setopened] = useState(false)
  const [canLoad, setCanLoad] = useState(true)
  const [currentPage, setCurrentPage] = useState(1);
  const navigation = useNavigation()
  const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)
  const url = `https://meubious.com/api/datings/?page=${currentPage}`;
  const loaddata = () => {
    setLoading(true);

    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
      // body : 

    }).then((response) => response.json())
      .then((json) => { setDatings([...datings, ...json.data]); if (!json.pagination) { setCanLoad(false) } else { setCanLoad(true) } })
      .catch((error) => { })
      .finally(() => setLoading(false))

  };
 
  useEffect(
    loaddata, [currentPage]
  )
  useEffect(() => {
    const socket = new WebSocket(`wss://meubious.com/ws/chat/dating_${userprofile.id}/`);

    socket.onopen = () => {
      console.log("opened ");
    };

    socket.onclose = () => {
      //console.log("closed  ");
      setopened(!opened)
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data) ;
      console.log(data)
      if (data.type == 'chat_message'){
     
        if (data.notif){
          if (data.remove){
            setNotification((notification) => notification-1);
          }
          else {
            setNotification((notification) => notification+1);
          }
           
         

        }
        else {
          setMessage((message) => message+1);
          setLastMessage(data.chat_id);
        
        }
      
      }
       
   
    } 
    ws.current = socket;
    return () => {
      socket.close();
    };

     

   
  }, [ opened,userprofile]);
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
                icon={{name:'arrow-down',type:'font-awesome'}}
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
  useLayoutEffect(() => {
    const NotifIcon = withBadge(notification)(Icon);
    const MessageIcon = withBadge(message)(Icon);
    navigation.setOptions({
      title: 'djomba',
      headerLeft: () => (
        <>
          <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
            <View> 
            <Avatar source={{ uri: userprofile.image }} size={36} rounded/>
            <Badge
            status="success"
            
            containerStyle={{ position: 'absolute', top:4, left: 30}}
          />
          </View>
          
          
          </TouchableOpacity >
        
          <TouchableOpacity style={{ padding: 17 }} onPress={() => {setNotification((notification)=>notification-notification);navigation.navigate('Notification')} }>
            {
             notification  ? <NotifIcon name='bell' type='font-awesome' size={25} />:<Icon name='bell' type='font-awesome' size={25} />
            }
             


          </TouchableOpacity>
        </>
      )
      ,
      headerRight: () => (
        <>
          <TouchableOpacity style={{ margin: 3 }} onPress={() => navigation.navigate('Search')}>
            <Icon name='search' type='feather' size={25} />

          </TouchableOpacity>
          <TouchableOpacity style={{ paddingLeft: 17 }} onPress={() =>{ setMessage((message) => message-message);navigation.navigate('Chats')}  }>
 
            {
             message ? <MessageIcon name='chatbubble-ellipses-sharp' type='ionicon' size={25} />:<Icon name='chatbubble-ellipses-sharp' type='ionicon' size={25} />
            }

          </TouchableOpacity>


        </>
      )

    })
  }, [navigation, userprofile.image ,notification,message]);
  const renderItem = ({ item }) => (
    <Card containerStyle={{ margin: 3, padding: 0, borderRadius: 10, width: '48.5%' }} >
      <TouchableOpacity onPress={() => navigation.navigate('ProfileDetail', { id: item.profile, name: item.nom, age: getAge(item.birthdate) })}>
        <Image source={{ uri: 'https://meubious.com/' + item.image }} style={{ width: '100%', height: 200, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
        <View style={{ marginBottom: 5, padding: 5 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', }}>{item.nom} {item.online ? <Ionicons name="ellipse" size={12} color="green" /> : null} </Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold', }}>  {getAge(item.birthdate)} </Text>
          </View>
          <Text>{item.job}</Text>
        </View>
      </TouchableOpacity>
    </Card>)
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListFooterComponent={renderLoader}
        ListHeaderComponent = {() => ( Platform.OS === 'ios' ? <Button icon={
          <Icon
            name="refresh"
            type='ionicon'
            color="#ffffff"
            
          />
        } color='violet' buttonStyle={{
          padding:5,margin:5,borderRadius:8
        }} onPress={() =>{setDatings([]);setCurrentPage(1) }}> Actualiser  </Button>:null )}
   
     
        data={datings}
        numColumns={2}
        key={Math.random().toString()}
        renderItem={renderItem}
        bounces={false}
        refreshControl={<RefreshControl refreshing={false} onRefresh={() => { setDatings([]); setCurrentPage(1) }} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
      />
    </View>
  )
}
export default Tinder
import { View, Text,Image,RefreshControl,TouchableOpacity,ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { withBadge,Icon, Card } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useLogin } from './context/loginprovider';
 

const Tinder = () => {
    const BadgedIcon = withBadge(15)(Icon); 
    const  {setIsLoggedIn} = useLogin();
    const BadgedIconMatch = withBadge( '')(Icon);
    const [datings,setDatings] = useState([])
    const[loading,setLoading] =  useState(false);
    const {userprofile,token} = useLogin();
    const[canLoad,setCanLoad] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
     const navigation = useNavigation()
     const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)
     const url = `https://meubious.com/api/datings/?page=${currentPage}`;
     const loaddata = () =>
     {
        setLoading(true);
        
       fetch(url,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        // body : 

      }).then((response) => response.json())
       .then((json) => {  console.log(json.data);setDatings([...datings,...json.data]);if(!json.pagination){setCanLoad(false)}else{setCanLoad(true)}})
       .catch((error) =>console.log(error))
       .finally(()=>setLoading(false))
       
     };
     const loadMoreItem = () => {
        if (canLoad && !loading){ 
        setCurrentPage(currentPage + 1);
      } 
      };
     useEffect (
        loaddata,[currentPage]
     ) 
     const renderLoader = () => {
        return (
          loading ?
            <View >
              <ActivityIndicator size="large" color="#aaa" />
            </View> : null
        );
      };
    useLayoutEffect(() => {
        navigation.setOptions({
          
                title: 'djomba'  , 
 
                headerLeft: () => (
                    <> 
                    <TouchableOpacity onPress={() => navigation.navigate('Setting' )}>
                        <Image source={{ uri: userprofile.image }} style={{ width: 36, height: 36, borderRadius: 50 }} />
                    </TouchableOpacity >
                             <TouchableOpacity style={{padding:17}} onPress={() => navigation.navigate('Likes' )}>
                             <BadgedIconMatch name='heart' type='entypo' size={25}/>  
                            
                        </TouchableOpacity>
                        </>
                )
                ,
                headerRight: () => (
                    <>
                            <TouchableOpacity style={{margin:3}} onPress={() => navigation.navigate('Search')}>
                      <Icon name='search' type='feather'size={25}/>  
                    
                 </TouchableOpacity>
                    <TouchableOpacity style={{padding:17}} onPress={() => navigation.navigate('Chats')}>
                         <BadgedIcon name='chatbubble-ellipses-sharp' type='ionicon' size={25}/> 
                          
                        
                    </TouchableOpacity>
            
               
                 </>
                )
          
        })
    },[navigation]);
const renderItem = ({ item }) =>  ( 
    <Card containerStyle={{ margin:3,padding:0,borderRadius:10,width:'48.5%'}} >
    <TouchableOpacity onPress={() => navigation.navigate('ProfileDetail',{id:item.profile,name:item.nom,age:getAge(item.birthdate)})}>
      <Image  source={{ uri: 'https://meubious.com/'+item.image  }} style={{ width: '100%', height:200,borderTopLeftRadius:10,borderTopRightRadius:10}} />
     


     <View style={{ marginBottom:5,padding:5 }}> 
  <View style={{flexDirection:'row' ,justifyContent:  'space-between'}}>
    <Text style={{ fontSize:12, fontWeight: 'bold',}}>{item.nom} { item.online ? <Ionicons name="ellipse" size={12} color="orange" /> : null} </Text>
    <Text style={{ fontSize:12, fontWeight: 'bold',}}>  {getAge(item.birthdate)} </Text>
    </View>
   <Text>{item.job}</Text>
   </View>
    </TouchableOpacity>


  </Card>

   
)
  return (
    <View style={{flex:1 }}>
       
       <FlatList 
             ListFooterComponent={renderLoader}
             onEndReached={loadMoreItem}
             onEndReachedThreshold={0}
       data = {datings}
       numColumns={2}
       key={Math.random().toString()}
       renderItem={renderItem}
       bounces={false}
       refreshControl={
 
 <RefreshControl
   refreshing={false}
   onRefresh={() =>    {setDatings([]); setCurrentPage(1)}}
 />
}
showsVerticalScrollIndicator={false}
       keyExtractor={item => item.id}
       />
    </View>
  )
}

export default Tinder
import { View, Text, Image, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon, Card } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useLogin } from './context/loginprovider';

const Match = () => {

  const [datings, setDatings] = useState([])
  const [loading, setLoading] = useState(false);
  const { token } = useLogin();
  const [canLoad, setCanLoad] = useState(true)
  const [currentPage, setCurrentPage] = useState(1);
  const navigation = useNavigation()
  const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)
  const url = `https://meubious.com/api/matches/?page=${currentPage}`;
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
  const loadMoreItem = () => {
    if (canLoad && !loading) {
      setCurrentPage(currentPage + 1);
    }
  };
  useEffect(
    loaddata, [currentPage]
  )
  const renderLoader = () => {
    return (
      loading ?
        <View >
          <ActivityIndicator size="large" color="#aaa" />
        </View> : null
    );
  };

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
    </Card>


  )
  return (
    <View >
 <FlatList
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
        ListEmptyComponent={() =>
        (
          !loading ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '50%' }}>
              <Text style={{ padding: 10, margin: 10 }}>
                Vous n'avez aucun match d'amour.
              </Text>
              <Icon name='emoji-flirt' type='entypo' size={50} color='red'></Icon>
            </View> : null
        )}
        data={datings}
        numColumns={2}
        key={Math.random().toString()}
        renderItem={renderItem}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

export default Match
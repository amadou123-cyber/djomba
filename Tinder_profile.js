import { Ionicons  } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect,    useLayoutEffect } from 'react';
import { View,   StyleSheet,   Image,   FlatList, Dimensions, ScrollView, TouchableOpacity,   Alert, ActivityIndicator } from 'react-native';
import { Text,  Button, CheckBox, Icon, Dialog } from '@rneui/themed';
import ImageView from "react-native-image-viewing";
import { useLogin } from './context/loginprovider';
const { width, height } = Dimensions.get('screen');

export default ProfileDetailScreen = () => {
  const [loading, setloading] = useState(true);
  const [dating, setDating] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const [hasmatch, sethasmatch] = useState(false);
  const [request, setrequest] = useState(false)
  const [request1, setrequest1] = useState(false)
  const route = useRoute().params;
  const { userprofile,   token } = useLogin();
  const [index, setIndex] = useState(0)
  const navigation = useNavigation();
  const [datas, setDatas] = useState([])
  const url = `https://meubious.com/api/datings/${route.id}/`;
  const deleteimage = (id) => {
    const data = new FormData();
    data.append('id', id);
    fetch(`https://meubious.com/api/delete-image-dating/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Token ${token}`,
      },
      body: data,
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.is_valid) {
          setDatas(datas.filter(e => e.id !== id))
        }
      })
      .catch((error) => {
        //
      });

  }
  const loaddata = () => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
      // body : 

    }).then((response) => response.json())
      .then((json) => {
        setrequest(json.req); setrequest1(json.req1); setDating(json.data);
        if (json.data.Match.includes(userprofile.id)) {
          sethasmatch(!hasmatch)
        }
        let imagess = []
        const image_image = [json.data.image]

        image_image.forEach((item, i) => {
          imagess.push({ uri: 'https://meubious.com' + item, id: 0 })

        })
        json.data.images.forEach((item, i) => {
          imagess.push({ uri: item.url, id: item.id })

        })

        setDatas(imagess)
        setloading(false)
      })
      .catch((error) => { })

  };
  useEffect(
    loaddata, [route.id]
  )

  useLayoutEffect(
    () => {
      navigation.setOptions(
        {
          title: route.name + ', ' + route.age + " ans",
          headerTitleStyle: {
            fontSize: 16
          }

        }
      )
    }
  )





  if (!loading)
    return (<ScrollView showsVerticalScrollIndicator={false}>
      <FlatList data={datas} showsHorizontalScrollIndicator={false} horizontal renderItem={({ item, index }) => (
        <TouchableOpacity onLongPress={() => {
          if (index) {
            if (route.id === userprofile.id) {
              Alert.alert('Suppression', 'Voulez vous vraiment supprimer cette photo ?', [
                {
                  text: 'Oui', onPress: () => deleteimage(item.id)
                },
                {
                  text: 'Non'
                }
              ])
            }
          }
          else {
            if (route.id === userprofile.id) {
              Alert.alert('Suppression', "Vous ne pouvez pas supprimer cette photo, car c'est votre Avatar.Vous ne pouvez supprimer que les autres photos.")
            }
          }
        }
        } onPress={() => { setIndex(index); setIsVisible(true) }}>
          <Image
            style={{
              height: height * 0.45,
              width: width * 0.88,
              margin: 6,
              borderRadius: 8,
            }}
            source={{ uri: item.uri }}
          /></TouchableOpacity>
      )

      } keyExtractor={(item, index) => item + index} />


      <View style={{ padding: 10, margin: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

          {userprofile.id !== route.id ?
            (hasmatch ?
              <Button onPress={() => {
                let url = `https://meubious.com/api/create-dialog-dating/${dating.profile}/`
                fetch(url, {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                  },
                  // body : 

                }).then((response) => response.json())
                  .then((json) => {
                    navigation.navigate('Chat', json)


                  })
                  .catch((error) => { })
              }}><Icon name='chatbox-ellipses' type='ionicon' color='white'></Icon> Message</Button> :
              (request ?
                <>
                  <Button title='Refuser' containerStyle={{ paddingRight: 15 }} color='grey' onPress={() => {
                    let url = `https://meubious.com/api/refuse-match/${dating.profile}/`
                    fetch(url, {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                      },
                      // body : 

                    }).then((response) => response.json())
                      .then((json) => {

                        if (json.refused) {
                          setrequest(false)
                        }

                      })
                      .catch((error) => { })
                  }}> Refuser <Icon type='material-community' name='heart-minus' color='white'> </Icon></Button><Button title='Accepter' color='success' onPress={() => {
                    let url = `https://meubious.com/api/make-match/${dating.profile}/`
                    fetch(url, {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                      },
                      // body : 

                    }).then((response) => response.json())
                      .then((json) => {

                        if (json.match) {
                          sethasmatch(true)
                        }

                      })
                      .catch((error) => { })
                  }}> Accepter <Icon type='material-community' name='heart-plus' color='white'></Icon></Button>
                </> :
                <CheckBox
                  containerStyle={{

                    borderRadius: 15
                  }}
                  checked={request1}
                  checkedIcon="heart"
                  uncheckedIcon="heart-o"
                  checkedColor="red"
                  right={true}
                  title='Aimez cette personne'
                  iconRight={false}
                  checkedTitle={'Ne plus aimer cette personne'}
                  size={25}
                  onPress={() => {
                    setrequest1(!request1);
                    let url = ''
                    if (request1) {
                      url = `https://meubious.com/api/cancel-match/${dating.profile}/`
                    }
                    else {
                      url = `https://meubious.com/api/send-match/${dating.profile}/`
                    }
                    fetch(url, {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                      },
                      // body : 

                    }).then((response) => response.json())
                      .then((json) => { })
                      .catch((error) => { })


                  }} />)) : null}

        </View>
        <View style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View >

            <Text style={{ fontWeight: 'bold' }}>Status :</Text>
            <Text style={{ fontWeight: 'bold' }}>Pays :</Text>
            <Text style={{ fontWeight: 'bold' }}>Lieu :</Text>
            <Text style={{ fontWeight: 'bold' }}>Niveau d'études:</Text>
            <Text style={{ fontWeight: 'bold' }}>Profession:</Text>
            <Text style={{ fontWeight: 'bold' }}>Religion:</Text>
            <Text style={{ fontWeight: 'bold' }}>Etat civil: </Text>
            <Text style={{ fontWeight: 'bold' }}>Teint: </Text>
            <Text style={{ fontWeight: 'bold' }}>Taille:</Text>
            <Text style={{ fontWeight: 'bold' }}>Ethnie:</Text>
            <Text style={{ fontWeight: 'bold' }}>Date d'inscription:</Text>
          </View>
          <View>
            <Text > {userprofile.id !== route.id ? (dating.online ? <Ionicons name="ellipse" size={12} color="green"  > En ligne</Ionicons> : <Ionicons name="ellipse" size={12} color="gray"  > Hors ligne</Ionicons>) : <Ionicons name="ellipse" size={12} color="green"  > En ligne</Ionicons>}</Text>
            <Text > {dating.country.name}  </Text>
            <Text > {dating.lieu ? dating.lieu : 'Conakry'}  </Text>
            <Text > {dating.level}  </Text>
            <Text > {dating.job}  </Text>
            <Text > {dating.religion}  </Text>
            <Text > {dating.situation_matrimoniale}  </Text>
            <Text > {dating.teint}  </Text>
            <Text > {dating.taille}  </Text>
            <Text > {dating.ethnie}  </Text>
            <Text > {dating.created}  </Text>
          </View>
        </View>

        <Text style={{ fontWeight: 'bold' }}>A propos de moi  </Text>
        <Text style={{
          fontSize: 15,
          fontStyle: 'italic',
          padding: 5

        }}>{dating.description} </Text>
        <Text style={{ fontWeight: 'bold' }}>Partenaire souhaité(e)  </Text>
        <Text style={{
          fontSize: 15,
          fontStyle: 'italic',
          padding: 5

        }}>
          {dating.partenaire}

        </Text>


      </View>
      <ImageView
        images={datas}
        imageIndex={index}
        FooterComponent={({ imageIndex }) => <Text style={{ color: 'white', alignSelf: 'center', marginBottom: 10 }}>  {imageIndex + 1} - {datas.length} </Text>}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </ScrollView>

    );
  else {
    return (<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="green" />
    </View>
    );
  }
};

const styles = StyleSheet.create({
  saveAreaViewContainer: { backgroundColor: '#FFF' },
});
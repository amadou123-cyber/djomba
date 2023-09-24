import { View, Text,Alert } from 'react-native'
import React ,{useState} from 'react'
import { ListItem,Button ,Icon,Avatar} from '@rneui/themed';
import { useNavigation ,useRoute} from '@react-navigation/native';
import { useLogin } from './context/loginprovider';
import { Ionicons } from '@expo/vector-icons';

const Setting = () => {
  
    const route = useRoute();
    const {userprofile,setToken,token,setUserProfile,setIsLoggedIn} = useLogin();
    const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)
    const age = getAge(userprofile.birthdate)
    const [loading,setLoading]  = useState(false)
    const navigation = useNavigation(); 
  
  return (
    <View >
     <ListItem containerStyle={{ padding:10,margin:10}} bottomDivider onPress={() => navigation.navigate('ProfileDetail',{id:userprofile.id,name:userprofile.name,age:age})}>
<Avatar
              rounded
              size={60}
              source={{ uri: userprofile.image  }}
            />
  <ListItem.Content>
    <ListItem.Title>{userprofile.name} <Ionicons name="ellipse" size={12} color="green" /></ListItem.Title>
    <ListItem.Subtitle>{age} ans</ListItem.Subtitle>
  </ListItem.Content>
  <ListItem.Chevron />
</ListItem >
<>
<View style= {{ padding:10 }} > 
  <ListItem bottomDivider onPress={() => navigation.navigate('Edit',{'id':userprofile.id})} >
    <Icon name="pencil" type="material-community" color="green" />
    <ListItem.Content>
      <ListItem.Title>Éditer votre page</ListItem.Title>
    </ListItem.Content>

   
  </ListItem>
  <ListItem bottomDivider onPress={() => navigation.navigate('Avatar')}>
     
    <Icon name="camera-front" type="material-icon" color="blue" />
    <ListItem.Content>
      <ListItem.Title>Changer votre avatar</ListItem.Title>
    </ListItem.Content>
    
   
  </ListItem>
  <ListItem bottomDivider onPress={() => navigation.navigate('Photos')}>
  <Icon name="camera" type="material-community" color="purple" />
    <ListItem.Content>
      <ListItem.Title>Ajouter des photos</ListItem.Title>
    </ListItem.Content>
    
   
  </ListItem>
  <ListItem bottomDivider onPress={() => navigation.navigate('FAQ')}>
    <Icon name="question" type="font-awesome" color="green" />
    <ListItem.Content>
      <ListItem.Title>FAQ</ListItem.Title>
    </ListItem.Content>
 
  </ListItem>
  <ListItem bottomDivider onPress={() => {
            Alert.alert('Suppression du compte', 'Voulez vous vraiment supprimer votre compte ?', [
              {
                text: 'Oui', onPress: () => {
                  setLoading(true)
                  fetch('https://meubious.com/api/delete-dating/', {
                    method: 'POST',
                    headers: {
                      'Authorization': `Token ${token}`,
                      'Content-Type': 'multipart/form-data',
                    },
                    body: {}

                  })
                    .then((response) => response.json())
                    .then((response) => {
                      console.log(response)
                      if (response.close) {

                        setIsLoggedIn(false);
                        setUserProfile({});
                        setToken('');

                         
                      } else {
                        setLoading(false)
                      }
                    })
                }
              },
              { text: 'Non' }
            ])
          }}>
    <Icon name="trash-can-outline" type="material-community" color="red" />
    <ListItem.Content>
      <ListItem.Title>Supprimer votre compte</ListItem.Title>
    </ListItem.Content>
 
  </ListItem>
  <ListItem bottomDivider onPress={() => {
            Alert.alert('Déconnexion ', 'Voulez vous vraiment vous déconnecter de votre compte ?', [
              {
                text: 'Oui', onPress: () => setIsLoggedIn(false)  
              },
              { text: 'Non' }])
          }}>
    <Icon name="sign-out" type="font-awesome" color="grey" />
    <ListItem.Content>
      <ListItem.Title>Déconnexion</ListItem.Title>
    </ListItem.Content>
   
  </ListItem>
  </View>
</>
    </View>
  )
}

export default Setting
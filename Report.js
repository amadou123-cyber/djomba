import { View, Text,Alert } from 'react-native'
import React ,{useState} from 'react'
import { ListItem,Button ,Icon,Input,Avatar} from '@rneui/themed';
import { useNavigation ,useRoute} from '@react-navigation/native';
import { useLogin } from './context/loginprovider';

const Report = () => {
    const route = useRoute().params;
 
 
    const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)
    const age = getAge(route.age)
    const {token} = useLogin()
    const [loading,setLoading]  = useState(false);
    const [message,setMessage] = useState('')
    const navigation = useNavigation(); 
  
  return (
    <View >
     <ListItem containerStyle={{ padding:10,margin:10}} bottomDivider onPress={() => navigation.navigate('ProfileDetail',{id:route.id,name:route.name,age:age})}>
<Avatar
              rounded
              size={60}
              source={{ uri:  "https://meubious.com"+route.image  }}
            />
  <ListItem.Content>
    <ListItem.Title>{route.name}</ListItem.Title>
    <ListItem.Subtitle>{age} ans</ListItem.Subtitle>
  </ListItem.Content>
  <ListItem.Chevron />
</ListItem >
<Input label='Pourquoi voulez vous signaler cette personne ?' labelStyle={{
    alignSelf:'center'
}} multiline onChangeText={(text) => setMessage(text)} value={message}>
</Input>
 
<Button radius={"sm"} type="solid" buttonStyle={{
        backgroundColor: 'green',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 30,
      }} 
      loading={loading}
      disabled={!message}
        
        containerStyle={{
     
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        
        titleStyle={{ fontWeight: 'bold', padding: 10 }}  onPress={() =>
        Alert.alert('Confirmation', "Si après vérification, il s’avère que vous avez menti sur cette personne, votre compte pourra être temporairement ou definitivement suspendu. Continuer?",[{
            text:'Envoyer',onPress:() =>{ 
                const data = new FormData();
                data.append('message',message)
                      setLoading(true)
                   
                 setMessage('')
     
                    fetch(`https://meubious.com/api/reporting/${route.id}/`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'multipart/form-data',
                          'Authorization': `Token ${token}`,
                         
                          
                        },
                        body: data,
                      })
                        .then((response) => response.json())
                        .then((response) => { 
                             
                        if (response.sent) { 
    
                       Alert.alert('Remerciement','Merci beaucoup pour votre signalement,nous prendrons toutes les mesures nécessaires pour cette personne.')
                        setLoading(false)
                        navigation.goBack();
                        
                      }
                        
                    })
                        .catch((error) => {
                          console.log('error', error);
                        });
                    
                }
        },
        {
            text:'Annuler',onPress:() => navigation.goBack()
        }])} >
       
        <Icon name="report" color='white' />
        Signaler
      </Button>
</View>
  )
}

export default Report
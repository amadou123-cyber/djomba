import { StyleSheet, Text, ScrollView,Image,Alert, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Avatar, Input, Icon ,Button} from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import { useLogin } from './context/loginprovider';


const SignUpImage = () => {
    const route = useRoute()
    console.log(route.params)
    const [partenaire, setPartenaire] = useState('')
    const [about_me, setAboutMe] = useState('') 
    const { isLoggedIn, setIsLoggedIn, token, setToken, userprofile, setUserProfile } = useLogin();
 


    const [image, setImage] = useState(null)
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality:1
    
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };
    return (

        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', flexDirection: 'colum', alignItems: 'center' }}>

<Avatar
          size={64}
          rounded
          onPress={() => {Alert.alert('photo','Choisissez une photo où votre visage est visible, sinon après verification votre compte peut être suspendu définitivement.',[
            {text:'Compris',onPress:()=> pickImage() },
            {text:'Non' }
          ]) }}
          icon={{ name: 'camera', type: 'font-awesome' }}
          containerStyle={{ backgroundColor: '#6733b9' ,paddding:20,margin:20}}
        />
       {image  ? <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />:<Text>Choisir une photo </Text>}

            <Input
                placeholder='A propos de vous ...' multiline

                leftIcon={{ type: 'material-community', name: 'account-heart' }}
                onChangeText={(text) => setAboutMe(text)}
            />
            <Input
                placeholder='Partenaire souhaite ... ' multiline
                leftIcon={{ type: 'material-community', name: 'hand-heart' }}
                onChangeText={(text) => setPartenaire(text)}

            />
        <Button radius={"sm"} type="solid" buttonStyle={{
        backgroundColor: 'green',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 30,
      }}
    
        disabled={!(partenaire  && about_me && image  )}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        titleStyle={{ fontWeight: 'bold', padding: 10 }}  onPress={() =>{ 
            const data = new FormData();
                 
                let extension = image.split(".").slice(-1)[0] 
                data.append('partenaire',partenaire);
                data.append('about_me',about_me);
                data.append("photo", {
                    uri: image,
                    type: "image/"+extension,
                    name:  'avatar_.'+extension,
                  } );
                
                Object.keys(route.params).forEach(key => {
                 
                  if (key === 'page1' ) {
                    page = route.params[key]
                    Object.keys(page).forEach(item => {
                        data.append(item, page[item]);
                    })
                  }
                  else {
                    data.append(key, route.params[key]);
                  }
                });
                console.log(data)
                fetch(`https://meubious.com/api/signup-dating/`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'multipart/form-data',
                     
                      
                    },
                    body: data,
                  })
                    .then((response) => response.json())
                    .then((response) => {
                      
                if (response.token === undefined) {
                    Alert.alert("Connexion impossible", "Error")
  
                  }
                  else {
  
                    
                     if (response.is_valid) { 
  
                    setToken(response.token);
  
                    setUserProfile(response.user);
                    setIsLoggedIn(true);
                  } 
                  else {
                      alert('You do not have an account.')
                  }
  
              
  
                  }
                       
                    })
                    .catch((error) => {
                      console.log('error', error);
                    });
                
            }}>
        Terminer
        <Icon name="sign-in" type='font-awesome' color='white' />
      </Button>

        </ScrollView>
    )
}

export default SignUpImage

const styles = StyleSheet.create({})
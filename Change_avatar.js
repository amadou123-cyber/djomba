import { StyleSheet, Text, ScrollView,Image,Alert, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation  } from '@react-navigation/native';
import { Avatar,  Icon ,Button} from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import { useLogin } from './context/loginprovider';


const Change_avatar = () => {
   
    const navigation = useNavigation()
  
    const {  token,   userprofile, setUserProfile } = useLogin();



    const [image, setImage] = useState(null)
    const [loading ,setLoading] = useState(false)
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing:true,
          quality:1
    
        });
    
       
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };
    return (

        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', flexDirection: 'colum', alignItems: 'center' }}>

<Avatar
          size={64}
          rounded
          onPress={() => {Alert.alert('Photo', "Sélectionnez une photo sur laquelle votre visage est visible, sinon après vérification , votre compte risque d'être bloqué définitivement.",[
            {text:'Compris',onPress:()=> pickImage() },
            {text:'Non' }
          ]) }}
          icon={{ name: 'camera', type: 'font-awesome' }}
          containerStyle={{ backgroundColor: '#6733b9' ,paddding:20,margin:20}}
        />
       {image  ? <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />:<Text>Choisir une photo </Text>}

   
       { image ? <Button radius={"sm"} type="solid" buttonStyle={{
        backgroundColor: 'green',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 30,
      }}
        loading  = {loading}
        disabled={!(image)}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        titleStyle={{ fontWeight: 'bold', padding: 10 }}  onPress={() =>{ 
            const data = new FormData();
                  setLoading(true)
                let extension = image.split(".").slice(-1)[0] 
             
                data.append("photo", {
                    uri: image,
                    type: "image/"+extension,
                    name:  'avatar_.'+extension,
                  } );
 
                fetch(`https://meubious.com/api/edit-avatar-dating/`, {
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

                    setUserProfile(response.user);
                    setLoading(false)
                    navigation.replace('ProfileDetail',{id:userprofile.id,name:userprofile.name,age:  Math.floor((new Date() - new Date(userprofile.birthdate).getTime()) / 3.15576e+10) }) 
                  }
                    
                })
                    .catch((error) => {
                      //console.log('error', error);
                    });
                
            }}>
        Changer
        <Icon name="refresh" type='font-awesome' color='white' />
      </Button>:null
}

        </ScrollView>
    )
}

export default Change_avatar

const styles = StyleSheet.create({})
 
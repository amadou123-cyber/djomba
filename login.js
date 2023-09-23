import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
 
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,

  TouchableOpacity,
} from "react-native";
import { useLogin } from "./context/loginprovider";
import { Dialog, Icon, Input ,Avatar,ListItem} from "@rneui/themed";

export default function Login() {
  const { isLoggedIn, setIsLoggedIn, token, setToken, userprofile, setUserProfile } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorEmail, setErrorEmail] = useState("")
  const navigation = useNavigation();
  const [visible,setVisible] = useState(true)

  if (token) {
    return (
      <View style={{marginTop:'50%'}} >
              <View style={{flexDirection:'row',justifyContent:'center'}}> 
       <Text style={{paddingBottom:30,fontSize:30 ,color:'red'}}>D J </Text>
       <Text style={{paddingBottom:30,fontSize:30 ,color:'yellow'}}>O M </Text>
       <Text style={{paddingBottom:30,fontSize:30 ,color:'green'}}>B A  </Text>
       </View>
       <Text style={{flexDirection:'row',justifyContent:'center',alignSelf:'center'}}>Appuyez sur l'avatar ou le nom pour se reconnecter 😎.</Text>
      <ListItem containerStyle={{ padding:10,margin:10,backgroundColor:'transparent'}} bottomDivider topDivider onPress={() =>  setIsLoggedIn(true)}>
<Avatar
              rounded
              size={60}
              source={{ uri: userprofile.image  }}
            />
  <ListItem.Content>
    <ListItem.Title>{userprofile.name}</ListItem.Title>
     
  </ListItem.Content>
  <ListItem.Chevron />
</ListItem >
<TouchableOpacity onPress={() => {
       setUserProfile({});setToken('')
      }}>
        <Text style={{ marginTop:'10%',alignSelf:'center',    
     
    padding:10,
    alignItems: "center",
    flexDirection:'row',
    justifyContent: "center",
     borderRadius:50,
    backgroundColor: "#0088ff",}}>Se connecter sur un autre compte </Text>
      </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
 
      <StatusBar style="auto" />
      <Dialog isVisible={loading} >
        <Dialog.Loading />
      </Dialog>

      <View style={{flexDirection:'row'}}> 
       <Text style={{paddingBottom:30,fontSize:30 ,color:'red'}}>D J </Text>
       <Text style={{paddingBottom:30,fontSize:30 ,color:'yellow'}}>O M </Text>
       <Text style={{paddingBottom:30,fontSize:30 ,color:'green'}}>B A  </Text>
       </View>
      <Input

        placeholder="Email "
        style={{ margin: 3 }}
        onChangeText={(email) => setEmail(email)}
        leftIcon={{ type: 'entypo', name: 'email' }}
        errorStyle={{ color: 'red' }}
        errorMessage={errorEmail}
      />


      <Input
        placeholder="Mot de passe "
        style={{ margin: 3 }}
        onChangeText={(password) => setPassword(password)}
        leftIcon={{ type: 'feather', name: 'key' }}
        secureTextEntry={visible}
        rightIcon = { visible ? <Icon name="eye" type='feather' size={20} onPress={()=>setVisible(false)} />:<Icon name="eye-off" type='feather' size={20} onPress={()=>setVisible(true)} />} 

      />



      <TouchableOpacity onPress={() => {
        navigation.navigate('reset_password')
      }}>
        <Text style={styles.forgot_button}>Mot de passe oublié ?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={() => {
        if (password.length != 0) {
          let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
          if (reg.test(email) === false) {
            setErrorEmail("Entrez un gmail valide.")
          }
          else {
            setLoading(true);
            setErrorEmail(" ")
            const data = new FormData();
            data.append('username', email);
            data.append('password', password);
            fetch('https://meubious.com/api/api-token-auth-dating/', {
              method: 'POST',
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              // body : 
              body: data
            })
              .then((response) => response.json())
              .then((response) => {
                console.log(response)
                setLoading(false);

                if (response.token === undefined) {
                  Alert.alert("Connexion impossible", "Impossible de se connecter avec les informations d'identification fournies.")

                }
                else {

                  
                   if (response.is_valid) { 
                   
                  setToken(response.token);

                  setUserProfile(response.user);
                  setIsLoggedIn(true);
                } 
                else {
                  navigation.navigate('Information',{email:email })
                }

            

                }


              }).catch((error) => { setLoading(false);console.log(error) })


          }
        } else {
          Alert.alert("Incomplet", "Remplissez l'email et le mot de passe.");
        }

      }}>
                <Icon name='sign-in' type='font-awesome'> </Icon>
        <Text style={styles.loginText} >  Connexion</Text>
      </TouchableOpacity>
 
      <TouchableOpacity style={styles.registerBtn}  onPress={() => (navigation.navigate('Inscription'))}>
        <Icon name='pencil' type='font-awesome'> </Icon>
        <Text style={styles.loginText} >  Inscription</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex:1,
     alignItems: "center",
   justifyContent:'center',
 
    margin: 10,
    padding: 3


  },
  image: {
    marginBottom: 40,
    width: 100,
    height: 100,
    borderRadius: 50
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    flexDirection:'row',
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#0088ff",
  },
  registerBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    flexDirection:'row',
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#78d4a8",
  },
});

import { useNavigation, useRoute } from '@react-navigation/native';
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Image, Dimensions, TouchableOpacity, TextInput, Modal, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { Text, Input, Icon, Button } from '@rneui/themed';
import { useLogin } from './context/loginprovider';
import SelectDropdown from 'react-native-select-dropdown';


export default SignUpLastScreen = () => {
  const [errormessage_password, setErrorMessagePassword] = useState('');
  const [errormessage_name, setErrorMessageName] = useState('');
  const [name, setName] = useState('');
  const [job, setJob] = useState(' ');
  const [password, setPassword] = useState('');
  const [pays, setPays] = useState('')
  const [lieu, setLieu] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const route = useRoute()
  const [country, setCountry] = useState([])
  const email = route.params.email;

  const navigation = useNavigation();
  const url_ville = 'https://meubious.com/api/countries/';
  const loadcountries = () => {
    fetch(url_ville).then((response) => response.json())
      .then((json) => { setCountry(json); console.log(json) })
      .catch((error) => console.log(error))

  };
  useEffect(
    loadcountries, []
  )
  return (
    <ScrollView contentContainerStyle={{ marginTop: 20 }}>
      <Input
        rightIcon={{ type: 'feather', name: 'check', color: 'green' }}

        leftIcon={{ type: 'entypo', name: 'email' }}
        disabled
        errorStyle={{ color: 'red' }}
        value={email}

        onChangeText={(text) => setName(text)
        }

      />




      <Input


        leftIcon={{ type: 'feather', name: 'user' }}

        placeholder='Prénom et nom ...'
        errorStyle={{ color: 'red' }}
        errorMessage={errormessage_name}
        onChangeText={(text) => {
          setName(text)
          if (text.length < 10) {
            setErrorMessageName('Votre nom est trop court.')
          }
          else {
            setErrorMessageName('')
          }
        }
        }

      />
      <Input


        leftIcon={{ type: 'font-awesome', name: 'birthday-cake' }}

        placeholder='Date de naissance  jj/mm/aaaa'
        value={birthdate}
        onChangeText={(text) => { setBirthdate(text) }}
        onEndEditing={() => {
          let regex = /^[0-9]{4}[\-][0-9]{2}[\-][0-9]{2}$/g;
          if (regex.test(birthdate) === false) {
            setBirthdate('');
            alert('format de la date est invalide.');

          }
          else {
            const date = new Date(birthdate)

            if (date === undefined) {
              setBirthdate('');
              alert('format de la date est invalide.');

            }

          }

        }} />
      <SelectDropdown
        data={country}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
          setPays(selectedItem.name);


        }}


        search
        searchInputStyle={{
          backgroundColor: 'white',
          borderBottomWidth: 1,
          borderBottomColor: '#FFF',
        }}
        searchPlaceHolder={'Pays ...'}
        searchPlaceHolderColor={'white'}
        renderSearchInputLeftIcon={() => {
          return <Icon type='font-awesome' name={'search'} color={'#444'} size={18} />;
        }}
        defaultButtonText={'Pays de residence'}
        buttonTextAfterSelection={(selectedItem, index) => {


          return selectedItem.name;
        }}
        rowTextForSelection={(item, index) => {
          return item.name;
        }}
        renderCustomizedButtonChild={(selectedItem, index) => {
          return (
            <View style={{
              flex: 1,
              flexDirection: 'row',

              alignItems: 'center',
            }}>

              <Icon type='font-awesome' name="globe" color={'#444'} size={18} />


              <Text style={{
                textAlign: 'center',
                fontSize: 20,

                marginHorizontal: 5,
              }} >{selectedItem ? selectedItem.name : 'Pays de residence'}</Text>

            </View>
          );
        }}

        buttonStyle={styles.dropdown1BtnStyle}
        buttonTextStyle={styles.dropdown1BtnTxtStyle}
        renderDropdownIcon={isOpened => {
          return <Icon type='font-awesome' name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={15} />;
        }}
        dropdownIconPosition={'right'}
        dropdownStyle={styles.dropdown1DropdownStyle}
        rowStyle={styles.dropdown1RowStyle}
        rowTextStyle={styles.dropdown1RowTxtStyle}

      />
      <Input


        leftIcon={{ type: 'feather', name: 'home' }}

        placeholder='Lieu de résidence'

        onChangeText={(text) => { setLieu(text) }} />
      <Input


        leftIcon={{ type: 'material-icon', name: 'work' }}

        placeholder='Profession'

        onChangeText={(text) => { setJob(text) }} />

      <Input


        leftIcon={{ type: 'feather', name: 'key' }}
        placeholder='Mot de passe'
        value={password}
        errorStyle={{ color: 'red' }}
        errorMessage={errormessage_password}
        onChangeText={(text) => {
          setPassword(text.split(" ").join(''))
          if (text.length < 5) {
            setErrorMessagePassword('le mot de passe doit avoir au moins 5 lettres.')
          }
          else {
            setErrorMessagePassword('')
          }
        }}

      />
      <Button radius={"sm"} type="solid" buttonStyle={{
        backgroundColor: 'green',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 30,
      }}

        disabled={!(name.length > 10 && password.length > 5 && lieu.length > 4 && pays.length > 0 && birthdate.length > 1 && job.length > 2)}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        titleStyle={{ fontWeight: 'bold', padding: 10 }} onPress={() => navigation.navigate("Information2", { name: name, passowrd: password, job: job, lieu: lieu, pays: pays, email: email, birthdate: birthdate })}>
        Continuer
        <Icon name="arrow-forward" type='ionicon' color='white' />
      </Button>

    </ScrollView>
  )
}
const styles = StyleSheet.create({




  dropdown1BtnStyle: {

    width: '97%',


    padding: 3,


    borderRadius: 8,
    borderBottomWidth: 1,
    marginBottom: 10,



  },
  dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF', top: 0, margin: 0, padding: 0 },
  dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
  dropdown1RowTxtStyle: { color: '#444', textAlign: 'center' },

})
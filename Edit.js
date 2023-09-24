import { useNavigation, useRoute } from '@react-navigation/native';
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Keyboard } from 'react-native';
import { Text, Input, Icon, Button } from '@rneui/themed';
import { useLogin } from './context/loginprovider';

import SelectDropdown from 'react-native-select-dropdown';


export default Edit = () => {
  const { userprofile, token } = useLogin();
  const [pays, setPays] = useState('');
  const route = useRoute();
  const [country, setCountry] = useState([])
  const [religion, setReligion] = useState('');
  const [lieu, setLieu] = useState('')
  const [job, setjob] = useState('')
  const [partenaire, setPartenaire] = useState('')
  const [about_me, setAboutMe] = useState('')
  const [matrimonial, setMatrimonial] = useState('');
  const [teint, setTeint] = useState('')

  const [level, setLevel] = useState('')
  const [loading, setLoading] = useState(false)
  const [height, setHeight] = useState('')
  const [ethnie, setEthnie] = useState('')

  const navigation = useNavigation();
  const [datas, setDatas] = useState([])

  const loaddata = () => {
    const url = `https://meubious.com/api/datings/${route.params.id}/`;
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

        const data = json.data;
        setDatas(data);
        setPays(data.country.id);
        setLieu(data.lieu);
        setjob(data.job);
        setReligion(data.religion);
        setMatrimonial(data.situation_matrimoniale);
        setTeint(data.teint);
        setLevel(data.level);
        setPartenaire(data.partenaire);
        setAboutMe(data.description);
        setHeight(data.taille);

        setEthnie(data.ethnie);
      })
      .catch((error) => { })

  };
  useEffect(
    loaddata, [route.id]
  )
  const url_ville = 'https://meubious.com/api/countries/';
  const loadcountries = () => {
    fetch(url_ville).then((response) => response.json())
      .then((json) => { setCountry(json) })
      .catch((error) => { })

  };
  useEffect(
    loadcountries, []

  )

  return (
    <ScrollView containerStyle={{ marginTop: 20 }}>
      <Input
        rightIcon={{ type: 'feather', name: 'check', color: 'green' }} leftIcon={{ type: 'entypo', name: 'email', size: 17 }}
        disabled
        errorStyle={{ color: 'red' }}
        value={userprofile.email} />
      <Input
        rightIcon={{ type: 'feather', name: 'check', color: 'green' }} leftIcon={{ type: 'entypo', name: 'user', size: 17 }}
        disabled
        errorStyle={{ color: 'red' }}
        value={userprofile.name} />
      <Input
        rightIcon={{ type: 'feather', name: 'check', color: 'green' }} leftIcon={{ type: 'font-awesome', name: 'intersex', size: 17 }}
        disabled
        errorStyle={{ color: 'red' }}
        value={datas.sex} />
      <Input
        rightIcon={{ type: 'feather', name: 'check', color: 'green' }} leftIcon={{ type: 'font-awesome', name: 'birthday-cake', size: 17 }}
        disabled
        errorStyle={{ color: 'red' }}
        value={userprofile.birthdate} />
      <SelectDropdown
        data={country}
        onSelect={(selectedItem, index) => { setPays(selectedItem.id); }}
        defaultValueByIndex={pays - 1}
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
            <View style={{ flex: 1, flexDirection: 'row',
  alignItems: 'center' }}>

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
      <Input leftIcon={{ type: 'font-awesome', name: 'home', size: 17 }} 
        placeholder="Lieu"
        value={lieu}
        onChangeText={(text) => setLieu(text)} onEndEditing={() => Keyboard.dismiss()}/>
      <Input leftIcon={{ type: 'material-icon', name: 'work', size: 17 }} errorStyle={{ color: 'red' }}
        placeholder='Job'
        value={job}
        onChangeText={(text) => setjob(text)} onEndEditing={() => Keyboard.dismiss()}/>
      <Input
        placeholder='A propos de vous ...' multiline
        value={about_me}
        leftIcon={{ type: 'material-community', name: 'account-heart' }}
        onChangeText={(text) => setAboutMe(text)}
        onEndEditing={() => Keyboard.dismiss()}
      />
      <Input
        value={partenaire}
        placeholder='Partenaire souhaite ... ' multiline
        leftIcon={{ type: 'material-community', name: 'hand-heart' }}
        onChangeText={(text) => setPartenaire(text)}
        onEndEditing={() => Keyboard.dismiss()}

      />
      <SelectDropdown
        data={[
          'Islam', 'Christianisme', 'Autres'
        ]}
        onSelect={(selectedItem, index) => {

          setReligion(selectedItem);

        }}
        defaultValue={datas.religion}
        defaultButtonText={'Religion'}
        buttonTextAfterSelection={(selectedItem, index) => {  return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item
        }}
        renderDropdownIcon={isOpened => {
          return <Icon type='font-awesome' name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={15} />;
        }}
        renderCustomizedButtonChild={(selectedItem, index) => {
          return (
            <View style={{
              flex: 1,
              flexDirection: 'row',

              alignItems: 'center',
            }}>

              <Icon type='font-awesome-5' name="place-of-worship" color={'#444'} size={18} />


              <Text style={{
                textAlign: 'center',
                fontSize: 20,

                marginHorizontal: 5,
              }} >{selectedItem ? selectedItem : 'Religion'}</Text>

            </View>
          );
        }}

        buttonStyle={styles.dropdown1BtnStyle}
        buttonTextStyle={styles.dropdown1BtnTxtStyle} 
        dropdownIconPosition={'right'}
        dropdownStyle={styles.dropdown1DropdownStyle}
        rowStyle={styles.dropdown1RowStyle}
        rowTextStyle={styles.dropdown1RowTxtStyle}

      />
      <SelectDropdown
        data={[
          "Célibataire",
          "Divorcé(e)",
          "Veuf(ve)",
          "Marié",
        ]}
        onSelect={(selectedItem, index) => {

          setMatrimonial(selectedItem);

        }}
        defaultValue={datas.situation_matrimoniale}
        buttonTextAfterSelection={(selectedItem, index) => { return selectedItem }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
        renderCustomizedButtonChild={(selectedItem, index) => {
          return (
            <View style={{
              flex: 1,
              flexDirection: 'row',

              alignItems: 'center',
            }}>

              <Icon type='material-community' name="mother-heart" color={'#444'} size={18} />


              <Text style={{
                textAlign: 'center',
                fontSize: 20,

                marginHorizontal: 5,
              }} >{selectedItem ? selectedItem : 'Situation matrimoniale'}</Text>

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
      <SelectDropdown
        data={[
          "Noir"
          , "Blanc"
        ]}
        onSelect={(selectedItem, index) => {

          setTeint(selectedItem)

        }}

        defaultValue={datas.teint} 
        buttonTextAfterSelection={(selectedItem, index) => { return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
        renderCustomizedButtonChild={(selectedItem, index) => {
          return (
            <View style={{
              flex: 1,
              flexDirection: 'row',

              alignItems: 'center',
            }}>

              <Icon type='antdesign' name="skin" color={'#444'} size={18} />


              <Text style={{
                textAlign: 'center',
                fontSize: 20,

                marginHorizontal: 5,
              }} >{selectedItem ? selectedItem : 'Teint'}</Text>

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
      <SelectDropdown
        data={[
          ("Primaire", "Primaire"),
          ("Collège", "Collège"),
          ("Lycée", "Lycée"),
          ("Licence", "Licence"),
          ("Master", "Master"),
          ("Doctorat", "Doctorat"),
          ("Postdoctoral", "Postdoctoral")
        ]}
        onSelect={(selectedItem, index) => { setLevel(selectedItem); }} defaultValue={datas.level} buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
        renderCustomizedButtonChild={(selectedItem, index) => {
          return (
            <View style={{
              flex: 1,
              flexDirection: 'row',

              alignItems: 'center',
            }}>

              <Icon name="school" color={'#444'} size={18} />


              <Text style={{
                textAlign: 'center',
                fontSize: 20,

                marginHorizontal: 5,
              }} >{selectedItem ? selectedItem : "Niveau d'etudes"}</Text>

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

      <SelectDropdown
        data={[
          "Pétite",
          "Moyenne",
          "Grande"
        ]}
        onSelect={(selectedItem, index) => { setHeight(selectedItem) }}
        defaultValue={datas.taille}
        buttonTextAfterSelection={(selectedItem, index) => { return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
        renderCustomizedButtonChild={(selectedItem, index) => {
          return (
            <View style={{
              flex: 1,
              flexDirection: 'row',

              alignItems: 'center',
            }}>

              <Icon type='material-community' name="human-male-height" color={'#444'} size={18} />


              <Text style={{
                textAlign: 'center',
                fontSize: 20,

                marginHorizontal: 5,
              }} >{selectedItem ? selectedItem : 'Taille'}</Text>

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
      <SelectDropdown
        data={[
          "Badiaranké",
          "Baga",
          "Balantes",
          "Bambaras",
          "Bassari",
          "Coniaguis",
          "Diakhankés",
          "Dialonké",
          "Kissi",
          "Koniankés",
          "Kono",
          "Kouranko",
          "Kpelle",
          "Landoma",
          "Loma",
          "Malinkés",
          "Mano",
          "Mendé",
          "Mikhiforé",
          "Nalu",
          "Peuls",
          "Soussou",
          "Temnés",
          "Tenda",
          "Toura",
        ]}
        onSelect={(selectedItem, index) => { setEthnie(selectedItem) }}
        defaultValue={datas.ethnie}
        buttonTextAfterSelection={(selectedItem, index) => { return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
        renderCustomizedButtonChild={(selectedItem, index) => {
          return (
            <View style={{
              flex: 1,
              flexDirection: 'row',

              alignItems: 'center',
            }}>

              <Icon type='material-icon' name="groups" color={'#444'} size={18} />


              <Text style={{
                textAlign: 'center',
                fontSize: 20,

                marginHorizontal: 5,
              }} >{selectedItem ? selectedItem : 'Ethnie'}</Text>

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
      <Button radius={"sm"} type="solid" buttonStyle={{
        backgroundColor: 'green',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 30,
      }}
        loading={loading}
        containerStyle={{ marginHorizontal: 50,
          marginVertical: 10,
        }}
        disabled={!(lieu && job)}
        titleStyle={{ fontWeight: 'bold', padding: 10 }} onPress={() => {
          setLoading(true)
          const data = new FormData();
          data.append('country', pays);
          data.append('lieu', lieu);
          data.append('job', job);
          data.append('religion', religion);
          data.append('situation_matrimoniale', matrimonial);
          data.append('teint', teint)
          data.append('level', level)
          data.append('taille', height)
          data.append('ethnie', ethnie)
          data.append('description', about_me);
          data.append('partenaire', partenaire);
          fetch('https://meubious.com/api/edit-profile-dating/', {
            method: 'POST',
            headers: {
              'Authorization': `Token ${token}`,
              'Content-Type': 'multipart/form-data',
            },
            body: data

          })
            .then((response) => response.json())
            .then((response) => {

              if (response.is_valid) {

                setLoading(false);
                navigation.replace('ProfileDetail', { id: userprofile.id, name: userprofile.name, age: Math.floor((new Date() - new Date(userprofile.birthdate).getTime()) / 3.15576e+10) })
              } else {

              }
            })
        }
        } > <Icon name="edit" type='entypo' color='white' />
        Editer
      </Button>

    </ScrollView>
  )
}
const styles = StyleSheet.create({ 
  dropdown1BtnStyle: {
    width: '97%', padding: 3, 
    borderRadius: 8,
    borderBottomWidth: 1,
    marginBottom: 10 },
  dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF', top: 0, margin: 0, padding: 0 },
  dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
  dropdown1RowTxtStyle: { color: '#444', textAlign: 'center' },

})
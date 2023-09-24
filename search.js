import { useNavigation, useRoute } from '@react-navigation/native';
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Text, Input, Icon, Card, Switch, Button, ListItem } from '@rneui/themed';

import { Ionicons } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';


export default Search = () => {



  const [pays, setPays] = useState('')
  const [online, setOnline] = useState(false)
  const [age_from, setage_from] = useState('')
  const [age_to, setage_to] = useState('')
  const route = useRoute()
  const [country, setCountry] = useState([])
  const [religion, setReligion] = useState('');

  const [matrimonial, setMatrimonial] = useState('');
  const [teint, setTeint] = useState('')
  const [canLoad, setCanLoad] = useState(false);
 
  const [loading, setLoading] = useState(false)
  const [height, setHeight] = useState('')
  const [ethnie, setEthnie] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const navigation = useNavigation();
  const [search, setSearch] = useState(false);
  const [has_search, sethas_search] = useState(false)
  const [datas, setDatas] = useState([])
  const loadsearch = () => {
    const search_url = `https://meubious.com/api/search-dating/?country=${pays}&religion=${religion}&situation_matrimoniale=${matrimonial}&taille=${height}&teint=${teint}&ethnie=${ethnie}&min_age=${age_from}&max_age=${age_to}&online=${online ? 1 : 0}&page=${currentPage}`;

    setSearch(true); setLoading(true);

    fetch(search_url).then((response) => response.json())
      .then((json) => { setDatas([...datas, ...json.data]); if (!json.pagination) { setCanLoad(false) } else { setCanLoad(true); setCurrentPage(currentPage + 1) } sethas_search(true); setLoading(false); setSearch(false) })
      .catch((error) => { })

  };
  const url_ville = 'https://meubious.com/api/countries/';
  const loadcountries = () => {
    fetch(url_ville).then((response) => response.json())
      .then((json) => { setCountry(json) })
      .catch((error) => { })

  };
  useEffect(
    loadcountries, []

  )
  if (has_search) {
    const loadMoreItem = () => {
      if (canLoad && !loading) {

        loadsearch();
      }
    };

    const renderLoader = () => {
      return (
        loading ?
          <View >
            <ActivityIndicator size="large" color="#aaa" />
          </View> : null
      );
    };

    const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10);
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
          ListHeaderComponent={() =>
            <Button icon={
              <Icon
                name="refresh"
                type='ionicon'
                color="#ffffff"

              />
            } color='violet' buttonStyle={{
              padding: 5, margin: 5, borderRadius: 8
            }} onPress={() => { setDatas([]); setCurrentPage(1); sethas_search(false) }}> Modifier votre recherche </Button>}
          ListEmptyComponent={() =>
          (

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '50%' }}>
              <Text style={{ padding: 10, margin: 10 }}>
                Aucune personne trouvée.
              </Text>
              <Icon name='sad-cry' type='font-awesome-5' size={50} color='red'></Icon>
            </View>
          )}
          data={datas}
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
  return (
    <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', }}>

      <SelectDropdown
        data={country}
        onSelect={(selectedItem, index) => {

          setPays(selectedItem.id);


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

      <SelectDropdown
        data={[
          'Islam', 'Christianisme', 'Autres'
        ]}
        onSelect={(selectedItem, index) => {

          setReligion(selectedItem);

        }}

        defaultValue={religion}
        defaultButtonText={'Religion'}
        buttonTextAfterSelection={(selectedItem, index) => {


          return selectedItem;
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


        defaultValue={matrimonial}

        buttonTextAfterSelection={(selectedItem, index) => {


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

        defaultValue={teint}


        buttonTextAfterSelection={(selectedItem, index) => {


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
          "Pétite",
          "Moyenne",
          "Grande"
        ]}
        onSelect={(selectedItem, index) => {


          setHeight(selectedItem);
        }}
        defaultValue={height}




        buttonTextAfterSelection={(selectedItem, index) => {


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
        onSelect={(selectedItem, index) => {

          setEthnie(selectedItem);

        }}



        defaultValue={ethnie}
        buttonTextAfterSelection={(selectedItem, index) => {


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
      <View style={{ flexDirection: 'row' }}>
        <Input
          containerStyle={{
            width: '49%',
          }}
          maxLength={2}
          inputStyle={{
            width: '49%',
          }}
          label='Age'
          labelStyle={{ color: 'black', marginLeft: 10 }}
          placeholder='De'
          value={age_from}
          onChangeText={(text) => setage_from(text)}
          keyboardType='numeric'
          leftIcon={{ type: 'font-awesome', name: 'chevron-right' }}
          onEndEditing={() => {
            if (15 <= parseInt(age_from) && parseInt(age_from) < 80) {
              //
            }
            else {
              alert("L'age doit etre entre 15 et 80 ans");
              setage_from('')
            }
          }
          }
        />
        <Input
          maxLength={2}
          value={age_to}
          keyboardType='number-pad'
          onChangeText={(text) => setage_to(text)}
          onEndEditing={() => {
            if (15 <= parseInt(age_to) && parseInt(age_to) < 80) {
              //
            }
            else {
              alert("L'age doit etre entre 15 et 80 ans");
              setage_to('')
            }
          }
          }
          containerStyle={{
            width: '49%',
          }}
          inputStyle={{
            width: '49%',
          }}

          label=' '
          placeholder='A'
          leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
        />
      </View>
      <ListItem bottomDivider containerStyle={{
        padding: 2,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 10
      }}>
        <ListItem.Content>
          <ListItem.Title>Actuellement en ligne</ListItem.Title>
        </ListItem.Content>
        <Switch
          value={online}
          onValueChange={(value) => setOnline(value)}
        />
      </ListItem>
      <Button radius={"sm"} type="solid" buttonStyle={{
        backgroundColor: 'green',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 30,
      }}
        loading={search}

        containerStyle={{

          marginHorizontal: 50,
          marginVertical: 10,
        }}
        titleStyle={{ fontWeight: 'bold', padding: 10 }} onPress={loadsearch}>
        Rechercher
        <Icon name="search" type='ionicon' color='white' />
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
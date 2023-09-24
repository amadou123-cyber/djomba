
import { useNavigation, useRoute } from '@react-navigation/native';
/* eslint-disable no-undef */
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Icon, Button } from '@rneui/themed';

import SelectDropdown from 'react-native-select-dropdown';


export default SignUpLast2Screen = () => {

  const [religion, setReligion] = useState('');
  const [matrimonial, setMatrimonial] = useState('');
  const [teint, setTeint] = useState('')
  const route = useRoute()

  const [level, setLevel] = useState('')
  const [sex, setSex] = useState('')
  const [height, setHeight] = useState('')
  const [ethnie, setEthnie] = useState('')

  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={{ marginTop: 20 }}>
      <SelectDropdown
        data={[
          "Masculin",
          "Feminin"
        ]}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
          setSex(selectedItem);

        }} buttonTextAfterSelection={(selectedItem, index) => {


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

              <Icon type='font-awesome' name="intersex" color={'#444'} size={18} />


              <Text style={{
                textAlign: 'center',
                fontSize: 20,

                marginHorizontal: 5,
              }} >{selectedItem ? selectedItem : 'Sexe'}</Text>

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
          console.log(selectedItem, index);
          setReligion(selectedItem);

        }}


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
              }} >{selectedItem ? selectedItem : 'choisir votre religion'}</Text>

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
          console.log(selectedItem, index);
          setMatrimonial(selectedItem);

        }}




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
          console.log(selectedItem, index);
          setTeint(selectedItem)

        }} buttonTextAfterSelection={(selectedItem, index) => { return selectedItem;
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
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
          setLevel(selectedItem);

        }}




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
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);

          setHeight(selectedItem);
        }}




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
          console.log(selectedItem, index);
          setEthnie(selectedItem);

        }}




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

      <Button radius={"sm"} type="solid" buttonStyle={{
        backgroundColor: 'green',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 30,
      }}

        disabled={!(religion && matrimonial && teint && level && height && ethnie && sex)}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        titleStyle={{ fontWeight: 'bold', padding: 10 }} onPress={() => navigation.navigate('Information3', { 'page1': route.params, sex: sex, religion: religion, matrimonial: matrimonial, heigh: height, teint: teint, level: level, ethnie: ethnie })}>
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
import { StatusBar } from 'expo-status-bar';

import React, { useState } from 'react';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';

 import { useNavigation } from "@react-navigation/native";

import { navOptions } from './options';

import ProfileDetailScreen from './Tinder_profile'
 
import SignUpImage from './signup_last_image';

import Tinder from './Tinder';
import { useLogin } from './context/loginprovider';
import Login from './login';
import SignUpScreen from './signup_first'
import SignUpLastScreen from './signup_last'
import SignUpCodeScreen from './signup_code'
import SignUpLast1Screen from './signup_last_after'
import Setting from './setting';
import { AutoTopTabs } from './navigation_top';
import MyChat from './chat_screen';
import Dialog from './dialogs';
import Search from './search';
import Change_avatar from './Change_avatar';
import Add_images from './Add_images';
import Edit from './Edit';
import FAQ from './FAQ';
import PasswordResetScreen from './reset_password'
import ResetPasswordCodeScreen from './reset_password_code'
import ResetPasswordLastcreen from './reset_password_last'
import Report from './Report';
import Notification from './Notification';

const Stack = createNativeStackNavigator();

export default function MyStack() {

  const nave = useNavigation();


  const { isLoggedIn } = useLogin();

  return (

    <Stack.Navigator screenOptions={() => navOptions(nave)}>
      {isLoggedIn ?
        <>
          <Stack.Group>
            <Stack.Screen name="Profile" component={Tinder} />
            <Stack.Screen name="Chats" component={Dialog} />
            <Stack.Screen name='Notification' component={Notification} />
            <Stack.Screen name="ProfileDetail" component={ProfileDetailScreen} />
            <Stack.Screen name="FAQ" component={FAQ} />
            <Stack.Screen name="Likes" component={AutoTopTabs} options={({ navigation, route }) => ({
              title: ' Likes '
            })} />
            <Stack.Screen name="Setting" component={Setting} options={({ navigation, route }) => ({
              title: ' Page '
            })} />
            <Stack.Screen name="Chat" component={MyChat} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="Search" component={Search} options={({ navigation, route }) => ({
              title: ' Recherche '
            })} />
            <Stack.Screen name="Avatar" component={Change_avatar} options={({ navigation, route }) => ({
              title: ' Avatar '
            })} />
            <Stack.Screen name="Report" component={Report} options={({ navigation, route }) => ({
              title: ' Signaler '
            })} />
            <Stack.Screen name="Photos" component={Add_images} options={({ navigation, route }) => ({
              title: ' Photos '
            })} />
            <Stack.Screen name="Edit" component={Edit} options={({ navigation, route }) => ({
              title: ' Éditer'
            })} />
          </Stack.Group>
        </> :
        <>
          <Stack.Screen name="Connexion" component={Login} options={({ navigation, route }) => ({
            headerShown: false
          })} />
          <Stack.Screen name="reset_password_code" component={ResetPasswordCodeScreen} options={({ navigation, route }) => ({
            title: 'Vérification du gmail'
          })} />
          <Stack.Screen name="reset_password_last" component={ResetPasswordLastcreen} options={({ navigation, route }) => ({
            title: 'Mot de passe'
          })} />
          <Stack.Screen name="reset_password" component={PasswordResetScreen} options={({ navigation, route }) => ({ title: 'Récuperation de votre compte' })} />
          <Stack.Screen name="Inscription" component={SignUpScreen} />
          <Stack.Screen name="Code" component={SignUpCodeScreen} />
          <Stack.Screen name="Information" component={SignUpLastScreen} />
          <Stack.Screen name="Information2" component={SignUpLast1Screen} options={({ navigation, route }) => ({
              title: ' Information 2 '
            })}/>
          <Stack.Screen name="Information3" component={SignUpImage} options={({ navigation, route }) => ({
              title: ' Information 3 '
            })}/>
        </>
      }
    </Stack.Navigator>

  );
}
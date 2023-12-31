import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { AppState} from 'react-native';
 
import MyStack from './navigation_tinder';
import LoginProvider from './context/loginprovider';
 
import { useEffect } from 'react';
 
export default function App() {
 
   
  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      'change',
      nextAppState => {
        if (nextAppState==='active') {
          //
        } 
        else {
          //console.log('I am not online.')
        }
         
      },
    );
    return () => {
      appStateListener?.remove();
    };
  }, []);
  return (
    <LoginProvider> 
    < NavigationContainer>
      <MyStack />

    </NavigationContainer>
    </LoginProvider>
  );
}

 
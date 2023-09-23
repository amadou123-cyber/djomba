import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
 
 
import { Icon } from '@rneui/themed';
import LikeMe from './LikeMe';
import LikeThem from './LikeThem';
import Tinder from './Tinder';
import Match from './Match'
 

const Tab = createMaterialTopTabNavigator();



 

export const  AutoTopTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="LikeThem" component={LikeThem} options={{
 
      tabBarShowLabel:false,
      tabBarIcon: ({ color, size }) => (
        <Icon type='font-awesome-5' name="hand-holding-heart" color={color} size={20} /> 
      ),
    }}/>
      <Tab.Screen name="LikeMe" component={ LikeMe} options={{
 
 tabBarShowLabel:false,
 tabBarIcon: ({ color, size }) => (
   <Icon type='material-community' name="account-heart" color={color} size={20} /> 
 ),
}}/>

<Tab.Screen name="Match" component={Match} options={{
 
 tabBarShowLabel:false,
 tabBarIcon: ({ color, size }) => (
   <Icon  type='font-awesome' name="heart" color={color} size={20} /> 
 ),
}}/>
       
      
    </Tab.Navigator>
  );
}

 
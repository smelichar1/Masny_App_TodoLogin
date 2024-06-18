import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import TodoListPage from '../pages/TodoListPage';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (uname) => {
    setUsername(uname);
    setIsLoggedIn(true);
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'LoginPage') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'TodoListPage') {
              iconName = focused ? 'checkmark' : 'checkmark-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70 },
        }}
      >
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="LoginPage">
          {props => <LoginPage {...props} onLogin={handleLogin} />}
        </Tab.Screen>
        {isLoggedIn ? (
          <Tab.Screen name="TodoListPage">
            {props => <TodoListPage {...props} username={username} />}
          </Tab.Screen>
        ) : (
          <Tab.Screen name="TodoListPage" component={LoginPage} />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

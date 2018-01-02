import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import NewDeck from './components/NewDeck'
import ListDecks from './components/ListDecks'
import { fetchDecks } from './utils/api'

const Tabs = TabNavigator({
    ListDecks: {
      screen: ListDecks,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />,
      }
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'New Deck',
        tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />,
      }
    },
  },
  {
    navigationOptions: {
      header: null,
    },
    tabBarOptions: {
      activeTintColor: 'rgb(180, 180, 180)',
      style: {
        height: 55,
        backgroundColor: 'rgb(255, 255, 255)',
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    },
  }
)

export default class App extends React.Component {

  render() {
    return (
      <Tabs />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

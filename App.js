import React from 'react';
import { Text, View, StyleSheet, Platform, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import NewDeck from './components/NewDeck'
import ListDecks from './components/ListDecks'
import DeckView from './components/DeckView'
import NewCard from './components/NewCard'
import QuizView from './components/QuizView'
import { fetchDecks } from './utils/api'
import { setLocalNotification } from './utils/notification'
import { white, darkBlue, midGray } from './utils/colors'

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
      activeTintColor: darkBlue,
      inactiveTintColor: Platform.OS === 'ios' ? midGray : darkBlue,
      style: {
        height: 55,
        backgroundColor: white,
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

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {

    }
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      title: 'Deck View',
      headerStyle: {
          backgroundColor: white,
      },
      headerTintColor: darkBlue,
    }
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      headerStyle: {
          backgroundColor: white,
      },
      headerTintColor: darkBlue,
    }
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      headerStyle: {
          backgroundColor: white,
      },
      headerTintColor: darkBlue,
    }
  }
})

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer, applyMiddleware(logger))}>
        <View style={styles.container}>
          <UdaciStatusBar backgroundColor={white} barStyle={Platform.OS === 'ios'? 'dark-content' : 'light-content'} />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

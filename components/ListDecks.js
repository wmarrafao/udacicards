import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet  } from 'react-native'
import { fetchDecks } from '../utils/api'
import { white, lightGray, darkBlue } from '../utils/colors'

class ListDecks extends Component {

  state = {
    decks: null,
  }

  componentDidMount() {
    fetchDecks().then((decks) => {
      this.setState({ decks: JSON.parse(decks) })
    })

  }

  displayDeck = (deck) => {
    console.log(`${deck.title} pressed!`)
  }

  render() {
    const { decks } = this.state
    console.log(decks)

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Decks</Text>
        </View>
        <View style={styles.scrollContainer}>
          <ScrollView contentContainerStyle={styles.scrollview}>
            {
              decks !== null && Object.keys(decks).map((key) => (
                <TouchableOpacity key={key} style={styles.deck} onPress={(deck) => this.displayDeck(decks[key])}>
                  <Text style={styles.title}>{decks[key].title}</Text>
                  <Text style={styles.meta}>{decks[key].questions.length} cards</Text>
                </TouchableOpacity>
              ))
            }
          </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 32,
    color: darkBlue,
    fontWeight: 'bold'
  },
  scrollContainer: {
    flex: 5,
    margin: 15,
  },
  scrollview: {
    backgroundColor: white,
    alignItems: 'stretch',
  },
  deck: {
    height: 100,
    backgroundColor: white,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: darkBlue,
  },
  title: {
    fontSize: 32,
    color: darkBlue
  },
  meta: {
    fontSize: 15,
    color: lightGray
  }
});


export default ListDecks

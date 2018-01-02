import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet  } from 'react-native'
import { fetchDecks } from '../utils/api'

class ListDecks extends Component {

  state = {
    decks: null,
  }

  componentDidMount() {
    fetchDecks().then((decks) => {
      this.setState({ decks: JSON.parse(decks) })
    })

  }

  render() {
    const { decks } = this.state
    console.log(decks)

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {
          decks !== null && Object.keys(decks).map((key) => (
            <View key={key}>
              <Text>{decks[key].title}</Text>
              <Text>{decks[key].questions.length} cards</Text>
            </View>
          ))
        }
      </ScrollView>
    )
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


export default ListDecks

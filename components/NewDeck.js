import React, { Component } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { saveDeckTitle } from '../utils/api'

class NewDeck extends Component {

  state = {
    deckTitle: ""
  }

  componentDidMount() {

  }

  createDeck = () => {
    const { deckTitle } = this.state;
    saveDeckTitle(deckTitle)
    console.log(this.state.deckTitle)
    this.setState({ deckTitle: "" })
    console.log(this.state.deckTitle)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Please enter the title of your deck
        </Text>
        <TextInput
          placeholder="Deck Title"
          value={this.state.deckTitle}
          onChangeText={(deckTitle) => this.setState({deckTitle})}
        />
        <Button
          onPress={this.createDeck}
          title="Create Deck"
          accessibilityLabel="Tap here to create a new deck"
        />
      </View>
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


export default NewDeck

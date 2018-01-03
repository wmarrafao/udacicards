import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { saveDeckTitle } from '../utils/api'
import { white, darkBlue } from '../utils/colors'

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
        <Text style={styles.prompt}>
          What is the title of your new deck?
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Deck Title"
            value={this.state.deckTitle}
            onChangeText={(deckTitle) => this.setState({deckTitle})}
            style={styles.textInput}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={this.createDeck}
            accessibilityLabel="Tap here to create a new deck"
            style={styles.btn}>
              <Text style={styles.btnText}>Create Deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  prompt: {
    fontSize: 32,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  textInput: {
    flex: 1,
    height: 40,
    margin: 15,
    padding: 5,
    borderWidth: 2,
    borderRadius:5,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 18,
    color: darkBlue,
  },
  btn: {
    backgroundColor: darkBlue,
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10,
  },
  btnText: {
    fontSize: 20,
    color: white
  },
});


export default NewDeck

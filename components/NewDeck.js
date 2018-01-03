import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { addDeck } from '../actions'
import { saveDeck } from '../utils/api'
import { white, darkBlue } from '../utils/colors'

class NewDeck extends Component {

  state = {
    deckTitle: ""
  }

  createDeck = () => {
    const { deckTitle } = this.state;
    let deck = {
      title: deckTitle,
      questions: []
    };

    this.props.addDeck(deck)
    saveDeck(JSON.stringify({ [deckTitle]: deck }));
    this.setState({ deckTitle: "" });
    this.props.navigation.navigate('Home');
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

function mapStateToProps() {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    addDeck: (deck) => dispatch(addDeck(deck)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)

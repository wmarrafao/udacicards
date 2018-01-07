import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { addDeck, setCurrentDeck } from '../actions'
import { saveDeck } from '../utils/api'
import TextButton from './TextButton'
import { white, darkBlue } from '../utils/colors'

class NewDeck extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deckTitle: ""
    }

    this.createDeck = this.createDeck.bind(this);
  }

  createDeck = () => {
    const { deckTitle } = this.state;
    let deck = {
      title: deckTitle,
      questions: []
    };

    this.props.addDeck(deck);
    this.props.setCurrentDeck(deck);
    saveDeck(JSON.stringify({ [deckTitle]: deck }));
    this.setState({ deckTitle: "" });

    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Home'}),
        NavigationActions.navigate({ routeName: 'DeckView'}),
      ]
    });
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
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
          <TextButton
            text={'Create Deck'}
            onPress={this.createDeck}
            styles={{ btn: styles.btn, btnText: styles.btnText }}
          />
        </View>
      </KeyboardAwareScrollView>
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
    padding: 10
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
    setCurrentDeck: (deck) => dispatch(setCurrentDeck(deck))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)

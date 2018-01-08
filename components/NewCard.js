import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Keyboard } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { addCard } from '../actions'
import { saveDeck } from '../utils/api'
import TextButton from './TextButton'
import { white, darkBlue } from '../utils/colors'

class NewCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      question: "",
      answer: ""
    }
    this.createCard = this.createCard.bind(this);
  }

  createCard = () => {
    let card = {
      question: this.state.question,
      answer: this.state.answer
    }

    let deck = {
      ...this.props.currentDeck,
      questions: this.props.currentDeck.questions.concat(card)
    }

    this.props.addCard(card, this.props.currentDeck)
    saveDeck(JSON.stringify({ [this.props.currentDeck.title]: deck }));
    this.setState( {
      question: "",
      answer: ""
    });
    Keyboard.dismiss();
    
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
            Question:
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter question here"
              value={this.state.question}
              onChangeText={(question) => this.setState({question})}
              style={styles.textInput}
            />
          </View>
          <Text style={styles.prompt}>
            Answer:
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter answer here"
              value={this.state.answer}
              onChangeText={(answer) => this.setState({answer})}
              style={styles.textInput}
            />
          </View>
          <TextButton
            text={'Create Card'}
            onPress={this.createCard}
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
  },
  prompt: {
    fontSize: 32,
    textAlign: 'center',
    marginTop: 15,
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
    marginTop: 10,
  },
  btnText: {
    fontSize: 20,
    color: white
  },
});

function mapStateToProps({ currentDeck }) {
  return {
    currentDeck
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCard: (card, deck) => dispatch(addCard(card, deck)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCard)

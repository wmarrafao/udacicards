import React, { Component } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import DeckCard from './DeckCard'
import TextButton from './TextButton'
import { white, darkBlue, green, red } from '../utils/colors'

class ListDecks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      correctAnswers: 0,
      showAnswer: false,
    }
  }

  correct = () => {
    this.setState((state) => {
      return {
        counter: state.counter+1,
        correctAnswers: state.correctAnswers+1,
      };
    })
  }

  incorrect = () => {
    this.setState((state) => {
      return {counter: state.counter+1};
    })
  }

  retakeQuiz = () => {
    const resetAction = NavigationActions.reset({
      index: 2,
      actions: [
        NavigationActions.navigate({ routeName: 'Home'}),
        NavigationActions.navigate({ routeName: 'DeckView'}),
        NavigationActions.navigate({ routeName: 'QuizView'})
      ]
    });

    this.props.navigation.dispatch(resetAction)
  }

  render() {
    const { counter, showAnswer } = this.state;
    let numOfCards = this.props.deck.questions.length

    if (counter < numOfCards) {
      let prompt = showAnswer === true
        ? this.props.deck.questions[counter].answer
        : this.props.deck.questions[counter].question
      return (
        <View style={styles.container}>
          <Text style={styles.meta}>{counter+1}/{numOfCards}</Text>
          <Text style={styles.question}>{prompt}</Text>
          <TextButton
            text={showAnswer === true? 'Show Question' : "Show Answer"}
            styles={{ btn: { backgroundColor: white, alignItems: 'center' }, btnText: styles.flipBtn }}
            onPress={() => this.setState((state) => ({showAnswer: !state.showAnswer}))}
          />
          <View style={styles.buttons}>
            <TextButton text={'Correct'} onPress={this.correct} styles={{ btn: styles.correct, btnText: styles.btnText }} />
            <TextButton text={'Incorrect'} onPress={this.incorrect} styles={{ btn: styles.incorrect, btnText: styles.btnText }} />
          </View>
        </View>
      )
    }

    let { correctAnswers } = this.state
    let msg = (correctAnswers/numOfCards) > 0.70
      ? `Congratualtions!\n You got ${correctAnswers} correct answers out of ${numOfCards}.`
      : `Keep studying! You got ${correctAnswers} answers correct out of ${numOfCards}.`
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <Text style={styles.question}>{msg}</Text>
        <TextButton text={'Retake Quiz'} onPress={this.retakeQuiz} styles={{ btn: styles.retake, btnText: styles.btnText }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  meta: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 40,
    fontWeight: 'bold',
  },
  question: {
    fontSize: 44,
    color: darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    margin: 0,
  },
  flipBtn: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ff0000'
  },
  buttons: {
    alignItems: 'stretch',
    margin: 10,
    marginTop: 30,
  },
  correct: {
    backgroundColor: green,
    borderColor: green,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 5,
    alignItems: 'center'
  },
  incorrect: {
    backgroundColor: red,
    borderColor: red,
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center'
  },
  retake: {
    backgroundColor: darkBlue,
    borderColor: darkBlue,
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10,
    margin: 25,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: white
  },
});

function mapStateToProps({ currentDeck }) {
  return {
    deck: currentDeck,
  }
}

export default connect(mapStateToProps)(ListDecks)

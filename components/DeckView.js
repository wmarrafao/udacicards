import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import DeckCard from './DeckCard'
import TextButton from './TextButton'
import { white, lightGray, darkBlue } from '../utils/colors'

class ListDecks extends Component {

  constructor(props) {
    super(props);
  }

  addCard = () => {
    console.log('AddCard pressed!')
    this.props.navigation.navigate('NewCard');
  }

  startQuiz = () => {
    console.log('startQuiz pressed!')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.deck}>
          <Text style={styles.title}>{this.props.deck.title}</Text>
          <Text style={styles.meta}>{this.props.deck.questions.length} cards</Text>
        </View>
        <View style={styles.buttons}>
          <TextButton text={'Add Card'} onPress={this.addCard} styles={{ btn: styles.addCard, btnText: styles.addCardText }} />
          <TextButton text={'Start Quiz'} onPress={this.startQuiz} styles={{ btn: styles.startQuiz, btnText: styles.startQuizText }} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'space-between'
  },
  deck: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 50  ,
    alignItems: 'center',
  },
  buttons: {
    alignItems: 'stretch',
    margin: 50,
  },
  title: {
    fontSize: 52,
    color: darkBlue
  },
  meta: {
    fontSize: 30,
    color: lightGray
  },
  addCard: {
    backgroundColor: white,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 5,
    alignItems: 'center'
  },
  addCardText: {
    fontSize: 20,
    color: darkBlue
  },
  startQuiz: {
    backgroundColor: darkBlue,
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center'
  },
  startQuizText: {
    fontSize: 20,
    color: white
  },
});

function mapStateToProps({ currentDeck }) {
  return {
    deck: currentDeck,
  }
}

export default connect(mapStateToProps)(ListDecks)

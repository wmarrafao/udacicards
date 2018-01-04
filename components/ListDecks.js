import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { receiveDecks, setCurrentDeck } from '../actions'
import { fetchDecks } from '../utils/api'
import DeckCard from './DeckCard'
import { white, lightGray, darkBlue } from '../utils/colors'

class ListDecks extends Component {

  componentDidMount() {
    fetchDecks().then((decks) => {
      this.props.receiveDecks(JSON.parse(decks))
    })
  }

  displayDeck = (deck) => {
    console.log(`${deck.title} pressed!`)
    this.props.setCurrentDeck(deck);
    this.props.navigation.navigate('DeckView');
  }

  render() {
    const { decks } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Decks</Text>
        </View>
        <View style={styles.scrollContainer}>
          <ScrollView contentContainerStyle={styles.scrollview}>
            {
              decks != undefined && Object.keys(decks).map((key) => (
                <DeckCard key={key} deck={decks[key]} displayDeck={this.displayDeck}/>
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
    backgroundColor: white,
  },
  header: {
    flex: 1,
    marginTop: 10,
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
    alignItems: 'stretch',
  },
});

function mapStateToProps({ decks }) {
  return {
    decks
  }
}

function mapDispatchToProps(dispatch) {
  return {
    receiveDecks: (decks) => dispatch(receiveDecks(decks)),
    setCurrentDeck: (deck) => dispatch(setCurrentDeck(deck))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListDecks)

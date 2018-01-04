import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { lightGray, darkBlue } from '../utils/colors'

export default function DeckCard ({ deck, displayDeck }) {
  console.log(deck)
  return (
    <View>
      <TouchableOpacity style={styles.deck} onPress={(d) => displayDeck(deck)}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.meta}>{deck.questions.length} cards</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  deck: {
    height: 100,
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
})

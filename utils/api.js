import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'UdaciCards:decks'

export function saveDeck(deck) {
  AsyncStorage.mergeItem(DECKS_STORAGE_KEY, deck);
}

export function fetchDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
}

export function addCardToDeck() {
  
}

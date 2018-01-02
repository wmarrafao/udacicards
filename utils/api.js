import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'UdaciCards:decks'

export function saveDeckTitle(deckTitle) {
  AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [deckTitle]: {
      title: deckTitle,
      questions: []
    }
  }))
}

export function fetchDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
}

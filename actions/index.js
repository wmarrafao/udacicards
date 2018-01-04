export const ADD_DECK = 'ADD_DECK'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const SET_CURRENT_DECK = 'SET_CURRENT_DECK'

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function setCurrentDeck(deck) {
  return {
    type: SET_CURRENT_DECK,
    deck
  }
}

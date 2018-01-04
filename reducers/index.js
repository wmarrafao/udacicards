import { ADD_DECK, RECEIVE_DECKS, SET_CURRENT_DECK } from '../actions'

function reducer (state = { decks: null, currentDeck: null }, action) {
  const { deck, decks } = action;
  switch (action.type) {
    case ADD_DECK:
      return {
        ...state,
        decks: {
          ...state.decks,
          [deck.title]: deck,
        }
      }
    case RECEIVE_DECKS:
      return {
        ...state,
        decks: decks,
      }
    case SET_CURRENT_DECK:
      return {
        ...state,
        currentDeck: deck,
      }
    default:
      return state;
  }
}

export default reducer

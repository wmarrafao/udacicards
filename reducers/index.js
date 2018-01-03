import { ADD_DECK, RECEIVE_DECKS } from '../actions'

function reducer (state = { decks: null }, action) {
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
    default :
      return state;
  }
}

export default reducer

import { ADD_DECK, RECEIVE_DECKS, SET_CURRENT_DECK, ADD_CARD } from '../actions'

function reducer (state = { decks: null, currentDeck: null }, action) {
  const { deck, decks, card } = action;
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
    case ADD_CARD:
      return {
        ...state,
        decks: {
          ...state.decks,
          [deck.title]: {
            ...state.decks[deck.title],
            questions: state.decks[deck.title].questions.concat(card)
          }
        },
        currentDeck: {
          ...state.currentDeck,
          questions: state.currentDeck.questions.concat(card)
        }
      }
    default:
      return state;
  }
}

export default reducer

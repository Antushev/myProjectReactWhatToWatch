const SHOW_FILMS_CARD_COUNT = 8;

const initialState = {
  showFilmCardCount: SHOW_FILMS_CARD_COUNT,
};

const ActionType = {
  SHOW_ADDITIONAL_CARD: `SHOW_ADDITIONAL_CARD`,
  RESET_FILM_CARD_COUNT: `RESET_FILM_CARD_COUNT`,
};

const ActionCreator = {
  showAdditionalCard() {
    return {
      type: ActionType.SHOW_ADDITIONAL_CARD,
      payload: SHOW_FILMS_CARD_COUNT
    };
  },
  resetFilmCardCount() {
    return {
      type: ActionType.RESET_FILM_CARD_COUNT,
      payload: SHOW_FILMS_CARD_COUNT
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SHOW_ADDITIONAL_CARD:
      return Object.assign({}, state, {
        showFilmCardCount: state.showFilmCardCount + SHOW_FILMS_CARD_COUNT
      });
    case ActionType.RESET_FILM_CARD_COUNT:
      return Object.assign({}, state, {
        showFilmCardCount: action.payload
      });
    default:
      return state;
  }
};

export {reducer, ActionCreator};

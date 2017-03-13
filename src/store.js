import { createStore } from 'redux';
import { fromJS } from 'immutable';

// import root reducer
import rootReducer from './reducers';

import { loadState, saveState } from './utils/localStorage';
import { isGameOver, shuffledDeck } from './utils/utils';

let persistedState = loadState();

// We don't want to start with a game over page.
if ( isGameOver( persistedState.get('deck'), persistedState.get('piles') ) ) {
	persistedState = persistedState
		.set( 'deck', shuffledDeck() )
		.set( 'piles', persistedState.get('piles').map( () => fromJS([]) ));
}
const store = createStore( rootReducer, persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );


store.subscribe( () => {
	saveState( store.getState() );
});

export default store;

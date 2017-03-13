import { fromJS, List } from 'immutable';

import { getSuit, getVal, shuffledDeck, isGameOver, isWinning, getTotalCards } from '../utils/utils';

const getTopCards = ( piles, chosenPile = 0, easy = false ) => {
	return piles.map( ( pile, idx ) => {
		if ( easy && chosenPile === idx ) {
			return pile.pop().last();
		} else {
			return pile.last();
		}
	} );
};

const canBeRemoved = ( piles, pile, easy ) => {
	const topCards = getTopCards( piles, pile, easy );

	const clickedCard = piles.get( pile ).last();
	const suit = getSuit( clickedCard );
	const val = getVal( clickedCard );

	let removable = false;

	topCards.forEach( ( card, i ) => {
		if ( !easy && i === pile ) { return true; }

		const suitA = getSuit( card );
		const valA = getVal( card );

		if ( suitA === suit && valA > val ) {
			removable = true;
			return false;
		}

	});

	return removable;
};

const canBeMoved = ( piles ) => {
	const topCards = getTopCards( piles );

	let movable = false;

	topCards.forEach( ( card ) => {
		if ( card === undefined ) {
			movable = true;
			return false;
		}
	});

	return movable;
};

const getEmptyPile = ( piles ) => {
	let empty;

	piles.forEach( ( pile, i ) => {
		if ( pile.size === 0 ) {
			empty = i;
			return false;
		}
	});

	return empty;
};

// just count the empty piles via reduce, terse at the expense of readability probably
const numEmptyPiles = piles => piles.reduce( ( emptyPiles, piles ) => emptyPiles + ( piles.size === 0 ? 1 : 0 ), 0);

// update stats
const updateStats = ( stats, piles ) => {
	const totalCards = getTotalCards( piles );
	return stats.set( totalCards, (stats.get( totalCards ) || 0) + 1 );
};

const getNewState = ( state, newDeck, newPiles ) => {
	const easy = state.get( 'easy' );
	const difficultyProp = easy ? 'easy' : 'hard';

	const gameOver = isGameOver( newDeck, newPiles, easy );

	const stats = state.get( 'stats' );

	const games = stats.get( difficultyProp ).get( 'games' );
	const wins = stats.get( difficultyProp ).get( 'wins' );
	const dist = stats.get( difficultyProp ).get( 'dist' );

	const newStats = stats.set(
		difficultyProp,
		stats.get( difficultyProp )
			.set( 'games', gameOver ? games + 1 : games )
			.set( 'wins', isWinning( newDeck, newPiles ) ? wins + 1 : wins )
			.set( 'dist', gameOver ? updateStats( dist, newPiles ) : dist )
	);

	return state
		.set( 'deck', newDeck )
		.set( 'piles', newPiles )
		.set( 'stats', newStats );
};

// will have to consider how to divide reducers
const reducer = ( state, action ) => {
	const piles = state.get('piles');
	const deck = state.get('deck');
	const easy = state.get('easy');

	switch ( action.type ) {
	case 'REMOVE_TOP_CARD':
		if ( canBeRemoved( state.get('piles'), action.pile, easy ) ) {
			const newPiles = piles.set( action.pile, piles.get( action.pile ).pop() );
			return getNewState( state, deck, newPiles );
		} else if ( canBeMoved( state.get('piles') ) ) {
			const emptyIdx = getEmptyPile( piles );

			const card = piles.get( action.pile ).last();

			const newPiles = piles
					.set( action.pile, piles.get( action.pile ).pop() )
					.set( emptyIdx, List( [ card ] ) );

			return getNewState( state, deck, newPiles );
		} else {
			return state;
		}
	case 'DEAL_CARDS': {
		const emptyPiles = numEmptyPiles(piles);
		if (emptyPiles) {
			const cards = deck.slice(0, emptyPiles);
			let i = 0;
			const newPiles = piles.map((pile) => {
				if (pile.size === 0) {
					return pile.push(cards.get(i++));
				} else {
					return pile;
				}
			});
			const newDeck = deck.slice(emptyPiles);

			return getNewState(state, newDeck, newPiles);
		} else {
			const cards = deck.slice(0, 4);

			const newPiles = piles.map((pile, i) => {
				if (cards.get(i) !== undefined) {
					return pile.push(cards.get(i));
				} else {
					return pile;
				}
			});
			const newDeck = deck.slice(4);

			return getNewState(state, newDeck, newPiles);
		}
	}
	case 'START_NEW_GAME':
		return state
				.set( 'deck', shuffledDeck() )
				.set( 'piles', piles.map( () => fromJS([]) ))
				.set( 'easy', action.difficulty === 'easy' );

	default:
		return state;
	}
};

export default reducer;
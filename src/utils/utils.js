import { fromJS, List, Map } from 'immutable';

export const shuffledDeck = () => {
	let deck = [];
	for( var i = 0; i < 52; i++ ) {
		deck.push( i );
	}

	// fischer-yates...clever (the second algorithm would have been fine performance-wise...but why not
	// https://bost.ocks.org/mike/shuffle/

	var m = 52, t, j;

	// While there remain elements to shuffle…
	while (m) {

		// Pick a remaining element…
		j = Math.floor(Math.random() * m--);

		// And swap it with the current element.
		t = deck[m];
		deck[m] = deck[j];
		deck[j] = t;
	}

	return fromJS( deck );
}

export const getSuit = ( card ) => Math.floor( card / 13 );
export const getVal = ( card ) => card % 13;

export const noSameSuits = ( piles ) => {
	// compare the number of unique suits to the number of
	const nonEmptyPiles = piles.filter( pile => pile.size !== 0 );

	// toSet removes duplicates (in this case duplicate suits)
	return nonEmptyPiles.size === nonEmptyPiles.map( pile => getSuit( pile.last() ) ).toSet().size;
};

export const getTotalCards = ( piles ) => {
	return piles.reduce( ( sum, pile ) => sum + pile.size, 0 );
};

const noEmptyPiles = ( piles ) => {
	return piles.every( pile => pile.size )
}

const noEasyCardsToRemove = ( piles ) => {
	console.log( 'no easy') ;
	let noEasy = true;

	piles.forEach( ( pile ) => {
		if ( pile.size < 2 ) { return true; }

		const topCard = pile.last();
		const secondCard = pile.pop().last();
		if ( getSuit( topCard ) === getSuit( secondCard ) && getVal( topCard ) < getVal( secondCard ) ) {
			noEasy = false;
			return false;
		}
	});

	return noEasy;
}

export const isGameOver = ( deck, piles, easy ) => {
	return deck.size === 0 && noEmptyPiles( piles ) && noSameSuits( piles ) && ( !easy || noEasyCardsToRemove( piles ) );
};

export const isWinning = ( deck, piles ) => {
	return isGameOver( deck, piles ) && getTotalCards( piles ) === 4;
};

export const getDefaultState = () => {
	const deck = shuffledDeck();

	const piles = List.of( fromJS([]), fromJS([]), fromJS([]), fromJS([]) );

	return Map({
		deck,
		piles,
		easy: false,
		stats: fromJS({
			easy: {
				games: 0,
				wins: 0,
				dist: []
			},
			hard: {
				games: 0,
				wins: 0,
				dist: []
			}
		})
	});
};

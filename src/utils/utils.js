import { fromJS, List, Map } from 'immutable';

const shuffle = ( size ) => {

	let deck = [];
	for( var i = 0; i < size; i++ ) {
		deck.push( i );
	}

	// fischer-yates...clever (the second algorithm would have been fine performance-wise...but why not
	// https://bost.ocks.org/mike/shuffle/

	var m = size, t, j;

	// While there remain elements to shuffle…
	while (m) {

		// Pick a remaining element…
		j = Math.floor(Math.random() * m--);

		// And swap it with the current element.
		t = deck[m];
		deck[m] = deck[j];
		deck[j] = t;
	}

	return deck;
}

const newPerm = ( perm ) => {
	const potentialPerm = shuffle( 4 );

	// needlessly terse, but just check if any elements match up
	if ( perm.reduce( ( sum, curr, i ) => sum += ( curr === potentialPerm[i] ) ? 1 : 0, 0 ) ) {
		return newPerm( perm );
	} else {
		return potentialPerm;
	}
}

const foolsDeck = () => {
	// Don't include aces, they'll be last!
	let suits = [
		[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ],
		[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ],
		[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ],
		[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ]
	];

	let perm = [ 0, 1, 2, 3 ];

	// empty
	let deck = [];

	while( suits[0].length ) {
		const len = suits[0].length;
		perm.forEach( idx => {
			let card = suits[ idx ].splice( Math.floor( Math.random() * len ), 1 )[0];
			deck.push( card + idx * 13 );
		});
		perm = newPerm( perm );
	}

	// add the aces
	perm.forEach( idx => {
		deck.push( 12 + idx * 13 );
	});

	return fromJS( deck );
}


export const shuffledDeck = () => {
	const now = new Date();

	if ( now.getMonth() === 3 && now.getDate() === 1 ) {
		const deck = foolsDeck();
		return fromJS( deck );
	} else {
		const deck = shuffle( 52 );
		return fromJS( deck );
	}
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

console.log( foolsDeck() );

import React, { PropTypes as T } from 'react';
import { List, Map } from 'immutable';

import { getTotalCards } from './utils/utils';

const getPercentile = ( stats, cardsRemaining, difficulty ) => {
	const games = stats.get( difficulty ).get( 'games' );
	const dist = stats.get( difficulty ).get( 'dist' );

	const worseGames = dist.reduce( ( games, curr, i ) => {
		return ( i > cardsRemaining ) ? games + curr : games;
	}, 0 );

	const percentile = worseGames / games;
	return Math.round( percentile * 100 );
};

const getAverage = ( stats, difficulty ) => {
	const sum = stats.get( difficulty ).get( 'dist' )
		.reduce( ( sum, current, idx ) => sum + (current || 0) * idx, 0 );

	const average = sum / stats.get( difficulty ).get( 'games' );

	// return it formatted nicely
	return Math.round( average * 100 ) / 100;
};

const getBestScore = ( stats, difficulty ) => {
	let best = 52;

	stats.get( difficulty ).get( 'dist' ).forEach( ( mag, idx ) => {
		if ( best === 52 ) {
			if ( mag ) { best = idx; }
		}
	});

	return best;
};

const EndGame = ( { stats, easy, piles, deck, startNewGame } ) => {

	const currentDifficulty = easy ? 'easy' : 'hard';
	const average = getAverage( stats, currentDifficulty );
	const bestScore = getBestScore( stats, currentDifficulty );
	const cardsRemaining = getTotalCards( piles ) + deck.size;
	const percentile = getPercentile( stats, cardsRemaining, currentDifficulty );

	const wins = stats.get( currentDifficulty ).get( 'wins' );
	const times = wins === 1 ? 'time' : 'times';


	return (
		<div>
			<h1> { cardsRemaining === 4 ? 'Congratulations! You Win!' : 'Game Over!' } </h1>
			<h2 style={{ marginTop: '20px' }}> { cardsRemaining } cards remaining.</h2>
			<div className="modal-stats">
				{ stats.get( currentDifficulty ).get( 'games' ) > 10 ?
					<p>
						That's better than  <span className="emphasis">{ percentile }% </span> of your games!
					</p>
					:
					null
				}
				<p>
					You've played&nbsp;
					<span className="emphasis">
										{ stats.get( currentDifficulty ).get( 'games' ) }
									</span>
					&nbsp;
					{ easy ? 'easy' : 'hard' } games.
				</p>
				<p>
					{ wins ?
						(
							<span>
												You've won&nbsp;
								<span className="emphasis">
													{ wins }
												</span>
								&nbsp;{ times }!
											</span>
						)
						:
						(
							<span>
												Your best score is&nbsp;
								<span className="emphasis">
													{ bestScore }
												</span> cards remaining.
											</span>
						)
					}
				</p>
				<p>
					You average <span className="emphasis">{ average } </span> cards remaining.
				</p>
			</div>
			<div className="modal-buttons">
				<a className="button" onClick={ startNewGame.bind( null, 'easy') } > New Easy Game </a>
				&nbsp;
				<a className="button" onClick={ startNewGame.bind( null, 'hard') } > New Hard Game </a>
			</div>
		</div>
	);
};

EndGame.propTypes = {
	deck: T.instanceOf( List ).isRequired,
	easy: T.bool.isRequired,
	piles: T.instanceOf( List ).isRequired,
	startNewGame: T.func.isRequired,
	stats: T.instanceOf( Map ).isRequired
};

export default EndGame;


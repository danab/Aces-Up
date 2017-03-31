import React, { PropTypes as T } from 'react';
import { Map } from 'immutable';

// TODO: These are duplicated, add to utils file
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

const FormatStats = ( { games, average, wins, best, times, title } ) => {
	const style = { width: '50%', marginBottom: '20px', float: 'left' };
	if ( games === 0 ) { return ( <div style={ style }> <h2 style={{ marginTop: '90px', marginLeft: '20px' }}> No { title.toLowerCase() } games played. </h2></div> );}
	return (
		<div style={{ width: '50%', float: 'left', marginBottom: '20px' }}>
			<h2 style={{ marginTop: '20px' }}> { title } </h2>
			<div className="modal-stats">
				<p>
					Average: <span className="emphasis">{ average } </span> cards remaining.
				</p>
				<p>
					{ wins ?
						(
							<span>
								Games Won:&nbsp;
								<span className="emphasis">
									{ wins }
								</span>
								&nbsp;{ times }!
								{ Math.round( wins/games * 1000 ) / 100 + '%'}
								</span>
						)
						:
						(
							<span>
								Best Score:&nbsp;
								<span className="emphasis">
									{ best }
								</span> cards remaining.
							</span>
						)
					}
				</p>
				<p>
					Games:&nbsp;
					<span className="emphasis">
						{ games }
					</span>
					&nbsp;easy games.
				</p>
			</div>
		</div>

	);
};

FormatStats.propTypes = {
	average: T.number.isRequired,
	best: T.number.isRequired,
	games: T.number.isRequired,
	times: T.string.isRequired,
	title: T.string.isRequired,
	wins: T.number.isRequired
};

const StatsModal = ( { stats, hideModal } ) => {

	const easyGames = stats.get( 'easy' ).get( 'games' );

	const easyAverage = getAverage( stats, 'easy' );
	const easyBestScore = getBestScore( stats, 'easy' );

	const easyWins = stats.get( 'easy' ).get( 'wins' );
	const easyTimes = easyWins === 1 ? 'time' : 'times';

	const easyProps = {
		games: easyGames,
		wins: easyWins,
		best: easyBestScore,
		average: easyAverage,
		times: easyTimes,
		title: 'Easy'
	};

	const hardGames = stats.get( 'hard' ).get( 'games' );
	const hardAverage = getAverage( stats, 'hard' );
	const hardBestScore = getBestScore( stats, 'hard' );

	const hardWins = stats.get( 'hard' ).get( 'wins' );
	const hardTimes = hardWins === 1 ? 'time' : 'times';

	const hardProps = {
		games: hardGames,
		wins: hardWins,
		best: hardBestScore,
		average: hardAverage,
		times: hardTimes,
		title: 'Hard'
	};
	return (
		<div>
			<h1>  Stats </h1>
			<FormatStats { ...easyProps } />
			<FormatStats { ...hardProps } />
			<div className="modal-buttons">
				<a className="button" onClick={ hideModal } > Resume Game </a>
				&nbsp;
			</div>
		</div>
	);
};

StatsModal.propTypes = {
	hideModal: T.func.isRequired,
	stats: T.instanceOf( Map ).isRequired
};

export default StatsModal;


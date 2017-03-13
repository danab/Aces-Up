import React, {
	Component,
	PropTypes as T,
} from 'react';

import { getTotalCards } from './utils/utils';

class Modal extends Component {

	getPercentile( cardsRemaining, difficulty ) {
		const games = this.props.stats.get( difficulty ).get( 'games' );
		const dist = this.props.stats.get( difficulty ).get( 'dist' );

		const worseGames = dist.reduce( ( games, curr, i ) => {
			return ( i > cardsRemaining ) ? games + curr : games;
		}, 0 );

		const percentile = worseGames / games;
		return Math.round( percentile * 100 );
	}

	getAverage( difficulty) {
		const sum = this.props.stats.get( difficulty ).get( 'dist' )
				.reduce( ( sum, current, idx ) => sum + (current || 0) * idx, 0 );

		const average = sum / this.props.stats.get( difficulty ).get( 'games' );

		// return it formatted nicely
		return Math.round( average * 100 ) / 100;
	}

	getBestScore( difficulty ) {
		let best;

		this.props.stats.get( difficulty ).get( 'dist' ).forEach( ( mag, idx ) => {
			if ( best === undefined ) {
				if ( mag ) { best = idx; }
			}
		});

		return best;
	}

	render() {
		const currentDifficulty = this.props.easy ? 'easy' : 'hard';
		const average = this.getAverage( currentDifficulty );
		const bestScore = this.getBestScore( currentDifficulty );
		const cardsRemaining = getTotalCards( this.props.piles );
		const percentile = this.getPercentile( cardsRemaining, currentDifficulty );

		const wins = this.props.stats.get( currentDifficulty ).get( 'wins' );
		const times = wins === 1 ? 'time' : 'times';

		return (
			<div id="modal" className={ ( this.props.gameOver ) ? 'show-modal' : 'hide-modal' } >
				<div id="modal-content">

					{ this.props.gameOver ?
						<div>
							<h1> { cardsRemaining === 4 ? 'Congratulations! You Win!' : 'Game Over!' } </h1>
							<h2 style={{ marginTop: '20px' }}> { cardsRemaining } cards remaining.</h2>
							<div className="modal-stats">
								{ this.props.stats.get( currentDifficulty ).get( 'games' ) > 10 ?
									<p>
										That's better than  <span className="emphasis">{ percentile }% </span> of your games!
									</p>
									:
									null
								}
								<p>
									You've played&nbsp;
									<span className="emphasis">
										{ this.props.stats.get( currentDifficulty ).get( 'games' ) }
									</span>
									&nbsp;
									{ this.props.easy ? 'easy' : 'hard' } games.
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
								<a className="button" onClick={ this.props.startNewGame.bind( this, 'easy') } > New Easy Game </a>
								&nbsp;
								<a className="button" onClick={ this.props.startNewGame.bind( this, 'hard') } > New Hard Game </a>
							</div>
						</div>
					: null }
				</div>
			</div>
		);
	}
}

Modal.propTypes = {
	startNewGame: T.func.isRequired
};
Modal.defaultProps = {};

export default Modal;

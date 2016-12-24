import React, {
	Component,
	PropTypes as T,
} from 'react';

import { getTotalCards } from './utils/utils';

class Modal extends Component {

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
							<a className="button" onClick={ this.props.startNewGame.bind( this, 'easy') } > New Easy Game </a>
							&nbsp;
							<a className="button" onClick={ this.props.startNewGame.bind( this, 'hard') } > New Hard Game </a>
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

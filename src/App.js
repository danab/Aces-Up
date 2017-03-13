import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

import Pile from './Pile';
import Deck from './Deck';
import Modal from './Modal';

import { startNewGame } from './actions/actions';
import { isGameOver, isWinning, getTotalCards } from './utils/utils';

import './App.css';

class App extends Component {

	render() {
		const piles = this.props.piles.map( ( pile, i ) => <Pile key={'pile-' + i} idx={i} cards={ pile } /> );
		const difficulty = this.props.easy ? 'Easy' : 'Hard';
		let cardsRemaining = getTotalCards( this.props.piles );
		if ( cardsRemaining < 10 ) { cardsRemaining = '\u00a0' + cardsRemaining; }

		return (
			<div className="App">
				<Deck deck={ this.props.deck } />
				<Deck side deck={ this.props.deck } />
				{ piles }
				<div className="difficulty">
					<p>
						Difficulty: { difficulty }
						&nbsp;
						&nbsp;
						Cards: { cardsRemaining }
					</p>
				</div>
				<Modal {...this.props } />
			</div>
		);
	}
}

App.propTypes = {
	deck: T.instanceOf( List ).isRequired,
	easy: T.bool.isRequired,
	piles: T.instanceOf( List ).isRequired
};

const mapStateToProps = ( state ) => {
	const deck = state.get('deck');
	const piles = state.get('piles');
	const stats = state.get('stats');
	const easy = state.get('easy');
	const gameOver = isGameOver( deck, piles, easy );
	const winning = isWinning( deck, piles );
	return { deck, piles, stats, gameOver, winning, easy };
};

const app = connect( mapStateToProps, { startNewGame } )( App );

export default app;

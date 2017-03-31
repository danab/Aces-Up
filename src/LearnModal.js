import React, {
	Component,
	PropTypes as T,
} from 'react';

const Page0 = () => {
	return (
		<div className="modal-stats">
			<h2 style={{ fontSize: '1.3em' }}> Objective: Finish with only the 4 Aces remaining. </h2>
			<div style={{ textAlign: 'left', marginTop: '10px' }}>
				The game starts with a standard 52 card deck face down.
				To begin the game, click the deck to deal a card to each of the four piles.
				The goal will to be to remove all the cards until only the four aces remain (one in each pile).
				<div style={{ marginTop: '20px', textAlign: 'center' }} >
					<img alt="Example of what piles look like" width="400" src="/img/thepiles.png" />
				</div>
			</div>
		</div>
	);
};

const Page1 = () => {
	return (
		<div className="modal-stats">
			<h2 style={{ fontSize: '1.3em' }}> Game Play: Removing Cards </h2>
			<div style={{ textAlign: 'left', marginTop: '10px' }}>
				You may remove cards if the card is on the top of a pile and there exists a card on top of another pile of the same suit, and higher number.
				For example, the 7 of clubs may be removed below, because it is lower than the jack of clubs.
				What other card can be removed?
				<div style={{ marginTop: '20px', textAlign: 'center' }} >
					<img alt="Example of what piles look like" width="400" src="/img/thepiles.png" />
				</div>
			</div>
		</div>
	);
};

const Page2 = () => {
	return (
		<div className="modal-stats">
			<h2 style={{ fontSize: '1.3em' }}> Empty Piles </h2>
			<div style={{ textAlign: 'left', marginTop: '10px' }}>
				The bulk of the strategy comes in with handling empty piles.
				If you remove all cards from one pile you may move any card from the top of another pile to that pile.
				You may also chose to deal one card from the deck into that pile.
				<div style={{ marginTop: '20px', textAlign: 'center' }} >
					<img alt="Example of what an empty pile looks like" width="300" src="/img/emptypile.png" />
				</div>
			</div>
		</div>
	);
};

const Page3 = () => {
	return (
		<div className="modal-stats">
			<h2 style={{ fontSize: '1.3em' }}> Difficulty Levels </h2>
			<div style={{ textAlign: 'left', marginTop: '10px' }}>
				There are two difficulty levels, "easy" and "hard".
				The only difference is that on "easy" you can remove a card if it is directly on top of a higher card of the same suit.
				In this example, you could remove the 6 of clubs only if you were playing the easy level.
				<div style={{ marginTop: '20px', textAlign: 'center' }} >
					<img alt="Example of a situation where a card can be removed only if it's on easy difficulty" width="300" src="/img/easyexample.png" />
				</div>
			</div>
		</div>
	);
};

const Page4 = ( { gameOver, startNewGame, hideModal } ) => {
	return (
		<div className="modal-stats">
			<h2 style={{ fontSize: '1.3em' }}> Go and Play! </h2>
			<div style={{ marginTop: '20px', textAlign: 'center' }} >
				<img alt="Winning Example" width="300" src="/img/youwin.png" />
			</div>
			<div style={{ textAlign: 'left', marginTop: '10px' }}>
				Remember, the goal is to end with aces up!
			</div>
			<div style={{ marginTop: '20px'}}>
				{ gameOver ?
					<div className="modal-buttons">
						<a className="button" onClick={ startNewGame.bind( null, 'easy') } > New Easy Game </a>
						&nbsp;
						<a className="button" onClick={ startNewGame.bind( null, 'hard') } > New Hard Game </a>
					</div>
					:
					<div className="modal-buttons">
						<a className="button" onClick={ hideModal } > Resume Game </a>
					</div>
				}
			</div>
		</div>
	);
};

Page4.propTypes = {
	gameOver: T.bool.isRequired,
	hideModal: T.func.isRequired,
	startNewGame: T.func.isRequired
};

class LearnModal extends Component {

	constructor() {
		super();
		this.state = { page: 0 };
	}

	changePage( changeDir ) {
		this.setState( { page: this.state.page + changeDir });
	}

	render() {
		return (
			<div>
				<h1 style={{ position: 'relative' }}>
				<span onClick={ this.changePage.bind(this, -1) } style={{ position: 'absolute', top: '24px', left: '27px', display: ( this.state.page === 0 ) ? 'none' : 'inline-block', verticalAlign: 'middle' }} >
					<a style={{ display: 'inline-block', borderRadius: '50%' }}>
						<span className="arrow left"></span>
					</a>

				</span>
					Aces Up
					<span onClick={ this.changePage.bind(this, 1) } style={{ position: 'absolute', top: '24px', right: '27px', display: ( this.state.page === 4 ) ? 'none' : 'inline-block', verticalAlign: 'middle' }} >
					<a style={{ display: 'inline-block', borderRadius: '50%' }}>
						<span className="arrow right"></span>
					</a>

				</span>
				</h1>

				{ this.state.page < 4 ? this.state.page < 3 ? this.state.page < 2 ? this.state.page < 1 ?
					<Page0 />
					:
					<Page1 />
					:
					<Page2 />
					:
					<Page3 />
					:
					<Page4 gameOver={ this.props.gameOver } startNewGame={ this.props.startNewGame } hideModal={ this.props.hideModal } />
				}
			</div>
		);
	}
}

LearnModal.propTypes = {
	gameOver: T.bool.isRequired,
	hideModal: T.func.isRequired,
	startNewGame: T.func.isRequired
};

export default LearnModal;

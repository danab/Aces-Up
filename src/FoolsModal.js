import React, { PropTypes } from 'react';

const EndGame = ( { startNewGame} ) => {

	return (
		<div>
			<h1> April Fools! </h1>
			<h2 style={{ marginTop: '20px' }}> 52 cards remaining. Ouch. </h2>
			<div className="modal-stats">
				Don't worry, this won't affect your stats. I promise I won't do it again.
				<br/>
				<br/>
				<br/>
				I love you! -Dana
				<br/>
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

};

export default EndGame;


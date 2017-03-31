import React, {
	Component,
	PropTypes as T,
} from 'react';
import { List, Map } from 'immutable';

import EndGame from './EndGameModal';
import EndGameFool from './FoolsModal';
import StatsModal from './StatsModal';
import LearnModal from './LearnModal';

class Modal extends Component {

	render() {
		return (
			<div id="modal" className={ ( this.props.modal ) ? 'show-modal' : 'hide-modal' } >
				<div id="modal-content">
					{ this.props.modal === 'gameover' ?
						<EndGame { ...this.props } />
						: this.props.modal === 'learn' ?
						<LearnModal { ...this.props } />
						: this.props.modal === 'stats' ?
						<StatsModal { ...this.props } />
						: this.props.modal === 'gameoverFool' ?
						<EndGameFool { ...this.props } />
					: null }
				</div>
			</div>
		);
	}
}

Modal.propTypes = {
	easy: T.bool.isRequired,
	gameOver: T.bool.isRequired,
	piles: T.instanceOf( List ).isRequired,
	modal: T.oneOfType( [ T.string, T.bool ] ).isRequired,
	startNewGame: T.func.isRequired,
	stats: T.instanceOf( Map ).isRequired
};
Modal.defaultProps = {};

export default Modal;

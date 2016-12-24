import React, {
	Component,
	PropTypes as T,
} from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

import { dealCards } from './actions/actions';

class Deck extends Component {
	render() {
		let classNames = 'pile large-deck';
		classNames += (this.props.side) ? ' side-deck' : ' top-deck'
		return (
			<div className={ classNames }>
				{ (this.props.deck.size !== 0 ) ?
					<div className="deck-wrapper">
						<div onClick={ this.props.dealCards } className="card full-deck">
							<div className="big-val">
								{ this.props.deck.size }
							</div>
						</div>
					</div>
					:
					<div style={{ opacity: 0.5 }} className="card empty-deck">
						<div className="big-val">
							0
						</div>
					</div>
				}
			</div>
		);
	}
}

Deck.propTypes = {
	deck: T.instanceOf( List )
};

Deck = connect( null, { dealCards } )( Deck );

export default Deck;

import React, {
	Component,
	PropTypes as T,
} from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import classnames from 'classnames';

import { dealCards } from './actions/actions';

class Deck extends Component {
	render() {
		const classes = classnames( 'pile', 'large-deck', {
			'side-deck': this.props.side,
			'top-deck': !this.props.side
		});
		return (
			<div className={ classes }>
				{ (this.props.deck.size !== 0 ) ?
					<div className="card-wrapper">
						<div onClick={ this.props.dealCards } className="card full-deck">
							<div className="big-val">
								{ this.props.deck.size }
							</div>
						</div>
					</div>
					:
				<div className="card-wrapper">
					<div className="card empty-deck">
						<div className="big-val">
							0
						</div>
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

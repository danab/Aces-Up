import React, {
	Component,
	PropTypes as T,
} from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

import { attemptRemoveCard } from './actions/actions';

import Card from './Card';

class Pile extends Component {

	removeCard() {
		this.props.attemptRemoveCard( this.props.idx );
	}

	render() {
		const len = this.props.cards.size;
		const cards = this.props.cards.map( (card, i) => {
			return <Card stacked={ len > 4 && i < len - 3 && i !== 0 } key={ card } idx={ card } />
		});
		return (
			<div className="pile">
				<div onClick={ this.removeCard.bind( this ) } >
					{ cards }
					&nbsp;
				</div>
			</div>
		);
	}
}

Pile.propTypes = {
	cards: T.instanceOf( List )
};
Pile.defaultProps = {};

Pile = connect( null, { attemptRemoveCard } )( Pile );

export default Pile;

import React, {
	Component,
	PropTypes as T,
} from 'react';
import { List } from 'immutable';

import Card from './Card';

class Pile extends Component {

	removeCard() {
		this.props.attemptRemoveCard( this.props.idx );
	}

	render() {
		const len = this.props.cards.size;
		const cards = this.props.cards.map( (card, i) => {
			return <Card
				stacked={ len > 4 && i < len - 3 && i !== 0 }
				key={ card } idx={ card }
				pileIdx={ this.props.idx }
			    last={ i + 1 === this.props.cards.size }
			/>;
		});
		return (
			<div className="pile">
				<div >
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

export default Pile;

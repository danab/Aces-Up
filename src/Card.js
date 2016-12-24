import React, {
	Component,
	PropTypes as T,
} from 'react';

const suits = [ '♣', '♦', '♠','♥' ];
const nums = [ '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A' ]

const getCardObj = ( idx ) => {
	// 0-51
	return {
		suit: suits[Math.floor( idx / 13 )],
		num: nums[idx % 13]
	};
}
class Card extends Component {
	render() {
		//
		const cardObj = getCardObj( this.props.idx )
		const suit = Math.floor( this.props.idx / 13 );
		const classname = `card card-${cardObj.num}`;
		let wrapperClassname = 'card-wrapper';
		if ( this.props.stacked ) {
			wrapperClassname += ' stacked';
		}

		return (
			<div className={ wrapperClassname }>
				<div style={{ color: ( suit % 2 ) ? 'red' : 'black' }} className={ classname }>
					<div className="upper-suit">
						<div className="num"> { cardObj.num } </div>
						<div className="suit"> { cardObj.suit } </div>
					</div>
					<div className="lower-suit">
						<div className="num"> { cardObj.num } </div>
						<div className="suit"> { cardObj.suit } </div>
					</div>
					<div className="suits">
						<div className="left upper">{ cardObj.suit }</div>
						<div className="left upper-center">{ cardObj.suit }</div>
						<div className="left center">{ cardObj.suit }</div>
						<div className="left lower-center">{ cardObj.suit }</div>
						<div className="left lower">{ cardObj.suit }</div>
						<div className="right upper">{ cardObj.suit }</div>
						<div className="right upper-center">{ cardObj.suit }</div>
						<div className="right center">{ cardObj.suit }</div>
						<div className="right lower-center">{ cardObj.suit }</div>
						<div className="right lower">{ cardObj.suit }</div>
						<div className="middle upper">{ cardObj.suit }</div>
						<div className="middle upper-center">{ cardObj.suit }</div>
						<div className="middle center">{ cardObj.suit }</div>
						<div className="middle lower-center">{ cardObj.suit }</div>
						<div className="middle lower">{ cardObj.suit }</div>
					</div>
					<div className="big-val"> { cardObj.num } </div>
				</div>
			</div>
		);
	}
}

Card.propTypes = {
	idx: T.number.isRequired
};
Card.defaultProps = {};

export default Card;

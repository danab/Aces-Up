import { fromJS } from 'immutable';

import { getDefaultState } from './utils';

// Thanks Dan Abramov and egghead.io.

export const loadState = () => {
	try {
		const serializedState = localStorage.getItem( 'state' );
		if ( serializedState === null ) {
			// what should we return
			return getDefaultState();
		}

		return fromJS( JSON.parse( serializedState ) );
	} catch (err) {
		// what should we return
		return getDefaultState();
	}
};

export const saveState = ( state ) => {
	try {
		const serializedState = JSON.stringify( state.toJSON() );
		localStorage.setItem( 'state', serializedState );
	} catch ( err ) {
		// ignore write errors
	}
};

export function attemptRemoveCard( pile ) {
	return {
		type: 'REMOVE_TOP_CARD',
		pile
	};
}

export function dealCards() {
	return {
		type: 'DEAL_CARDS'
	};
}

export function startNewGame( difficulty) {
	return {
		type: 'START_NEW_GAME',
		difficulty
	};
}

export function showModal( modalType ) {
	return {
		type: 'SHOW_MODAL',
		modalType
	};
}

export function hideModal() {
	return {
		type: 'HIDE_MODAL'
	};
}

export const ACTIONS = {
	SET_REPONSE: "set_reponse",
	ADD_ATTEMPT: "add_attempt",
	RESET_ATTEMPTS: "reset_attempts",
	POP_ATTEMPT: "pop_attempt",
	INCREMENT_ROUND: "increment_round",
	RESET_GAME: "reset_game",
	SET_STATUS: "set_status",
	SET_CURRENT_ATTEMPT: "set_current_attempt",
};

export function gameReducer(state, action) {
	switch (action.type) {
		case ACTIONS.SET_REPONSE:
			return { ...state, reponse: action.payload };

		case ACTIONS.ADD_ATTEMPT:
			return {
				...state,
				attempts: [...state.attempts, action.payload],
				currentAttempt: [],
				currentRound: state.currentRound + 1,
			};

		case ACTIONS.POP_ATTEMPT:
			return {
				...state,
				currentAttempt: state.currentAttempt.slice(0, -1),
			};

		case ACTIONS.RESET_ATTEMPTS:
			return {
				...state,
				attempts: [],
			};

		case ACTIONS.INCREMENT_ROUND:
			return {
				...state,
				currentRound: state.currentRound + 1,
			};

		case ACTIONS.RESET_GAME:
			return {
				...state,
				attempts: [],
				currentAttempt: [],
				currentRound: 0,
				reponse: action.payload,
				status: "playing",
			};

		case ACTIONS.SET_STATUS:
			return {
				...state,
				status: action.payload,
			};

		case ACTIONS.SET_CURRENT_ATTEMPT:
			return {
				...state,
				currentAttempt: action.payload,
			};

		default:
			return state;
	}
}

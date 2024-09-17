import { useReducer } from "react";
import "./styles/mastermind.css";
import BoardMastermind from "./BoardMastermind.jsx";
import GameControl from "./GameControl.jsx";
import { ACTIONS, gameReducer } from "./ReducerMastermind.js";

const MAX_ROUNDS = 7;
const COLORS = ["red", "blue", "green", "yellow"];

const initialState = {
	reponse: generateReponse(),
	attempts: [],
	currentAttempt: [],
	currentRound: 0,
	status: "playing",
};

function generateReponse() {
	return Array(4)
		.fill(null)
		.map(() => COLORS[Math.floor(Math.random() * COLORS.length)]);
}

const Mastermind = () => {
	const [state, dispatch] = useReducer(gameReducer, initialState);

	function handleSubmitAttempt() {
		const { goodPosition, wrongPosition } = getColorPositions(state.reponse, state.currentAttempt);

		if (state.currentAttempt.length === 4) {
			dispatch({
				type: ACTIONS.ADD_ATTEMPT,
				payload: { goodPosition, wrongPosition, colors: state.currentAttempt },
			});

			if (goodPosition === 4) {
				dispatch({ type: ACTIONS.SET_STATUS, payload: "victory" });
			} else if (state.currentRound + 1 === MAX_ROUNDS) {
				dispatch({ type: ACTIONS.SET_STATUS, payload: "defeat" });
			}
		}
	}

	function handlePopAttempt() {
		dispatch({ type: ACTIONS.POP_ATTEMPT });
	}

	function handleRetry() {
		dispatch({ type: ACTIONS.RESET_GAME, payload: generateReponse() });
	}

	function handleRandomAttempt() {
		dispatch({
			type: ACTIONS.SET_CURRENT_ATTEMPT,
			payload: generateReponse(),
		});
	}

	function handleAddColorAttempt(color) {
		if (state.currentAttempt.length < 4) {
			dispatch({ type: ACTIONS.SET_CURRENT_ATTEMPT, payload: [...state.currentAttempt, color] });
		}
	}

	return (
		<div className="mastermind">
			<GameControl
				currentAttempt={state.currentAttempt}
				setCurrentAttempt={state.setCurrentAttempt}
				onSubmit={handleSubmitAttempt}
				onPop={handlePopAttempt}
				onRetry={handleRetry}
				onRandom={handleRandomAttempt}
				onAddColorToAttempt={handleAddColorAttempt}
				colors={COLORS}
				status={state.status}
			/>
			<BoardMastermind
				maxRounds={MAX_ROUNDS}
				attempts={state.attempts}
				currentAttempt={state.currentAttempt}
				currentRound={state.currentRound}
				reponse={state.reponse}
				status={state.status}
			/>
		</div>
	);
};

function getColorPositions(secretCode, playerGuess) {
	let goodPosition = 0;
	let wrongPosition = 0;

	const secretCodeCopy = [...secretCode];
	const playerGuessCopy = [...playerGuess];

	for (let i = 0; i < secretCodeCopy.length; i++) {
		if (playerGuessCopy[i] === secretCodeCopy[i]) {
			goodPosition++;
			secretCodeCopy[i] = null;
			playerGuessCopy[i] = null;
		}
	}

	for (let i = 0; i < playerGuessCopy.length; i++) {
		if (playerGuessCopy[i] !== null) {
			const index = secretCodeCopy.indexOf(playerGuessCopy[i]);
			if (index !== -1) {
				wrongPosition++;
				secretCodeCopy[index] = null;
			}
		}
	}

	return { goodPosition, wrongPosition };
}

export default Mastermind;

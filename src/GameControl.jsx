import { faCheck, faDeleteLeft, faRotateLeft, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GameControl = ({ currentAttempt, onSubmit, onPop, onRetry, onRandom, onAddColorToAttempt, colors, status }) => {
	return (
		<div className="game-control">
			<div className="color-palette">
				{colors.map((color, indexColor) => {
					return (
						<button
							key={indexColor}
							className={`circle bg-${color}`}
							disabled={status !== "playing"}
							onClick={() => onAddColorToAttempt(color)}
						></button>
					);
				})}
				<button className="circle button valid" disabled={currentAttempt.length < 4} onClick={onSubmit}>
					<FontAwesomeIcon icon={faCheck} />
				</button>
			</div>

			<div className="action-control">
				<div className="circle button" onClick={onRandom}>
					<FontAwesomeIcon icon={faShuffle} />
				</div>
				<div className="circle button" onClick={onPop}>
					<FontAwesomeIcon icon={faDeleteLeft} />
				</div>
				<div className="circle button" onClick={onRetry}>
					<FontAwesomeIcon icon={faRotateLeft} />
				</div>
			</div>
		</div>
	);
};

export default GameControl;

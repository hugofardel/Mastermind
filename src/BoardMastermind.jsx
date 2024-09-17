import EndingBlock from "./EndingBlock.jsx";

const BoardMastermind = ({ maxRounds, attempts, currentAttempt, currentRound, reponse, status }) => {
	function getClassColor(roundIndex, cellIndex) {
		let classColor = "empty";
		const attempt = attempts[roundIndex] || [];
		if (roundIndex === currentRound && currentAttempt[cellIndex]) {
			classColor = "bg-" + currentAttempt[cellIndex];
		} else if (attempt.colors?.[cellIndex]) {
			classColor = "bg-" + attempt.colors[cellIndex];
		}

		return classColor;
	}

	return (
		<div className="board">
			{Array.from({ length: maxRounds }).map((_, roundIndex) => {
				let goodPosition = attempts[roundIndex]?.goodPosition || 0;
				let wrongPosition = attempts[roundIndex]?.wrongPosition || 0;

				return (
					<div key={roundIndex} className="row">
						<div className="index-row">{roundIndex + 1}</div>
						{Array.from({ length: 4 }).map((_, cellIndex) => {
							const classColor = getClassColor(roundIndex, cellIndex);
							return <div key={cellIndex} className={`cell ${classColor}`}></div>;
						})}

						<div className="indicators">
							{Array.from({ length: 4 }).map((att, indexAtt) => {
								let colorInd = "";
								if (goodPosition > 0) {
									goodPosition--;
									colorInd = "good-position";
								} else if (wrongPosition > 0) {
									wrongPosition--;
									colorInd = "wrong-position";
								}
								return <div key={indexAtt} className={`indicator ${colorInd}`}></div>;
							})}
						</div>
					</div>
				);
			})}

			<EndingBlock status={status} reponse={reponse} currentRound={currentRound} maxRounds={maxRounds} />
		</div>
	);
};

export default BoardMastermind;

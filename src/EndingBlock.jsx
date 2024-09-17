const EndingBlock = ({ status, reponse, currentRound, maxRounds }) => {
	if (status !== "playing") {
		return (
			<>
				<div className="row reponse">
					<div className="index-row">R.</div>
					{reponse.map((_, cellIndex) => {
						return <div key={cellIndex} className={`cell bg-${reponse[cellIndex]}`}></div>;
					})}

					<div className="indicators">
						{Array.from({ length: 4 }).map((att, indexAtt) => {
							return <div key={indexAtt} className="indicator good-position"></div>;
						})}
					</div>
				</div>
				{status === "victory" && (
					<div className="result">
						Bien joué ! 👌 <br />
						Vous avez trouvé le bon résultat en {currentRound} / {maxRounds} tentatives
					</div>
				)}
				{status === "defeat" && (
					<div className="result">
						Dommage ! 😢 <br />
						Vous ferez mieux la prochaine fois.
					</div>
				)}
			</>
		);
	} else {
		return null;
	}
};

export default EndingBlock;

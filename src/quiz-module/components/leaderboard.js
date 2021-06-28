import React from "react";
import fire from "./firebase";

class QuizLeaderboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = { scores: [] };
	}

	componentDidMount() {
		this.getLeaderboard();
	}

	/**
	 * Gets data from database and set state of scores
	 * @param {array} scores array with all data of persons who did the quiz
	 */
	getLeaderboard() {
		let scores = [];
		fire
			.database()
			.ref("scores")
			.limitToLast(10)
			.orderByChild("totalTime")
			.on("value", (snapshot) => {
				snapshot.forEach((snap) => {
					scores.push(snap.val());
				});
				this.setState({ scores });
			});
	}

	render() {
		let i = 1;
		const { quizDetails } = this.props;
		const { scores } = this.state;
		return (
			<div>
				<div className='quiz__personName'>
					<h2>👋 Hi, {quizDetails.name}</h2>
				</div>
				<div className='quiz__leaderboard'>
					<h1>Leaderboard</h1>
					<div className='quiz__leaderboard__align'>
						{scores
							.sort((scoreA, scoreB) => scoreB.score - scoreA.score)
							.map((quizdata) => {
								return (
									<div className='quiz__leaderboard__align__data' style={{ border: quizdata.name === quizDetails.name && quizdata.score === quizDetails.score && quizdata.totalTime === quizDetails.totalTime ? "4px solid #5849df" : null }}>
										<p className='quiz__leaderboard__align__data__number'>{i++}</p>
										<p>{quizdata.name}</p>

										<div className='quiz__leaderboard__align__data__score'>
											Score: {quizdata.score}/ Totale tijd: {((quizdata.totalTime % 60000) / 1000).toFixed(1)} Seconden
										</div>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		);
	}
}
export default QuizLeaderboard;

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

	getLeaderboard() {
		let scores = [];
		fire
			.database()
			.ref("scores")
			.limitToLast(10)
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
				<div className='quiz__personName'>👋 Hi, {quizDetails.name}</div>
				<div className='quiz__leaderboard'>
					<h1>Leaderboard</h1>
					<div className='quiz__leaderboard__align'>
						{scores
							.sort((a, b) => b.score - a.score)
							.map((a) => {
								return (
									<div className='quiz__leaderboard__align__data' style={{ border: a.name === quizDetails.name ? "4px solid #5849df" : null }}>
										<p className='quiz__leaderboard__align__data__number'>{i++}</p>
										<p>{a.name}</p>
										<div className='quiz__leaderboard__align__data__score'>Score: {a.score}</div>
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

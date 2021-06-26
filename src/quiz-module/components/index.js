import React from "react";
import QuizQuestion from "./quizquestion";
import QuizOverview from "./quizoverview";
import QuizLeaderboard from "./leaderboard";
import fire from "./firebase";
import "../styles/quiz.scss";

class QuizModule extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			quizDetails: {
				name: "",
				nameVerification: false,
				score: 0,
				quizQuestion: [],
				currentQuestion: 1,
			},
			currentQuestion: 1,
			process: "namevalidation",
		};
		this.handleNameSubmit = this.handleNameSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleCurrentQuestion = this.handleCurrentQuestion.bind(this);
		this.saveQuizDetails = this.saveQuizDetails.bind(this);
		this.handleProcess = this.handleProcess.bind(this);
	}

	handleChange(event) {
		this.setState({
			quizDetails: {
				...this.state.quizDetails,
				name: event.target.value,
			},
		});
	}

	handleNameSubmit() {
		this.setState({
			process: "questions",
		});
		window.scrollTo(0, 0);
	}

	saveQuizDetails(quizQuestion) {
		this.setState({
			quizDetails: {
				...this.state.quizDetails,
				quizQuestion: [...this.state.quizDetails.quizQuestion, quizQuestion],
			},
		});
	}

	handleCurrentQuestion(currentQuestion, score, lastquestion) {
		if (lastquestion) {
			this.setState({ process: "questionoverview" });
		}
		this.setState({
			currentQuestion,
			quizDetails: {
				...this.state.quizDetails,
				score,
			},
		});
	}

	handleProcess() {
		const { quizDetails } = this.state;
		this.setState({
			process: "leaderboard",
		});
		fire.database().ref("scores").push(quizDetails);
	}

	render() {
		const { quizDetails, currentQuestion, process } = this.state;
		return (
			<div className='quiz'>
				{process === "namevalidation" && (
					<div>
						<h1 className='quiz__title'>Quizino</h1>
						<div className='quiz__nameForm'>
							<div className='quiz__nameForm__align'>
								<h2>Vul hier je naam in:</h2>
								<input className='quiz__nameForm__align__input' type='text' value={quizDetails.name} placeholder='Naam' onChange={this.handleChange} />
								<button onClick={this.handleNameSubmit}>
									<h2 className='quiz__nameForm__align__input__submit'>Start de quiz!</h2>
								</button>
							</div>
						</div>
					</div>
				)}
				{process === "questions" && <QuizQuestion currentQuestion={currentQuestion} quizDetails={quizDetails} saveQuizDetails={this.saveQuizDetails} handleCurrentQuestion={this.handleCurrentQuestion} />}
				{process === "questionoverview" && <QuizOverview quizDetails={quizDetails} handleProcess={this.handleProcess} />}
				{process === "leaderboard" && <QuizLeaderboard quizDetails={quizDetails} />}
			</div>
		);
	}
}

export default QuizModule;

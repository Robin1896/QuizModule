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
				startTime: "",
				endTime: "",
				totalTime: "",
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

	/**
	 * sets the name of the person doing the quiz
	 * @param {string} event name of person filling in the quiz
	 */
	handleChange(event) {
		this.setState({
			quizDetails: {
				...this.state.quizDetails,
				name: event.target.value,
			},
		});
	}

	/**
	 * Starts and sets timer at first question
	 * @param {number} startTime time in seconds
	 */
	startTimer() {
		var startTime = new Date().getTime();
		this.setState({
			quizDetails: {
				...this.state.quizDetails,
				startTime,
			},
		});
	}

	/**
	 * Ends and sets timer at last question
	 * @param {number} endTime time in seconds
	 * @param {object} quizDetails object with quiz details e.q. name, score , etc.
	 * @param {number} totalTime time in seconds
	 */
	endTimer() {
		const { quizDetails } = this.state;
		var endTime = new Date().getTime();
		var totalTime = endTime - quizDetails.startTime;
		this.setState({
			quizDetails: {
				...this.state.quizDetails,
				endTime,
				totalTime,
			},
		});
	}

	/**
	 * Set process scroll to top and execute Startimer()
	 */
	handleNameSubmit() {
		this.setState({
			process: "questions",
		});
		window.scrollTo(0, 0);
		this.startTimer();
	}

	/**
	 * Save Quizdetails every question
	 * @param {array} quizQuestion array that consists off quistionId, correct, and the answer
	 */
	saveQuizDetails(quizQuestion) {
		this.setState({
			quizDetails: {
				...this.state.quizDetails,
				quizQuestion: [...this.state.quizDetails.quizQuestion, quizQuestion],
			},
		});
	}

	/**
	 * Handles the current question and sets the score of that question
	 * @param {number} currentQuestion id of current question
	 * @param {number} score if correct scoreincrement +1
	 * @param {booalean} lastquestion Checks if this is the last question
	 */
	handleCurrentQuestion(currentQuestion, score, lastquestion) {
		if (lastquestion) {
			this.setState({ process: "questionoverview" });
			this.endTimer();
		}
		this.setState({
			currentQuestion,
			quizDetails: {
				...this.state.quizDetails,
				score,
			},
		});
	}

	/**
	 * If function is called push everything to database
	 */
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
								<form onSubmit={this.handleNameSubmit}>
									<input className='quiz__nameForm__align__input' type='text' value={quizDetails.name} placeholder='Naam' onChange={this.handleChange} required />
									<button>
										<h2 className='quiz__nameForm__align__input__submit'>Start de quiz!</h2>
									</button>
								</form>
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

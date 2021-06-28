import React from "react";
import questions from "./questions.json";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";

class QuizQuestion extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			color: {
				correctColor: { backgroundColor: "" },
				incorrectColor: { backgroundColor: "" },
			},

			icon: false,
			executed: false,
		};
		this.handleQuestion = this.handleQuestion.bind(this);
	}

	/**
	 * After question is answered color button green or red with icon, then timeout for 1 second then next question
	 * @param {string} answer answer given by user
	 * @param {string} correctAnswer the correct answer
	 * @param {number} question questionId
	 * @param {boolean} executed if button is clicked, you cant press another time
	 */
	handleQuestion(answer, correctAnswer, question) {
		const { executed } = this.state;
		if (!executed) {
			let scoreIncrement, correct;
			var numberOfQuestions = questions.length;
			var correctColor = { backgroundColor: "green" };
			var incorrectColor = { backgroundColor: "red" };
			const { handleCurrentQuestion, currentQuestion, quizDetails, saveQuizDetails } = this.props;

			this.setState({
				executed: true,
				icon: true,
				color: {
					...this.state.quizDetails,
					correctColor,
					incorrectColor,
				},
			});

			if (answer === correctAnswer) {
				scoreIncrement = 1;
				correct = true;
			} else {
				scoreIncrement = 0;
				correct = false;
			}

			setTimeout(
				function () {
					saveQuizDetails({ questionId: currentQuestion, answer, correct, question });
					handleCurrentQuestion(currentQuestion + 1, quizDetails.score + scoreIncrement, numberOfQuestions === currentQuestion);

					this.setState({
						icon: false,
						color: {
							...this.state.quizDetails,
							correctColor: { backgroundColor: "" },
							incorrectColor: { backgroundColor: "" },
						},
						executed: false,
					});
				}.bind(this),
				1000
			);
		}
	}

	/**
	 * Loads the correct question and keeps track on the current question, gets questions from json file
	 * @param {number} currentQuestion current question
	 * @param {object} color the correct answer
	 * @param {boolean} icon questionId
	 */
	renderQuestion() {
		const { currentQuestion } = this.props;
		const { color, icon } = this.state;

		let questiondata = questions.filter((questiondata) => {
			return questiondata.questionNumber === currentQuestion;
		});

		const renderQuestion = questiondata?.map((questionData) => (
			<div className='quiz__question'>
				<div className='quiz__question__align'>
					<div className='quiz__question__align__counter'>
						Vraag {currentQuestion}/{questions.length}
					</div>
					<h1>{questionData.question}</h1>
					<div>
						{questionData.answersAll.map(function (data) {
							return (
								<div>
									<button className='quiz__question__align__button' style={data === questionData.correctAnswer ? color.correctColor : color.incorrectColor} key={data} onClick={() => this.handleQuestion(data, questionData.correctAnswer, questionData.question)}>
										<div className='quiz__question__align__button__answer'>
											<h2>{data}</h2>
										</div>
										<div className='quiz__question__align__button__icon'>{icon && <div>{data === questionData.correctAnswer ? <DoneIcon></DoneIcon> : <CloseIcon></CloseIcon>}</div>}</div>
									</button>
								</div>
							);
						}, this)}
					</div>
				</div>
			</div>
		));
		return renderQuestion;
	}

	render() {
		<p>selected language: {this.state.selectedLanguage}</p>;
		const { quizDetails } = this.props;
		return (
			<div>
				<div className='quiz__personName'>
					<h2>👋 Hi, {quizDetails.name}</h2>
				</div>
				{this.renderQuestion()}
			</div>
		);
	}
}
export default QuizQuestion;

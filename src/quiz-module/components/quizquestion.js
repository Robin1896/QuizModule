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
		};
		this.handleQuestion = this.handleQuestion.bind(this);
	}

	handleQuestion(answer, correctAnswer, question) {
		let scoreIncrement, correct;
		var numberOfQuestions = questions.length;
		var correctColor = { backgroundColor: "green" };
		var incorrectColor = { backgroundColor: "red" };
		const { handleCurrentQuestion, currentQuestion, quizDetails, saveQuizDetails } = this.props;

		this.setState({
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
				});
			}.bind(this),
			50
		);
	}

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
										<div className='quiz__question__align__button__answer'>{data}</div>
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
				<div className='quiz__personName'>👋 Hi, {quizDetails.name}</div>
				{this.renderQuestion()}
			</div>
		);
	}
}
export default QuizQuestion;

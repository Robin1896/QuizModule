import React from "react";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";

class QuizOverview extends React.Component {
	renderOverwiew() {
		const { quizDetails } = this.props;
		const renderQuestion = quizDetails.quizQuestion?.map((quizQuestion) => (
			<div className='quiz__overview__align__scores__data'>
				<h1>{quizQuestion.question}</h1>
				<div className='quiz__overview__align__scores__data__answer'>
					<div className='quiz__overview__align__scores__data__answer__icon'>{quizQuestion.correct ? <DoneIcon></DoneIcon> : <CloseIcon></CloseIcon>}</div>
					<h3>{quizQuestion.answer}</h3>
				</div>
			</div>
		));
		return renderQuestion;
	}

	render() {
		const { handleProcess, quizDetails } = this.props;
		return (
			<div>
				<div className='quiz__personName'>👋 Hi, {quizDetails.name}</div>
				<div className='quiz__overview'>
					<div className='quiz__overview__align'>
						<div className='quiz__overview__align__scores'>{this.renderOverwiew()}</div>
						<button onClick={() => handleProcess()} className='quiz__overview__align__button'>
							<h2>Naar leaderboard</h2>
						</button>
					</div>
				</div>
			</div>
		);
	}
}
export default QuizOverview;

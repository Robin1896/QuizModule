import React from "react";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";

class QuizOverview extends React.Component {
	renderOverwiew() {
		const { quizDetails } = this.props;
		const renderQuestion = quizDetails.quizQuestion?.map((quizQuestion) => (
			<div className='quiz__overview__align__scores__data'>
				<h3>{quizQuestion.question}</h3>
				<div className='quiz__overview__align__scores__data__answer'>
					<div className='quiz__overview__align__scores__data__answer__icon'>{quizQuestion.correct ? <DoneIcon></DoneIcon> : <CloseIcon></CloseIcon>}</div>
					<h4>{quizQuestion.answer}</h4>
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
							<h3>Naar leaderboard</h3>
						</button>
					</div>
				</div>
			</div>
		);
	}
}
export default QuizOverview;

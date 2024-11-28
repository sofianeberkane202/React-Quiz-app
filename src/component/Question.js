export function Question({ question , dispatch,answerChoosen }) {
  return (
    <>
      <h3>{question.question}</h3>

      <div className="options">
        {question.options.map((answer, i) => 
        <Answer
          key={`Answer${i}`}
          answer={answer} 
          dispatch={dispatch}
          id={i}
          answerChoosen={answerChoosen}
          decesion={question.correctOption === i}
          />)}

      </div>
    </>
  );
}
function Answer({ id,answer ,dispatch,answerChoosen,decesion}) {
  
  return (
    <button 
    className= {`btn btn-option ${answerChoosen===id ? 'answer' : ''}
                ${answerChoosen>=0 ? decesion ? 'correct' : 'wrong': ''}`}
    onClick={() => dispatch({type: "answers" , answer: id})}
    disabled= {answerChoosen>= 0}
    >
      {answer}
    </button>
  );
}

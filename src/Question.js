export function Question({ question }) {
  return (
    <>
      <h3>{question.question}</h3>

      <div className="options">
        {question.options.map((answer, i) => <Answer
          key={`Answer${i}`}
          answer={answer} />)}
      </div>
    </>
  );
}
function Answer({ answer }) {
  return (
    <button className="btn  btn-option">{answer}</button>
  );
}

export function ProgressBar({ points, numQuestions, currentQuestion, pointsEarn }) {
  const totalPoints = points.reduce((acc, point) => acc + point, 0);
  return (
    <>
      <progress value={currentQuestion} max={numQuestions} />
      <div className="progress">
        <p>Question {currentQuestion} / {numQuestions}</p>
        <p>Points {pointsEarn} / {totalPoints}</p>
      </div>
    </>
  );
}

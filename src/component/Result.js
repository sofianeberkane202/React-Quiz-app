export function Result({ pointsEarned, points }) {
  const totalPoints = points.reduce((acc, point) => acc + point, 0);
  const percentage = Math.ceil(pointsEarned * 100 / totalPoints);
  return (
    <p className="result">{`You scored (${percentage}%)`} </p>
  );
}

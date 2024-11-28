export function Header() {
  return (
    <div className="app-header">
      <img src={`${process.env.PUBLIC_URL}/logo512.png`} alt="logo" />
      <h1>the react quiz</h1>
    </div>
  );
}

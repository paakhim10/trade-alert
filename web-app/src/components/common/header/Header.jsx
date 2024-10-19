import "./Header.css";

const Header = (props) => {
  return (
    <header className="header-container">
      <h1>{props.heading}</h1>
    </header>
  );
};

export default Header;

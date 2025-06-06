import "../../styles/navbar.scss";

import ThemeToggle from "./theme-toggle";
import UserInfo from "./user-info";
const Navbar = () => {
  return (
    <nav className="navbar-main">
      <div className="navbar-left">
        <UserInfo />
      </div>
      <div className=""></div>
      <div className="navbar-right">
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;

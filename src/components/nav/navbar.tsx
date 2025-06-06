import "../../styles/navbar.scss";
import GithubIcon from "url:../../assets/icons/github_2.svg";

import ThemeToggle from "./theme-toggle";
import UserInfo from "./user-info";
const Navbar = () => {
  return (
    <nav className="navbar-main">
      <div className="navbar-left">
        <UserInfo />
      </div>
      <div className="navbar-middle">
        <a
          href="https://github.com/ryanglug/flask-jenkins-front"
          target="_blank"
        >
          <img src={GithubIcon} alt="Github" />
        </a>
      </div>
      <div className="navbar-right">
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;

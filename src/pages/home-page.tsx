import CommentsForm from "../components/comments-form";
import CommentsList from "../components/comments-list";
import UserForm from "../components/user-form";
import { useAuth } from "../contexts/auth-context";
import "../styles/home-page.scss";

const HomePage = () => {
  const { userInfo } = useAuth();

  const isLoggedIn = !!userInfo;

  return (
    <main>
      <h1 style={{ textAlign: "center" }}>Query Flask API</h1>
      {!isLoggedIn && (
        <div className="forms-grid">
          <div className="user-form-container">
            <h2>Login</h2>
            <UserForm />
          </div>
          <div className="user-form-container">
            <h2>Register</h2>
            <UserForm isLogin={false} />
          </div>
        </div>
      )}
      {isLoggedIn && (
        <>
          <div className="comments-container">
            <h2>Your comments</h2>
            <CommentsList />
          </div>
          <div className="comments-create-form">
            <h2>Create a comment</h2>
            <CommentsForm />
          </div>
        </>
      )}
    </main>
  );
};

export default HomePage;

import { useAuth } from "../../contexts/auth-context";

const UserInfo = () => {
  const { userInfo } = useAuth();

  return <>{userInfo && <p>Hello {userInfo.username}</p>}</>;
};

export default UserInfo;

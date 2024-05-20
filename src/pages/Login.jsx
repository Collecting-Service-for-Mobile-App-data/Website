// LoginPage.jsx
// This component handles the user login functionality and displays the login form.
import { useNavigate } from "react-router-dom";
import { useAuthSelector } from "../auth/Auth";
import MuiLoginform from "../components/forms/login-form";

/**
 * LoginPage component
 * Manages the login process and renders the login form.
 */
function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuthSelector();


  
  /**
   * Handles the login action, attempting to authenticate the user.
   * @param {Object} param0 - The email and password of the user.
   */
  const loginAction = async ({ email, password }) => {
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  return <MuiLoginform loginAction={loginAction} />;
}
export default LoginPage;

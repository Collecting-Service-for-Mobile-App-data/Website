// Import `useNavigate` from 'react-router-dom' for programmatically navigating between routes.
import { useNavigate } from "react-router-dom";
// Import the `useAuthSelector` custom hook from the "../auth/Auth" path to access authentication functionalities.
import { useAuthSelector } from "../auth/Auth";

// Import the `MuiLoginform` component from "../components/forms/login-form" to display the login form.
import MuiLoginform from "../components/forms/login-form";

// Define the `LoginPage` functional component.
function LoginPage() {
  // `useNavigate` hook is used to programmatically navigate to different routes.
  const navigate = useNavigate();
  // Destructure the `login` function from the authentication context provided by `useAuthSelector`.
  const { login } = useAuthSelector();


  
  // Define the `loginAction` function, which will be passed to the `MuiLoginform` component.
  // This function is asynchronous because it awaits the completion of the login process.
  const loginAction = async ({ email, password }) => {
    try {
      // Attempt to log in with the provided email and password.
      // If successful, navigate to the home page ("/").
      await login(email, password);
      navigate("/");
    } catch (error) {
      // If an error occurs (e.g., incorrect credentials), display an alert with the error message
      // and log the error to the console.
      alert(error);
      console.error(error);
    }
  };


  // Render the `MuiLoginform` component, passing the `loginAction` as a prop.
  // This allows the form to execute the `loginAction` function upon form submission.
  return <MuiLoginform loginAction={loginAction} />;
}

// Export the `LoginPage` component as the default export of this module,
// making it available for import and use in other parts of the application.
export default LoginPage;

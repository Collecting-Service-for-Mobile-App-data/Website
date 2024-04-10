// Imports from Material-UI and icons for UI components and styles
import { FormControl } from "@mui/base/FormControl";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"; // Import from react-hook-form for form handling
import  { useState } from "react";
import { useAuthSelector } from "../../auth/Auth";

// Definition of the MuiLoginForm component with `loginAction` as its prop
// eslint-disable-next-line react/prop-types
function MuiLoginform() {

  const form = useForm({
   defaultValues: {
      email: "",
     password: "",
    },
 });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const [backendError, setBackendError] = useState('');
  const navigate = useNavigate();

  const { login } = useAuthSelector(); // Use the login function from the context

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password); // Call the login function from the AuthProvider
      setBackendError(''); // Reset any backend errors on successful login
      navigate('/customer'); // Redirect or perform any post-login actions here
    } catch (error) {
      console.error('Login request failed:', error);
      setBackendError(error.message || 'An error occurred during login.');
    }
  };

   // Component return statement, defining the JSX structure of the login form
  return (
    <div className="flex flex-col justify-center items-center min-h-[85vh]">
     {/* Styling for the form container */}
      <div className="bg-[#DDDDDD] me-[25px] w-[280px] md:w-[400px] h-[500px] md:h-[530px] relative rounded-lg p-10 after:block after:content-[''] after:rounded-lg after:bg-[#F88601] after:z-[-1] after:top-[-20px] after:bottom-[20px] after:left-[25px] after:right-[-25px] after:absolute">
        <h1 className="text-center font-semibold text-4xl mb-10">Login</h1>
        <div className="">
          {/* Form submission handling using `handleSubmit` from react-hook-form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Container for form fields with styling */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "40px",
                width: "100%",
                maxWidth: "350px",
              }}
            >
              {/* Helper text indicating credentials requirement */}
              {/* Email input field with validation and styling */}
              <FormControl required>
                <TextField
                  autoComplete="off"
                  className="w-full"
                  label="Email"
                  type="email"
                  placeholder="Type your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/i,
                      message: "email is not valid",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineOutlinedIcon className="text-black" />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  InputLabelProps={{
                    classes: {
                      focused: "custom-focused",
                    },
                    style: {
                      color: "black",
                      fontWeight: "600",
                      fontSize: "18px",
                    },
                  }}
                />
              </FormControl>

              {/* Password input field with validation and styling */}
              <FormControl required>
                <TextField
                  className="w-full"
                  id="password-input"
                  label="Password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must have at least 6 characters",
                    },
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  placeholder="Type your password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon className="text-black" />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  InputLabelProps={{
                    classes: {
                      focused: "custom-focused",
                    },
                    style: {
                      color: "black",
                      fontWeight: "600",
                      fontSize: "18px",
                    },
                  }}
                />
              </FormControl>
            </Box>
            {/* Link for "Forgot Password?" functionality */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                color: "black",
                textDecoration: "none",
                margin: "10px",
              }}
            >
              <Link href="#" variant="body2" underline="none" color="black">
                Forgot Password?
              </Link>
            </Box>
              {/* Display backend error message if present */}
              {backendError && <div style={{ color: 'red', marginBottom: '10px' }}>{backendError}</div>}
            {/* Login button with styling */}
            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 3,
                backgroundColor: "#F88601",
                color: "black",
                fontWeight: "400",
                fontSize: "20px",
                ":hover": {
                  backgroundColor: "#F88601",
                },
              }}
              variant="contained"
            >
              LOGIN
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}


// Exporting the component for use in other parts of the application
export default MuiLoginform;

// Import statements for MUI components and hooks
import { FormControl } from "@mui/base/FormControl";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { useForm } from "react-hook-form"; // Hook for form handling
import { FormHelperText } from "@mui/material";


// The MuiLoginform component, taking a loginAction prop for handling form submission
function MuiLoginform({ loginAction }) {
    // Initialize form handling with default values using the useForm hook
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Destructuring necessary methods and objects from useForm
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  // Function to handle form submission, calls the loginAction prop with form data
  const onSubmit = (data) => {
    loginAction(data);
  };

  // The component's return statement, rendering the login form UI
  return (
    <div className="flex flex-col justify-center items-center min-h-[85vh]">
      <div className="bg-[#DDDDDD] me-[25px] w-[280px] md:w-[400px] h-[500px] md:h-[530px] relative rounded-lg p-10 after:block after:content-[''] after:rounded-lg after:bg-[#F88601] after:z-[-1] after:top-[-20px] after:bottom-[20px] after:left-[25px] after:right-[-25px] after:absolute">
        <h1 className="text-center font-semibold text-4xl mb-10">Login</h1>
        <div className="">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "40px",
                width: "100%",
                maxWidth: "350px",
              }}
            >
              {/* Email input field with validation */}
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

              {/* Password input field with validation */}
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

            {/* Link for "Forgot Password?" */}
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

            {/* Login button */}
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

export default MuiLoginform;

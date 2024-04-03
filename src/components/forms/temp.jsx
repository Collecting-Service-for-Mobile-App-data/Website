import  { useState } from 'react';
import Box from "@mui/material/Box";
import {FormHelperText} from "@mui/material";
import {FormControl} from "@mui/base/FormControl";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined.js";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined.js";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button"; // Import useState for handling state
// Other imports remain the same

function MuiLoginForm({ loginAction }) {
    // Initialization of form handling hooks from react-hook-form
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;

    // State for handling error messages from the backend
    const [backendError, setBackendError] = useState('');

    // Function to handle form submission
    const onSubmit = async (data) => {
        const loginEndpoint = "/api/user/authenticate"; // Your API endpoint
        try {
            const response = await fetch(loginEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const responseBody = await response.json();
                // Call your login action or manage the application state as needed
                loginAction(responseBody.jwt);
                // Reset backend error if login is successful
                setBackendError('');
            } else {
                const errorResponse = await response.json();
                // Set the backend error state to the error message
                setBackendError(errorResponse);
            }
        } catch (error) {
            console.error('Login request failed:', error);
            setBackendError('An error occurred during login.');
        }
    };

    // Component return statement
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
                            <FormHelperText>
                                Bruk passordet : &quot;test123&quot;
                            </FormHelperText>
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

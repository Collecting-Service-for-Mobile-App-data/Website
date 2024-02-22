import React from "react";
import { FormControl } from "@mui/base/FormControl";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { useForm } from "react-hook-form";

function Form() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  return (
    <div className="flex md:justify-center lg:justify-center items-center justify-normal responsiveness">
      <div className="relative flex flex-col items-center m-10 md:m-0">
        <div className="bg-[#F88601] w-[240px] md:w-[430px] h-[500px] md:h-[520px] rounded-lg mb-4 md:mb-0"></div>
        <div className="bg-[#DDDDDD] w-[280px] md:w-[440px] h-[500px] md:h-[530px] rounded-lg p-10 absolute md:top-7 md:right-7 top-5 right-5">
          <h1 className="text-center font-semibold text-4xl mb-10">Login</h1>
          <div className="">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "40px",
                  width: "100%",
                  maxWidth: "350px", // Limit maximum width of form fields
                }}
              >
                <FormControl required>
                  <TextField
                    className="w-full"
                    id="email-input"
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
    </div>
  );
}

export default Form;

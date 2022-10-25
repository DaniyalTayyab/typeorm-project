import { useState, useEffect } from "react";
import { Box, TextField, Button, Stack } from "@mui/material";

import image from "../../assets/success.png";
import { flexbox } from "@mui/system";

interface formFieldsTypes {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const defaultFormFields: formFieldsTypes = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const textFieldStyles = {
  margin: "10px 0",
};

const imageStyle = {
  width: "200px",
  margin: "0 auto",
};

const SignUpForm = () => {
  const [formFileds, setFormFields] =
    useState<formFieldsTypes>(defaultFormFields);
  const { userName, email, password, confirmPassword } = formFileds;

  const [selfie, setSelfie] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormFields({ ...formFileds, [name]: value });
  };

  const resetFormFileds = () => {
    setFormFields(defaultFormFields);
    setSelfie([]);
  };

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    console.log(formFileds);
    console.log(imageUrl);
    alert("Form submitted open console to check the values ");
    resetFormFileds();
  };

  const handleSelfieUpload = (event: any) => {
    setSelfie(event.currentTarget.files);
  };

  useEffect(() => {
    if (!selfie.length || selfie.length > 1) return;
    console.log(selfie);
    const newImageUrl: any = [];

    Array.from(selfie).forEach((file) =>
      newImageUrl.push(URL.createObjectURL(file))
    );
    setImageUrl(newImageUrl);
  }, [selfie]);

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleFormSubmit}
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          style={{
            width: "300px",
          }}
        >
          <TextField
            label="User Name"
            variant="outlined"
            required
            name="userName"
            value={userName}
            onChange={handleInputChange}
            style={textFieldStyles}
          />
          <TextField
            label="Email"
            variant="outlined"
            required
            name="email"
            value={email}
            onChange={handleInputChange}
            style={textFieldStyles}
          />
          <TextField
            label="Password"
            variant="outlined"
            required
            name="password"
            value={password}
            onChange={handleInputChange}
            style={textFieldStyles}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            required
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleInputChange}
            style={textFieldStyles}
          />

          {/* <input type="file" multiple accept="image/*" /> */}
          <Button variant="contained" component="label">
            Upload File{" "}
            <input
              type="file"
              multiple
              accept="image/*"
              hidden
              onChange={handleSelfieUpload}
            />
          </Button>
          {imageUrl.length ? (
            imageUrl.map((image) => (
              <img src={image} alt="image" style={imageStyle} />
            ))
          ) : (
            <img src={image} alt="image" style={imageStyle} />
          )}

          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default SignUpForm;

import { Alert, Box, Button, TextField } from "@mui/material";
import Input from "../Input/Input";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is Required"),
    password: Yup.string()
      .matches("^[A-Z][a-z0-9]{4,8}$", "pattern is not valid")
      .required("password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: login,
  });

  async function login(value){
    try{
      const {data} = await axios.post(`http://localhost:4200/api/v1/login` , value)
      if(data?.status == 401){
        alert(data.message)
      }else{
        navigate("/");
      }
    } 
    catch(err){
      console.log(err);
    }
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{ width: "50%", margin: "100px auto" }}
    >
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          fullWidth
          id="outlined-basic2"
          label="Email"
          name="email"
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          sx={{ marginBottom: "10px" }}
          variant="outlined"
        />
        {formik.touched.email && formik.errors.email ? <Alert sx={{marginBottom: "10px"}} severity="error">
            {formik.errors.email}
        </Alert> : ""}
        <TextField
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          name="password"
          fullWidth
          id="outlined-basic3"
          type="password"
          label="Password"
          sx={{ marginBottom: "10px" }}
          variant="outlined"
        />
        {formik.touched.password && formik.errors.password ? <Alert sx={{marginBottom: "10px"}} severity="error">
            {formik.errors.password}
        </Alert> : ""}
      </Box>
      <Button fullWidth sx={{ padding: "10px" }} variant="contained">
        Login
      </Button>
    </form>
  );
}

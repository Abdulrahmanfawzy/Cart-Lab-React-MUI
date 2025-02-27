import { Alert, Box, Button, TextField } from "@mui/material";
import Input from "../Input/Input";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function Signup() {

    const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "min length is 3 characters")
      .max(10, "max length is 15 character")
      .required("Username is required"),
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is Required"),
    password: Yup.string()
      .matches("^[A-Z][a-z0-9]{4,8}$", "pattern is not valid")
      .required("password is required"),
    cPassword: Yup.string()
      .oneOf([Yup.ref("password")])
      .required("confirm password is required"),
    phone: Yup.string().required("phone is required *"),
  });

  const initialValues = {
    username: "",
    email: "",
    password: "",
    cPassword: "",
    phone: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: signUp,
  });

  async function signUp(value){
    try{
      const {data} = await axios.post(`http://localhost:4200/api/v1/signup` , value)
      if(data?.status == 401){
        alert(data.message)
      }else{
        navigate("/login");
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
      <h2 style={{ textAlign: "center" }}>Signup</h2>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          name="username"
          value={formik.values.username}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          fullWidth
          id="outlined-basic"
          label="Username"
          sx={{ marginBottom: "10px" }}
          variant="outlined"
        />
        {formik.touched.username && formik.errors.username ? <Alert sx={{marginBottom: "10px"}} severity="error">
            {formik.errors.username}
        </Alert> : ""}
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
        <TextField
          value={formik.values.cPassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          name="cPassword"
          fullWidth
          id="outlined-basic3"
          type="password"
          label="Repassword"
          sx={{ marginBottom: "10px" }}
          variant="outlined"
        />
        {formik.touched.cPassword && formik.errors.cPassword ? <Alert sx={{marginBottom: "10px"}} severity="error">
            {formik.errors.cPassword}
        </Alert> : ""}
        <TextField
          value={formik.values.phone}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          name="phone"
          fullWidth
          id="outlined-basic3"
          label="phone"
          sx={{ marginBottom: "10px" }}
          variant="outlined"
        />
        {formik.touched.phone && formik.errors.phone ? <Alert sx={{marginBottom: "10px"}} severity="error">
            {formik.errors.phone}
        </Alert> : ""}
      </Box>
      <Button fullWidth sx={{ padding: "10px" }} variant="contained">
        Signup
      </Button>
    </form>
  );
}

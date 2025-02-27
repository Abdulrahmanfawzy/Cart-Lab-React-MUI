import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Input() {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
    >
      <TextField fullWidth id="outlined-basic" label="Username" sx={{marginBottom: "10px"}} variant="outlined" />
      <TextField fullWidth id="outlined-basic2" label="Email" sx={{marginBottom: "10px"}} variant="outlined" />
      <TextField fullWidth id="outlined-basic3" type="password" label="Password" sx={{marginBottom: "10px"}} variant="outlined" />
      <TextField fullWidth id="outlined-basic3" type="password" label="Repassword" sx={{marginBottom: "10px"}} variant="outlined" />
      <TextField fullWidth id="outlined-basic3" label="phone" sx={{marginBottom: "10px"}} variant="outlined" />
    </Box>
  );
}

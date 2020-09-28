import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextInput from 'components/TextInput';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CustomButton from 'components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { doRegister, resetSignUpInput, setCurrentSignUpInput } from './AuthSlice';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const dispatch = useDispatch()

  const {
    currentSignUpInput,
  } = useSelector((state: RootState) => state.auth)

  const { name, username, userType, password } = currentSignUpInput

  const handleChange = (e: any) => dispatch(setCurrentSignUpInput({
    ...currentSignUpInput,
    [e.target.name]: e.target.value
  }))

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    dispatch(doRegister(
      name,
      username,
      userType,
      password,
      () => dispatch(resetSignUpInput())
    ))
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <TextInput
                variant="outlined"
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                onChange={handleChange}
                value={name}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextInput
                required
                variant="outlined"
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
                onChange={handleChange}
                value={username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextInput
                required
                variant="outlined"
                fullWidth
                id="userType"
                label="User Type"
                name="userType"
                autoComplete="user type"
                onChange={handleChange}
                value={userType}
              />
            </Grid>
            <Grid item xs={12}>
              <TextInput
                required
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                value={password}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <CustomButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </CustomButton>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signin">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
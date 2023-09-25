import jwt_decode from 'jwt-decode';
import { useState } from 'react';
import { Field } from 'formik';
import { Formik, ErrorMessage, Form } from 'formik';
import { Card, Checkbox, Grid, TextField } from '@mui/material';
import { Box, styled, useTheme } from '@mui/material';
import { Paragraph } from 'app/components/Typography';
import useAuth from 'app/hooks/useAuth';
import { LoadingButton } from '@mui/lab';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(JustifyBox)(() => ({
  height: '100%',
  padding: '32px',
  backgroundImage:
    'url("https://images.unsplash.com/photo-1693370268702-92402dd47484?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80")',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  background: 'rgba(0, 0, 0, 0.01)'
}));

const JWTRoot = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100% !important',
  '& .card': {
    maxWidth: 800,
    minHeight: 400,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center'
  }
}));

const initialValues = {
  email: 'admin@rahul.com',
  password: 'admin123',
  remember: true
};

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be 6 character length')
    .required('Password is required!'),
  email: Yup.string().email('Invalid Email address').required('Email is required!').lowercase()
});

const JwtLogin = () => {
  const theme = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'admin@rahul.com',
          password: 'admin123'
                })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const accessToken = data.accessToken;
      localStorage.setItem('token', accessToken);

      const decodedToken = jwt_decode(accessToken);
      if (+decodedToken.role === 1) {
        console.log('Redirecting to dashboard/default');
        navigate('/dashboard/default');
      } else if (+decodedToken.role === 2) {
        console.log('Redirecting to material/dialog');
        navigate('/material/dialog');
      }else{
        console.log('Unknown role:', decodedToken.role);
      }

      setLoading(false);
      
    } catch (error) {
      console.log(error);
      setLoading(false);
      
    }
  };

  return (
    <JWTRoot>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}></JustifyBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <ContentBox>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <Field
                      fullWidth
                      size="small"
                      type="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      component={TextField}
                      sx={{ mb: 3 }}
                    />

                    <Field
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      component={TextField}
                      sx={{ mb: 1.5 }}
                    />

                    <FlexBox justifyContent="space-between">
                      <FlexBox gap={1}>
                        <Field
                          type="checkbox"
                          name="remember"
                          as={Checkbox}
                          size="small"
                          sx={{ padding: 0 }}
                        />
                        <Paragraph>Remember Me</Paragraph>
                      </FlexBox>

                      <NavLink
                        to="/session/forgot-password"
                        style={{ color: theme.palette.primary.main }}
                      >
                        Forgot password?
                      </NavLink>
                    </FlexBox>

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ my: 2 }}
                      onClick={(value) => handleFormSubmit(value)}
                    >
                      Login
                    </LoadingButton>
                  </Form>
                )}
              </Formik>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </JWTRoot>
  );
};

export default JwtLogin;

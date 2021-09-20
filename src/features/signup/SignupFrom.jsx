import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { Form, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import signupSchema from './signupSchema';
import AuthContext from '../../contexts/AuthContext';
import routes from '../../API/routes';

const SignupFrom = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();
  const { logIn } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupSchema,
    validateOnChange: true,
    onSubmit: async (userInfo, { setSubmitting, setErrors, resetForm }) => {
      setSubmitting(true);
      try {
        const signupUrl = routes.signupPath();
        const { data } = await axios.post(
          signupUrl,
          userInfo,
        );
        logIn(data);
        resetForm();
        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
        setSubmitting(false);
      } catch (exception) {
        if (exception.isAxiosError && exception.response.status === 409) {
          setErrors({ authFailed: true });
        }
        const { from } = location.state || { from: { pathname: '/signup' } };
        history.replace(from);
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow">
            <div className="card-body row p-5">
              <Form onSubmit={formik.handleSubmit} className="m-auto p-3 w-50">
                <Form.Group>
                  <Form.Label htmlFor="username">{t('signup.username')}</Form.Label>
                  <Form.Control
                    autoFocus
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder={t('signup.usernameConstraints')}
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="shadow"
                    isInvalid={formik.touched.username && formik.errors.username}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{t(formik.errors.username)}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="password">{t('login.password')}</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder={t('signup.passMin')}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    className="shadow"
                    isInvalid={formik.touched.password && formik.errors.password}
                  />
                  <Form.Control.Feedback type="invalid">{t('signup.passMin')}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="password">{t('signup.confirm')}</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    placeholder={t('signup.mustMatch')}
                    name="confirmPassword"
                    id="confirmPassword"
                    autoComplete="current-password"
                    className="shadow"
                    isInvalid={formik.errors.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">{t('signup.mustMatch')}</Form.Control.Feedback>
                </Form.Group>
                <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
                  {t('signup.submit')}
                </button>
                { formik.errors.authFailed && (
                <Alert variant="danger">
                  {t('signup.alreadyExists')}
                </Alert>
                )}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupFrom;
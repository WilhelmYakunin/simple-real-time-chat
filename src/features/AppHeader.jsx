import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useHistory } from 'react-router-dom';
import Logo from '../components/Logo';

const AppHeader = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();
  const isLoged = localStorage.user !== undefined;

  const makeLogOut = () => {
    delete localStorage.user;
    const { from } = location.state || { from: { pathname: '/login' } };
    history.replace(from);
  };

  return (
    <nav className="mb-3 navbar navbar-expand-lg navbar-light bg-light">
      <Logo />
      { isLoged && (
      <button type="button" onClick={makeLogOut} className="btn btn-primary">
        {t('logout')}
      </button>
      ) }
    </nav>
  );
};

export default AppHeader;

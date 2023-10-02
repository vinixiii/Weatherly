import { useContext } from 'react';

import { AuthContext, AuthContextData } from '../contexts/AuthContext';

function useAuth(): AuthContextData {
  const auth = useContext(AuthContext);

  return auth;
}

export default useAuth;

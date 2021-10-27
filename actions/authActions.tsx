import React, { useContext } from 'react';
//
import { AuthContext } from '../context/auth-context/AuthContext';
import fireBaseApiAuth from '../api/fireBaseAUth';
import { Alert } from 'react-native';

const authActions = () => {
  const { dispatch } = useContext(AuthContext);

  // SECURE STORE NEEDS to be added
  const signup = async (email: string, password: string): Promise<void> => {
    try {
      // const res = await fireBaseApiAuth.post('/', {
      //   email,
      //   password,
      //   returnSecureToken: true,
      // });

      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCTjvAFSoWQOcdPLW6iJweWKswOBf2iZj8',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        dispatch({
          type: 'signup',
          payload: { email, password, token: data.idToken },
        });
      } else {
        const err = await response.json();
        Alert.alert(
          'We were not able to register you. Give it another Shot :-)',
          err.error.message
        );
      }
    } catch (_) {
      Alert.alert('We were not able to register you. Give it another Shot :-)');
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCTjvAFSoWQOcdPLW6iJweWKswOBf2iZj8',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data.idToken);

        dispatch({
          type: 'login',
          payload: { email, password, token: data.idToken },
        });
      } else {
        Alert.alert('We were not able to log you in. Give it another Shot :-)');
      }
    } catch (_) {
      Alert.alert('We were not able to log you in. Give it another Shot :-)');
    }
  };

  return { signup, login };
};

export default authActions;

import Router from 'next/router';
import React, { useCallback, useState } from 'react';

import { mutate } from 'swr';
import axios from 'axios';

import { SERVER_BASE_URL } from '../lib/utils/constant';

// import ListErrors from '../common/ListErrors';
// import UserAPI from '../../lib/api/user';

// id: hrahn@naver.com
// pw: 1234
const LoginForm = () => {
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = useCallback((e) => setEmail(e.target.value), []);
  const handlePasswordChange = useCallback((e) => setPassword(e.target.value), []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      // const { data, status } = await UserAPI.login(email, password);
      const { data, status } = await axios.post(
        `${SERVER_BASE_URL}/users/login`,
        // JSON.stringify({ user: { email, password } }),
        { user: { email, password } },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('login data', data);
      console.log('login status', status);

      if (status !== 200) {
        setErrors(data.errors);
      }

      if (data?.user) {
        window.localStorage.setItem('user', JSON.stringify(data.user));
        mutate('user', data?.user);
        Router.push('/');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <ListErrors errors={errors} /> */}
      {errors.length > 0 ? <div>Error</div> : null}

      <form onSubmit={handleSubmit}>
        <fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </fieldset>

          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            disabled={isLoading}
          >
            Sign in
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default LoginForm;

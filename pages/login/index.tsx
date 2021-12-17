import React from 'react';
import Head from 'next/head';
// import Link from 'next/link';

import LoginForm from '../../components/LoginForm';

const Login = () => (
  <>
    <Head>
      <title>LOGIN | NEXT REALWORLD</title>
      <meta
        name="description"
        content="Please login to use fully-featured next-realworld site. (Post articles, comments, and like, follow etc.)"
      />
    </Head>
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              {/* <Link href="/user/register" as="/user/register">
                Need an account?
              </Link> */}
            </p>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Login;

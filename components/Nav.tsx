import Link from 'next/link';
import useSWR from 'swr';

import checkLogin from '../lib/utils/checkLogin';
import storage from '../lib/utils/storage';

const Nav: React.FC = () => {
  const { data: currentUser } = useSWR('user', storage);
  const isLoggedIn = checkLogin(currentUser);

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link href="/" as="/">
          <a className="navbar-brand">conduit</a>
        </Link>

        {!isLoggedIn && (
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <Link href="/" as="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/login" as="/login">
                Sign in
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/register" as="/register">
                Sign up
              </Link>
            </li>
          </ul>
        )}
        {isLoggedIn && (
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <Link href="/" as="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/editor" as="/editor" passHref>
                <a>
                  <i className="ion-compose"></i>&nbsp;New Post
                </a>
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/settings" as="/settings" passHref>
                <a>
                  <i className="ion-gear-a"></i>&nbsp;Settings
                </a>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href={`/profile/${currentUser?.username}`}
                as={`/profile/${currentUser?.username}`}
                passHref
              >
                {currentUser.username}
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Nav;

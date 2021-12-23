import React, { useCallback } from 'react';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { nameState } from '../../state/myInfo';
import DisplayState from '../../components/about/DisplayState';
import TextInput from '../../components/about/TextInput';
import CharacterCount from '../../components/about/CharacterCount';
import UserInfo from '../../components/about/UserInfo';
import ErrorBoundary from '../../components/ErrorBoundary';
import { currentUserNameState } from '../../state/userInfo';

const About = () => {
  const [name, setNameState] = useRecoilState(nameState);

  const updateName = (e: any) => {
    setNameState(e.target.value);
  };

  // userInfo
  const [userName, setUserNameState] = useRecoilState(currentUserNameState);

  const updateUserName = useCallback(() => {
    const user = JSON.parse(window.localStorage.user);
    setUserNameState(user.username);
  }, [setUserNameState]);

  console.log('Render About');
  return (
    <div className="about-page">
      <h1>Profile</h1>
      <p>Hello, {name}</p>

      <input
        type="text"
        name="name"
        id="input_name"
        onChange={updateName}
        placeholder="Enter your name"
      />

      <DisplayState />
      <br />

      <TextInput />
      <CharacterCount />
      <br />

      {/* Suspense 와 ErrorBoundary 는 loading 이나 에러메시지 표시를 원하는 컴포넌트를 감싸면 된다. */}
      {/* ErrorBoundary 로 인해 에러가 렌더링 되면 children 인 UserInfo  */}
      <React.Suspense fallback={<div>Loading...</div>}>
        {/* <ErrorBoundary>
          <UserInfo />
        </ErrorBoundary> */}
        <UserInfo />
      </React.Suspense>
      {/* <UserInfo /> */}
      {userName}
      <button onClick={updateUserName}>set username</button>
      <br />

      <Link href="/" as="/">
        Back to Home
      </Link>
    </div>
  );
};

export default About;

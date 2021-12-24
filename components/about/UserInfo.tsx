import React, { useCallback } from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { currentUserProfileQuery } from '../../state/userInfo';

const UserInfo = () => {
  // const {
  //   profile: { username, bio, image, following },
  // } = useRecoilValue(currentUserProfileQuery);

  // Suspense 사용시 아래 주석 해제, useRecoilValueLoadable 주석처리
  // const data = useRecoilValue(currentUserProfileQuery);
  // const { username, bio, image, following } = data?.profile || {};

  const userProfileLoadable = useRecoilValueLoadable(currentUserProfileQuery);
  console.log('userProfileLoadable', userProfileLoadable);

  if (userProfileLoadable.state === 'loading') return <div>Loading...</div>;
  if (userProfileLoadable.state === 'hasError') {
    // currentUserProfileQuery 에서 throw error 되야 여기서 잡힌다.
    // console.log('Error UserInfo', userProfileLoadable.contents);
    // return userProfileLoadable.contents;
    return <div>Error</div>;
  }
  // console.log('userProfileLoadable.contents', userProfileLoadable.contents);

  const data = userProfileLoadable.contents;
  const { username, bio, image, following } = data?.profile || {};

  // 샘플코드
  // switch (userProfileLoadable.state) {
  //   case 'hasValue':
  //     return <div>{userProfileLoadable.contents}</div>;
  //   case 'loading':
  //     return <div>Loading...</div>;
  //   case 'hasError':
  //     throw userProfileLoadable.contents;
  // }

  console.log('Render UserInfo');

  return (
    <div>
      <h1>UserInfo</h1>
      username: {username}
      <br />
      bio: {bio}
      <br />
      image: {image}
      <br />
      following: {following}
      <br />
    </div>
  );
};

export default UserInfo;

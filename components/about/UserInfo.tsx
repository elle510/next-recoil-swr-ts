import React, { useCallback } from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { currentUserProfileQuery } from '../../state/userInfo';

const UserInfo = () => {
  // const {
  //   profile: { username, bio, image, following },
  // } = useRecoilValue(currentUserProfileQuery);
  const data = useRecoilValue(currentUserProfileQuery);
  const { username, bio, image, following } = data?.profile || {};

  // const userProfileLoadable = useRecoilValueLoadable(currentUserProfileQuery);
  // console.log('userProfileLoadable', userProfileLoadable);
  // const renderInfo = useCallback(() => {
  //   switch (userProfileLoadable.state) {
  //     case 'hasValue':
  //       return <div>{userProfileLoadable.contents}</div>;
  //     case 'loading':
  //       return <div>Loading...</div>;
  //     case 'hasError':
  //       throw userProfileLoadable.contents;
  //   }
  // }, [userProfileLoadable.contents, userProfileLoadable.state]);
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
      {/* {renderInfo()} */}
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

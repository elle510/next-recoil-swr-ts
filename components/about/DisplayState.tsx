import React from 'react';
import { useRecoilValue } from 'recoil';
import { nameState } from '../../state/myInfo';

const DisplayState = () => {
  const name = useRecoilValue(nameState);
  return <div>{name}</div>;
};

export default DisplayState;

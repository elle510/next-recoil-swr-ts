import React from 'react';
import { useRecoilValue } from 'recoil';
import { charCountState, textState } from '../../state/textInfo';

const CharacterCount = () => {
  const count = useRecoilValue(charCountState);

  return <div>Character Count: {count}</div>;
};

export default CharacterCount;

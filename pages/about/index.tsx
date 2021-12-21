import React from 'react';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { nameState } from '../../state/myInfo';
import DisplayState from '../../components/about/DisplayState';
import TextInput from '../../components/about/TextInput';
import CharacterCount from '../../components/about/CharacterCount';

const About = () => {
  const [name, setNameState] = useRecoilState(nameState);

  const updateName = (e: any) => {
    setNameState(e.target.value);
  };

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
      <br />

      <Link href="/" as="/">
        Back to Home
      </Link>
    </div>
  );
};

export default About;

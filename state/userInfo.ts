import axios from 'axios';
import { atom, selector } from 'recoil';
import { SERVER_BASE_URL } from '../lib/utils/constant';

export const currentUserNameState = atom({
  key: 'currentUserName',
  default: '',
});

export const currentUserProfileQuery = selector({
  key: 'currentUserProfile',
  get: async ({ get }) => {
    try {
      console.log('selector currentUserProfileQuery');
      const response = await axios.get(`${SERVER_BASE_URL}/profiles/${get(currentUserNameState)}`);
      console.log('after selector currentUserProfileQuery');
      return response.data;
    } catch (error) {
      // throw error;
      console.log('Error', error);
    }

    // const response = await myDBQuery({
    //   userID: get(currentUserIDState),
    // });
    // return response.name;
  },
});

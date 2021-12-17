/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';
import useSWR, { mutate } from 'swr';

// import CustomImage from '../common/CustomImage';
import checkLogin from '../../lib/utils/checkLogin';
import { SERVER_BASE_URL } from '../../lib/utils/constant';
import storage from '../../lib/utils/storage';

const CommentInput = () => {
  const { data: currentUser } = useSWR('user', storage);
  const isLoggedIn = checkLogin(currentUser);
  const router = useRouter();
  const {
    query: { pid },
  } = router;

  const [content, setContent] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const handleChange = React.useCallback((e) => {
    setContent(e.target.value);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await axios.post(
      `${SERVER_BASE_URL}/articles/${encodeURIComponent(String(pid))}/comments`,
      JSON.stringify({
        comment: {
          body: content,
        },
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${encodeURIComponent(currentUser?.token)}`,
        },
      },
    );
    setLoading(false);
    setContent('');
    mutate(`${SERVER_BASE_URL}/articles/${pid}/comments`);

    // mutate 사용
    // // update the local data immediately, but disable the revalidation
    // mutate('/api/user', { ...data, name: newName }, false)

    // // send a request to the API to update the source
    // await requestUpdateUsername(newName)

    // // trigger a revalidation (refetch) to make sure our local data is correct
    // mutate('/api/user')
  };

  if (!isLoggedIn) {
    return (
      <p>
        <Link href="/login" as="/login">
          Sign in
        </Link>
        &nbsp;or&nbsp;
        <Link href="/register" as="/register">
          sign up
        </Link>
        &nbsp;to add comments on this article.
      </p>
    );
  }

  return (
    <form className="card comment-form" onSubmit={handleSubmit}>
      <div className="card-block">
        <textarea
          rows={3}
          className="form-control"
          placeholder="Write a comment..."
          value={content}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>
      <div className="card-footer">
        <img
          className="comment-author-img"
          src={currentUser?.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'}
          alt="Comment author's profile image"
        />
        <button className="btn btn-sm btn-primary" type="submit">
          Post Comment
        </button>
      </div>
    </form>
  );
};

export default CommentInput;

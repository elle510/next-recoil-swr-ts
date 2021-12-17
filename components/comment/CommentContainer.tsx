import React from 'react';
// import useSWR from 'swr';

// import { SERVER_BASE_URL } from '../../lib/utils/constant';
// import fetcher from '../../lib/utils/fetcher';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

const CommentContainer = ({ pid }: { pid: string }) => {
  // console.log('CommentContainer render');
  // const { data, error } = useSWR(`${SERVER_BASE_URL}/articles/${pid}/comments`, fetcher);

  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;

  // const { comments } = data;

  return (
    <div className="col-xs-12 col-md-8 offset-md-2">
      <CommentInput />
      {/* <CommentList comments={comments} /> */}
      <CommentList pid={pid} />
    </div>
  );
};

export default CommentContainer;

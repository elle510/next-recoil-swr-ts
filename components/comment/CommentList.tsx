import React, { useCallback, useState } from 'react';
import useSWR from 'swr';

import { SERVER_BASE_URL } from '../../lib/utils/constant';
import fetcher from '../../lib/utils/fetcher';
import { CommentType, Comments } from '../../lib/utils/types/commentType';
import Comment from './Comment';

// const CommentList: React.FC<Comments> = ({ comments }) => {
const CommentList: React.FC<{ pid: string }> = ({ pid }) => {
  // console.log('CommentList render');
  const { data, error } = useSWR(`${SERVER_BASE_URL}/articles/${pid}/comments`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const { comments } = data;

  return (
    <>
      {comments?.map((comment: CommentType) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </>
  );
};

export default CommentList;

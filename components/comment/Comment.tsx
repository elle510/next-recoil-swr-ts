/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';

import { CommentType } from '../../lib/utils/types/commentType';
import useSWR from 'swr';
import storage from '../../lib/utils/storage';
import checkLogin from '../../lib/utils/checkLogin';
import DeleteButton from './DeleteButton';

type Props = {
  comment: CommentType;
};

const Comment: React.FC<Props> = ({ comment }) => {
  const { id, author, body, createdAt } = comment;

  const { data: currentUser } = useSWR('user', storage);
  const isLoggedIn = checkLogin(currentUser);
  const canModify = isLoggedIn && currentUser?.username === comment?.author?.username;

  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{body}</p>
      </div>
      <div className="card-footer">
        <Link href="profile/[pid]" as={`/profile/${author.username}`} passHref>
          <a>
            <img
              src={author.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'}
              className="comment-author-img"
              alt={author.username}
            />
          </a>
        </Link>
        &nbsp;
        <Link href="profile/[pid]" as={`/profile/${author.username}`}>
          {comment.author.username}
        </Link>
        <span className="date-posted">{new Date(createdAt).toDateString()}</span>
        {canModify && <DeleteButton commentId={id} />}
      </div>
    </div>
  );
};

export default Comment;

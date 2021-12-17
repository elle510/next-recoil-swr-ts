import React from 'react';
import Link from 'next/link';

import useSWR from 'swr';

import { SERVER_BASE_URL } from '../../lib/utils/constant';
import fetcher from '../../lib/utils/fetcher';

const Tags = () => {
  const { data, error } = useSWR(`${SERVER_BASE_URL}/tags`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const { tags } = data;

  return (
    <div className="tag-list">
      {tags?.map((tag: any) => (
        <Link key={tag} href={`/?tag=${tag}`} as={`/?tag=${tag}`} passHref>
          {/* <span onClick={handleClick}>{tag}</span> */}
          {tag}
        </Link>
      ))}
    </div>
  );
};

export default Tags;

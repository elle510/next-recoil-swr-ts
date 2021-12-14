import React from 'react';

import useSWR from 'swr';

import ArticlePreview from './ArticlePreview';
import { SERVER_BASE_URL } from '../../lib/utils/constant';

// const SERVER_BASE_URL = `https://conduit.productionready.io/api`;

// declare function fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;
// const fetcher = (...args) => fetch(...args).then((res) => res.json());
const fetcher = (input: RequestInfo, init: RequestInit, ...args: any[]) =>
  fetch(input, init).then((res) => res.json());

const ArticleList = () => {
  const { data, error } = useSWR(`${SERVER_BASE_URL}/articles`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const { articles, articlesCount } = data;
  console.log('articles', articles);
  return (
    <div>
      {articles?.map((article: any) => {
        console.log('article', article);
        return <ArticlePreview key={article.slug} article={article} />;
      }) || <div>No</div>}
    </div>
  );
};

export default ArticleList;

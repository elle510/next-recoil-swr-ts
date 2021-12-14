import React from 'react';
import Link from 'next/link';

type Props = {
  article: any;
};

const ArticlePreview: React.FC<Props> = ({ article }) => {
  const { title, description, slug } = article;

  // TODO: Link 에 대해 좀더 알아보자(href, as 정확한 의미)
  // Link 의 children 은 하나만 허용(multi 안됨)
  return (
    <Link href="/article/[pid]" as={`/article/${slug}`} passHref>
      <div style={{ cursor: 'pointer' }}>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </Link>
  );
};

export default ArticlePreview;

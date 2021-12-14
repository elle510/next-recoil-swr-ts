import React from 'react';

type Props = {
  article: any;
};

const ArticlePreview: React.FC<Props> = ({ article }) => {
  const { title, description } = article;
  return (
    <div>
      <div>{title}</div>
      <div>{description}</div>
    </div>
  );
};

export default ArticlePreview;

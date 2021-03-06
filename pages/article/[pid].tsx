import React from 'react';

import axios from 'axios';
// import marked from 'marked';

import { SERVER_BASE_URL } from '../../lib/utils/constant';
import CommentContainer from '../../components/comment/CommentContainer';

type ArticlePageProps = {
  article: any;
  pid: string;
};

const ArticlePage: React.FC<ArticlePageProps> = ({ article, pid }) => {
  // pre loading 에 의해 생성 or getStaticPaths 에 의해 빌드타임에 생성 되었다면 상관없지만
  // 그렇지 않다면 요청시 생성하므로 로딩 필요(url 직접 입력하는 경우)
  // 두번째 요청부터는 이미 정적생성된 페이지 사용, ssr은 요청시 마다 페이지 생성해서 사용 (이게 차이!!)
  if (!article) return <div>Loading...</div>;

  const { title, tagList, description, body } = article;

  // TODO: 타입 에러남 (원인 찾자)
  // const markup = {
  //   __html: marked(body, { sanitize: true }),
  // };

  console.log('pid', pid);
  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{title}</h1>
          <p>{description}</p>
          {/* <ArticleMeta article={article} canModify={canModify} /> */}
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-xs-12">
            {/* <div dangerouslySetInnerHTML={markup} /> */}
            <div>{body}</div>

            <ul className="tag-list">
              {tagList.map((tag: any) => {
                return (
                  <li className="tag-default tag-pill tag-outline" key={tag}>
                    {tag}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <hr />

        <div className="article-actions" />

        <div className="row">
          <CommentContainer
            pid={pid}
            // comments={this.props.comments || []}
            // errors={this.props.commentErrors}
            // slug={this.props.match.params.id}
            // currentUser={this.props.currentUser}
          />
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [], // 빌드타임시 정적페이지 생성(다이내믹 path)
    fallback: true, // 빌드타임에 생성하지 않은 페이지 요청시 false 이면 404 에러, true 면 요청시 페이지를 생성하고 두번째 요청부터는 생성된 페이지 로딩
  };
};

export const getStaticProps = async ({ params }: any) => {
  // console.log('params', params);
  const { pid } = params;

  try {
    const { data } = await axios.get(`${SERVER_BASE_URL}/articles/${encodeURIComponent(pid)}`);
    return {
      props: {
        article: data?.article,
        pid,
      },
    };
  } catch (error) {
    console.error(`Get Article id ${pid} error: `, error);
    return {
      props: {
        article: {},
        pid,
      },
      revalidate: 1, // TODO: revalidate 무엇인지? 알아보자
    };
  }
};

export default ArticlePage;

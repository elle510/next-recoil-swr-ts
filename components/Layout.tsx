import Nav from './Nav';
import Meta from './Meta';

// TODO: Layout 구조에 대해 복습필요(잘짜여진 Layout)
// SEO, Header, Footer, Sidebar 등
// _app.js, _document.js 와의 상호관계(특히 meta 데이터) 등
const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Meta />
      <Nav />
      <div className="container">
        <main className="main">
          {/* <Header /> */}
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;

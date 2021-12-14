import Nav from './Nav';
import Meta from './Meta';

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

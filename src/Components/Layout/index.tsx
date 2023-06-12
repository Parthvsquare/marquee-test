type IProps = {
  children: string | JSX.Element | JSX.Element[];
};

function Layout({ children }: IProps) {
  return <div className="sticky top-0 h-screen bg-slate-100">{children}</div>;
}

export default Layout;

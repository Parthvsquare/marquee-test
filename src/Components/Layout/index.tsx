type IProps = {
  children: string | JSX.Element | JSX.Element[];
};

function Layout({ children }: IProps) {
  return <div>{children}</div>;
}

export default Layout;

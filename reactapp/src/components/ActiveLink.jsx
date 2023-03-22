import { useLocation, Link } from 'react-router-dom';

function ActiveLink({ children, to }) {//https://ui.dev/react-router-custom-link
    const location = useLocation();
    const match = location.pathname === to;
  
    return (
      <div className={match ? "active" : ""}>
        {match ? "> " : ""}
        <Link to={to}>{children}</Link>
      </div>
    );
  }
  export default ActiveLink
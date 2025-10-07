import React from 'react';
import "./style.css";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import HeaderIcons from '../../components/header/headersIcons';
import HeaderLogo from '../../components/header/logo';
import HeaderSearch from '../../components/header/headerSearch';
function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  return (
    <header>
      <nav className="rowDiv">
        <HeaderLogo navigate={navigate} />
        {location.pathname != "/ebook" ? (
          <HeaderSearch />
        ) : (
          <span
            style={{
              fontSize: "29px",
              fontWeight: "900",
              color: "var(--main-color)",
            }}
          >
            {" "}
            {params?.get("book_title") + " - Book"}
          </span>
        )}
        <HeaderIcons />
      </nav>
    </header>
  );
}

export default Header;

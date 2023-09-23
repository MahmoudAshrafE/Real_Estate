import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../utils/common";
import useHeaderColor from "../../hooks/useHeaderColor";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from "react-router-dom";
import { PATHS } from "../../pages/Router/paths";
import { useAuth0 } from "@auth0/auth0-react";
import useAuthCheck from '../../hooks/useAuthCheck';
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import AddPropertyModal from "../AddPropertyModal/AddPropertyModal";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [modelOpened, setModelOpened] = useState(false);
  const headerColor = useHeaderColor();
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0()
  const { validateLogin } = useAuthCheck();
  
  const handleModalOpened = () => {
    if (validateLogin()) {
      setModelOpened(true)
    }
  }

  return (
    <section className="h-wrapper" style={{ background: headerColor }}>
      <div className="flexCenter innerWidth paddings h-container">

        <Link to={PATHS.HOME}>
        <img src="./logo.png" alt="logo" width={100} />
        </Link>

        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div
            className="flexCenter h-menu"
            style={getMenuStyles(menuOpened)}
          >
            <NavLink to={PATHS.PROPERTIES.ROOT} onClick={() => setMenuOpened(false)}>Properties</NavLink>

              <NavLink to={PATHS.CONTACT} onClick={() => setMenuOpened(false)}>Contact</NavLink>

              <div onClick={() => {
              handleModalOpened()
              setMenuOpened(false)
              }
              }>Add Property</div>
              <AddPropertyModal 
              opened={modelOpened}
              setOpened={setModelOpened}
              />
            {            
            (!isAuthenticated) ?
            <button className="button" onClick={() => loginWithRedirect()}>
              Login
            </button>
            :
            <ProfileMenu user={ user } logout={ logout } setMenuOpened={setMenuOpened}/>
            }
          </div>
        </OutsideClickHandler>

        {/* for medium and small screens */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;

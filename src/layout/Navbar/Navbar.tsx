import { NavLink, useLocation } from "react-router-dom";
import { ButtonFill } from "../../styles/styles";
import { Container, StyledNav } from "./Navbar.styles";
import { FiMenu } from "react-icons/fi";
import { toggleMenu } from "../../store/menu/menuSlice";
import { useAppDispatch } from "../../hooks/reduc";
import { toggleCreateModal } from "../../store/modal/modalSlice";
import getStandardName from "../../utils/getStandardName";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { pathname, state } = useLocation();
  console.log(state);

  if (pathname === "/404") return null;
  return (
    <StyledNav>
      <div className="nav__menu">
        <FiMenu onClick={() => dispatch(toggleMenu(true))} />
      </div>
      {/* <NavLink to={"/"} state={`notes`}>
        x
      </NavLink> */}
      <Container>
        <div className="nav__page-title">{getStandardName(state)}</div>
        {state !== "Trash" && state !== "Archive" && (
          <ButtonFill
            onClick={() => dispatch(toggleCreateModal(true))}
            className="nav__btn"
          >
            <span>+</span>
          </ButtonFill>
        )}
      </Container>
    </StyledNav>
  );
};

export default Navbar;

import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import styles from "./Navbar.module.scss";
import logo from "../images/logo.png"
import { useState } from "react";

const Navbar = () => {
    const [openNav, setOpenNav] = useState(false);

    return (
        <nav className={styles.Container}>
            <div className={styles.Wrapper}>
                <Link className={styles.Brand} to="/">
                    <img src={logo} alt="" className={styles.BrandImage} />
                    <span className={styles.BrandName}>RTU CEAT</span>
                </Link>
                <ul className={styles.NavList} role="list" aria-expanded={openNav}>
                    <li className={styles.NavItem}>
                        <Link className={styles.NavLink} to="/" 
                            onClick={()=>setOpenNav(false)}>
                            HOME
                        </Link>
                    </li>
                    <li className={styles.NavItem}>
                        <Link className={styles.NavLink} to="/courses"
                            onClick={()=>setOpenNav(false)}>
                            COURSES
                        </Link>
                    </li>
                    <li className={styles.NavItem}>
                        <Link className={styles.NavLink} to="/about"
                            onClick={()=>setOpenNav(false)}>
                            ABOUT US
                        </Link>
                    </li>
                </ul>
                <button className={styles.ButtonToggle} onClick={()=>setOpenNav(!openNav)}>
                    <MenuIcon/>
                </button>
            </div>
        </nav>
    )
}


export default Navbar;
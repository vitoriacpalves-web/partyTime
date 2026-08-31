import { NavLink } from "react-router-dom";
import "./Navbar.css"

const Navbar = () => {
    return (
        <nav id="navbar" >

            <h2>Party Time!</h2>
            <ul>
                <li>
                    <NavLink to="/">
                        Minhas Festas
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/create-new-party" className="btn">
                        Criar festa
                    </NavLink>
                </li>
            </ul>

        </nav>
    )
}

export default Navbar
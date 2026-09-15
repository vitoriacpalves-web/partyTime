import { NavLink } from "react-router-dom";
import "./Navbar.css"

// api
import partyFetch from '../axios/config'

//status message
import useToast from "../hooks/useToast"

//hooks
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const toast = useToast();
    const navigate = useNavigate();

    //função de logout
    const handleLogout = async () => {

        const result = window.confirm("Deseja realmente sair da sua conta?");

        if (!result) {
            return;
        }

        try {
            const response = await partyFetch.post("/logout");

            localStorage.removeItem("token");

            toast(response?.data?.msg ?? "Logout realizado com sucesso!");
            navigate("/");

        } catch (error) {
            toast(error.response?.data?.msg ?? "Erro desconhecido");
        }
    }

    return (
        <nav id="navbar" >

            <h2>Party Time!</h2>
            <ul>
                <div>
                    <li>
                        <NavLink to="/home">
                            Minhas Festas
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/create-new-party" className="btn">
                            Criar festa
                        </NavLink>
                    </li>
                </div>
                <li>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </li>
            </ul>

        </nav>
    )
}

export default Navbar
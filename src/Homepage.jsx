import './Homepage.css';
import { useContext } from "react";
import userContext from "./userContext";
import { Link } from "react-router-dom";

/** Homepage for Jobly.
 *
 * Props: none
 *
 * State: none
 *
 * App -> RoutesList -> Homepage
 */

function Homepage() {
    const { currentUser } = useContext(userContext);

    return (
        <div className='Homepage'>
            <h1 className='Homepage-title'>Jobly
                <img id="joblyLogoHomepage" src="/newJoblyLogo.png" alt="" />
            </h1>
            <p className='Homepage-welcome'>
                All the jobs in one, convenient place
            </p>
            {currentUser
                ?
                <h3>{`Welcome back, ${currentUser.username}!`}</h3>
                :
                <div className='Homepage-auth'>
                    <Link className="btn btn-primary" to="/login">Login</Link>
                    <Link className="btn btn-primary" to="/signup">Signup</Link>
                </div>}
        </div>
    );
}

export default Homepage;
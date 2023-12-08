import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="Home">
            <h2>Home</h2>
            <Link to='/login'>Login</Link><br />
            <Link to='/register'>Register</Link>
        </div>
    )
}

export default Home;
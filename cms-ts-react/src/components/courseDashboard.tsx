import { Nav, Navbar } from "react-bootstrap"
import { Link, Outlet } from "react-router"

const CourseDashboard=()=>{
    return(
        <>
        <h1> Course DashBoard</h1>
        <Navbar>
            <Nav>
                {/* <Nav.Link>Add</Nav.Link>
                <Nav.Link>View</Nav.Link> */}
                <Link className="nav-link" to={"add"}>Add Course</Link>
                <Link className="nav-link" to={""}>View Course</Link>
            </Nav>
        </Navbar>
        <Outlet></Outlet>
        </>
    )
}

export default CourseDashboard
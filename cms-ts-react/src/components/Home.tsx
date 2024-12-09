import { Outlet } from "react-router"
import Header from "./header"
import Sample1 from "../class-componnets/sample1"

const Home=()=>{
    const msg="welcome"
    return(
        <>
        <Header></Header>
        {/* <Sample1></Sample1>        */}
        <Outlet></Outlet>
        </>
    )
}

export default Home
import { Outlet } from "react-router";
import Header from "./header";
import Sample1 from "../class-componnets/sample1";
import { Provider } from "react-redux";
import myAppStore from "../store/appstore";

const Home = () => {
  const msg = "welcome";
  return (
    <>
      <Provider store={myAppStore}>
        <Header></Header>
        {/* <Sample1></Sample1>        */}
        <Outlet></Outlet>
      </Provider>
    </>
  );
};

export default Home;

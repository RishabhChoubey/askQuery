import { Route } from "react-router-dom";
import Signin from "../component/user/Signin";
import Register from "../component/user/Register";
import PostList from "../component/blog/PostList";
import Detail from "../component/postDetail/Detail";
import Reset from "../component/user/Reset";

const Router = () => {
  return (
    <>
      <Route exact path="/" component={PostList} />
      <Route exact path="/detail/:id" component={Detail} />
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/reset/:token" component={Reset} />
    </>
  );
};

export default Router;

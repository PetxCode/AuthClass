import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import PostScreen from "./components/PostScreen";
import "antd/dist/antd.css";
import HeaderView from "./components/HeaderView";
import DetailPage from "./components/DetailPage";
import LetBuild from "./test/LetBuild";
import HomeScreen from "./firebaseComponent/HomeScreen";
import YouHome from "./Youtube/YouHome";
import YouPost from "./Youtube/YouPost";
import MyPost from "./Youtube/MyPost";
import YouDetail from "./Youtube/YouDetail";
import SignUp from "./Youtube/SignUp";
import YouSign from "./Youtube/YouSign";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <HeaderView />
        <Switch>
          {/* <Route exact path="/" component={Home} /> */}
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/youtube" component={YouHome} />
          <Route exact path="/sign" component={YouSign} />

          <Route exact path="/youtube/:id" component={YouDetail} />

          <Route exact path="/post" component={PostScreen} />
          <Route exact path="/youPost" component={YouPost} />
          <Route exact path="/myPost" component={MyPost} />

          <Route exact path="/:id" component={DetailPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;

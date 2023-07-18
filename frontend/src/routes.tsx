import { LazyExoticComponent,Suspense,FC,lazy } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Register from "pages/Register";
const Loadable = (Component:LazyExoticComponent<FC>) => (props:any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
  const Login = Loadable(lazy(() => import("./pages/Login")));
  const routes = [
    {
      path: "/",
      element: (
        <Login />
       ),
    },{
      path:'/register',
      element:(<Register/>)
    }]
export default routes
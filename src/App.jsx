import { DataContext } from "./components/DataProvider/DataProvider";
import AppRouter from "./Routes";
import { useContext, useEffect } from "react";
import Type from "./utility/action.type";
import {auth} from "./utility/firebase"
function App() {
let [{user}, dispatch]=useContext(DataContext)
  useEffect (() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser
       })
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        }); 
     }
   }) 
  }, [])
  return (
    <>
      <AppRouter />
    </>
  );
}
export default App;

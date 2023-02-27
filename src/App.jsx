import Router from "./router";
import SideMenu from './Layout/SideMenu/SideMenu'

function App() {
  return (
    <div className="flex">
      <SideMenu></SideMenu>
      <Router></Router>
    </div>
  );
}

export default App;

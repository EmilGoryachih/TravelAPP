import Footer from "./components/Footer/Footer"
import Settings from './pages/Routes/settings.tsx';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Sightseen from './pages/Routes/sightseens.tsx'
import Friend from './pages/Account/friends.tsx'
import AddFriend from './pages/Account/addFriend.tsx'
import ChooseRoute from './pages/Routes/chooseRoute.tsx'
import Register from './pages/Account/register.tsx'
import RouteDitails from './pages/Routes/routeCard.tsx'
import Chat from "./pages/chat.tsx";
import Payment from './pages/Routes/Payment.tsx';
import ChooseType from "./pages/Account/chooseType.tsx";

const App = () => (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Footer/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/sightseeng" element={<Sightseen/>}/>
        <Route path="/friends" element={<Friend/>}/>
        <Route path="/add-friends" element={<AddFriend/>}/>
        <Route path="/choose-route" element={<ChooseRoute/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/route-card" element={<RouteDitails/>}/>
        <Route path="/pay" element={<Payment/>}/>
        <Route path="/choose-type" element={<ChooseType/>}/>
      </Routes>
    </BrowserRouter>
  </>
)
export default App;
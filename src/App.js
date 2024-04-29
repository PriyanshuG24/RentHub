import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Explore from './pages/Explore.jsx';
import Offers from './pages/Offers.jsx';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/SignIn.jsx';
import Profile from './pages/Profile.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import ForgetPassword from './pages/ForgetPassword.jsx';
import Category from './pages/Category.jsx';
import Listing from './pages/Listing.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateListing from './pages/CreateListing.jsx';
import EditListing from './pages/EditListing.jsx';
import Contact from './pages/Contact.jsx';
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Explore/>}/>
        <Route path='/offer' element={<Offers/>}/>
        <Route path='/category/:categoryName' element={<Category/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/profile' element={<PrivateRoute/>}>
        <Route path='/profile' element={<Profile/>}/>
        </Route>
        <Route path='/forget-password' element={<ForgetPassword/>}/>
        <Route path='/create-listing' element={<CreateListing/>}/>
        <Route path='/edit-listing/:listingId' element={<EditListing/>}/>
        <Route path='/category/:categoryName/:listingId' element={<Listing/>}/>
        <Route path='/contact/:landlordId' element={<Contact/>}/>
      </Routes>
      <Navbar/>
    </Router>
    <ToastContainer/>
    </>
  );
}

export default App;

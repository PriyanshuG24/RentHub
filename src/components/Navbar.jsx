import { useNavigate,useLocation } from "react-router-dom"
import { ReactComponent as OfferIcon } from "../assets/svg/localOfferIcon.svg"
import { ReactComponent as ExploreIcon } from "../assets/svg/exploreIcon.svg"
import { ReactComponent as PersonOutlineIcon } from "../assets/svg/personOutlineIcon.svg"
function Navbar() {
    const navigate=useNavigate();
    const location =useLocation();
    const matchPathroute=(route)=>{
        if(route===location.pathname){
            return true;
        }
    }
  return (
    <footer className="navbar">
        <nav className="navbarNav">
            <ul className="navbarListItems">
                <li className="navbarListItem">
                    <ExploreIcon fill={matchPathroute('/')?'#2c2c2c':'#8f8f8f'} width ='20px' height='20px' onClick={()=>navigate('/')}/>
                    <p className={matchPathroute('/')?'navbarListItemNameActive':'navbarListItemName'}>Explore</p>
                </li>
                <li className="navbarListItem">
                    <OfferIcon  fill={matchPathroute('/offer')?'#2c2c2c':'#8f8f8f'} width ='20px' height='20px' onClick={()=>navigate('/offer')}/>
                    <p className={matchPathroute('/offer')?'navbarListItemNameActive':'navbarListItemName'}>Offers</p>
                </li>
                <li className="navbarListItem">
                    <PersonOutlineIcon fill={matchPathroute('/profile')?'#2c2c2c':'#8f8f8f'} width ='20px' height='20px' onClick={()=>navigate('/profile')}/>
                    <p className={matchPathroute('/profile')?'navbarListItemNameActive':'navbarListItemName'}>Profile</p>
                </li>
            </ul>
        </nav>
    </footer>
  )
}

export default Navbar

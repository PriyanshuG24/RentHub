import { useState, useEffect } from "react";
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { updateDoc, doc,getDocs,collection,query,where,orderBy,deleteDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import homeIcon from '../assets/svg/homeIcon.svg'
import arrowRignt from '../assets/svg/keyboardArrowRightIcon.svg'
import ListingItem from '../components/ListingItem'

function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false);
  const [listings,setListings]=useState(null);
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });
  console.log(auth.currentUser.uid);
  useEffect(()=>{
    const fetchUserListings=async()=>{
      const listingRef=collection(db,'listings');
      const q=query(listingRef,where('userRef','==',auth.currentUser.uid),orderBy('timestamp','desc'));
      const querySnap=await getDocs(q);
      let listings=[];
      querySnap.forEach((doc)=>{
        return listings.push({
          id:doc.id,
          data:doc.data()
        })
      })
      setListings(listings);
    }
    fetchUserListings();
  },[auth.currentUser.uid])
  useEffect(() => {
    if (auth.currentUser) {
      setFormData({
        name: auth.currentUser.displayName || "",
        email: auth.currentUser.email || ""
      });
    }
  }, [auth.currentUser]);
  const { name, email } = formData;
  const onLogout = () => {
    auth.signOut();
    navigate('/');
  }
  const onChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update display name
        await updateProfile(auth.currentUser, { displayName: name });

        // Update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, { name });
        
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error("Could not update profile details");
    }
  }

  const handleDone = () => {
    if (changeDetails) {
      onSubmit();
      setChangeDetails(false);
    }
  }
  const onDelete=async(listingId)=>{
    if(window.confirm('Are you really want to delelte this !!!')){
      await deleteDoc(doc(db,'listings',listingId))
      const updatedListings=listings.filter(
        (listing)=>listing.id!==listingId
      )
      setListings(updatedListings);
      setLoading(false);
      toast.success("Successfully Deleted !!")
    }
  }
  const onEdit=(listingId)=>navigate(`/edit-listing/${listingId}`)
  // console.log(listings);
  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">
          Profile
        </p>
        <button type="button" className="logOut" onClick={onLogout}>
          Logout
        </button>
      </header>
      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p className="changePersonalDetails" onClick={() => {
            if (!changeDetails) {
              setChangeDetails(true);
            } else {
              handleDone();
            }
          }}>
            {changeDetails ? "done" : "change"}
          </p>
        </div>
        <div className="profileCard">
          <form>
            <input type='text'
              className={!changeDetails ? "profileName" : "profileNameActive"}
              id="name"
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <input type='email'
              className={!changeDetails ? "profileEmail" : "profileEmailActive"}
              id="email"
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>
        <Link to='/create-listing' className="createListing">
          <img src={homeIcon} alt="home" />
          <p>Sell or Rent your house</p>
          <img src={arrowRignt} alt="arrow" />
        </Link>
        {!loading && listings?.length>0 && (
          <>
          <p className="listingText">Your Listings</p>
          <ul className="listingsItem">
             {listings.map((listing)=>(
              <ListingItem key={listing.id} listing={listing.data} id={listing.id} onDelete={()=>onDelete(listing.id)} onEdit={()=>onEdit(listing.id)}/>
             ))}
          </ul>
          </>
        )}
      </main>
    </div>
  )
}

export default Profile;

import React from 'react'
import { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import ListingItem from '../components/ListingItem'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy, 
  limit,
  startAfter
} from 'firebase/firestore'
import {db} from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

function Category({categoryName}) {
  const [listings,setListings] =useState(null);
  const [loading,setLoading]=useState(true);
  const [lastFetchListing,setLastFetchListing]=useState(null);
  const params=useParams();
  useEffect(()=>{
    const fetchListings=async()=>{
      try {
        const listingsRef=collection(db,'listings');
        const q=query(
          listingsRef,
          where('type','==',params.categoryName),
          orderBy('timestamp','desc'),
          limit(1)
        )
        const querySnap=await getDocs(q);
        const lastVisible=querySnap.docs[querySnap.docs.length-1];
        setLastFetchListing(lastVisible);
        const listings=[];
        querySnap.forEach((doc)=>{
          // console.log(doc.data());
          return listings.push({
            id:doc.id,
            data:doc.data()
          })
        })
        setListings(listings);
        setLoading(false);
      } catch (error) {
         toast.error("could not fetch listings")
      }
    }
    fetchListings();
  },[params.categoryName])
  //pagination

  const moreFetchListings=async()=>{
    try {
      const listingsRef=collection(db,'listings');
      const q=query(
        listingsRef,
        where('type','==',params.categoryName),
        orderBy('timestamp','desc'),
        startAfter(lastFetchListing),
        limit(1)
      )
      const querySnap=await getDocs(q);
      const lastVisible=querySnap.docs[querySnap.docs.length-1];
      setLastFetchListing(lastVisible);
      const listings=[];
      querySnap.forEach((doc)=>{
        // console.log(doc.data());
        return listings.push({
          id:doc.id,
          data:doc.data()
        })
      })
      setListings((prevState)=>[
        ...prevState,...listings
      ]);
      setLoading(false);
    } catch (error) {
       toast.error("could not fetch listings")
    }
  }
  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {params.categoryName==='rent' ? "Places for rent":"Places for sale"}
        </p>
      </header>
      {loading ?<Spinner/> :listings && listings.length>0 ?
      <>
      <main>
        {/* <p>hello</p> */}
        <ul className="categoryListings">
          {listings.map((listing)=>{
            // return <h3 key={listing.id}>{listing.data.name}</h3>
            return (
              <ListingItem  
                listing={listing.data} 
                id={listing.id} 
                key={listing.id}
              />
            )
          })}
        </ul>
      </main>
      <br>
      </br>
      {setLastFetchListing &&(
        <p className='loadMore'  onClick={moreFetchListings}>Load More</p>
      )}
      </>:
      <p>No listings for  {params.categoryName}</p>}
    </div>
  )
}

export default Category

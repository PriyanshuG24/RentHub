import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase.config'
import Spinner from './Spinner'
import 'react-slideshow-image/dist/styles.css'
import { Fade } from 'react-slideshow-image'

function Slider() {
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, 'listings')
      const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5))
      const querySnap = await getDocs(q)

      let listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })
      setListings(listings)
      setLoading(false)
    }

    fetchListings()
  }, [])
  
  if (loading) {
    return <Spinner />
  }

  if (listings.length === 0) {
    return <></>
  }
  return (
    listings && (
      <>
        <p className='exploreHeading'>Recommended</p>
        <div>
          <Fade>
            {listings.map(({ data, id }) => (
              <div key={id} onClick={() => navigate(`/category/${data.type}/${id}`)}>
                <div
                  style={{
                    background: `url(${data.imgUrls[0]}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                  className='swiperSlideDiv'
                >
                  <p className='swiperSlideText'>{data.name}</p>
                  <p className='swiperSlidePrice'>
                    ${data.discountedPrice ?? data.regularPrice}{' '}
                    {data.type === 'rent' && '/ month'}
                  </p>
                </div>
              </div>
            ))}
          </Fade>
        </div>
      </>
    )
  )
}

export default Slider

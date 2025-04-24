import React,{useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom';
import { fetchUserAttributes } from 'aws-amplify/auth';


const UserDetails = ({ user, signOut }) => {
    const [loading, setLoading] = useState(true);
    const [attributes, setAttributes] = useState(null);
    useEffect(() => {
        const loadAttributes = async () => {
            try {
                setLoading(true);
                const attrs = await fetchUserAttributes();
                setAttributes(attrs);
            } catch (err) {
                console.error('Failed to fetch attributes:', err);
            } finally {
                setLoading(false);
            }
        };
        setAttributes(null);
        loadAttributes();
    }, [user]);
  return (
    <>
    <main className="app container text-center">
        <h1>Hello, {user?.username}</h1>
    {loading ? (
        <p>Loading user info...</p>
      ) : (
        <div className="text-start">
          <h3>Name: {attributes?.name || ''}</h3>
          <h3>Email: {attributes?.email || ''}</h3>
          <h3>Phone: {attributes?.phone_number || ''}</h3>
          <h3>Address:  {attributes?.['custom:doorNo'] ? attributes?.['custom:doorNo'] : '' } 
                        {attributes?.address ? ', '+attributes?.address : '' }
                        {attributes?.['custom:addressLine2'] ? ', '+attributes?.['custom:addressLine2'] : '' } 
                        {attributes?.['custom:addressLine3'] ? ', '+attributes?.['custom:addressLine3'] : '' } 
                        {attributes?.['custom:district'] ? ', '+attributes?.['custom:district'] : ''}
                        {attributes?.['custom:states'] ? ', '+attributes?.['custom:states'] : ''} 
                        {attributes?.['custom:country'] ? ', '+attributes?.['custom:country'] : ''}
                        {attributes?.['custom:pincode'] ? ' - '+attributes?.['custom:pincode'] : ''}
          </h3>
        </div>
      )}
      <div>
        <NavLink to={"/profileUpdate"}><button onClick={({ user }) => <ProfileUpdate/>} >Update</button></NavLink>
        <button onClick={signOut}>Sign out</button>
      </div>
    </main>
    </>
  )
}

export default UserDetails
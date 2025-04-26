import React,{useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { Atom } from 'react-loading-indicators';

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
    <main className="text-center m-3 p-3">
    {loading ? (
        <Atom color="#8488df" size="large" text="Please wait..." textColor="#ff00df" />
      ) : (
        <div className="d-flex justify-content-center">
            <div className="userprofile p-4">
            <div className="d-grid justify-content-center align-items-center">
                <h1>Hello, {user?.username}</h1>
                <table className='text-center'>
                    <tbody className='text-start'>
                        <tr className='address '>
                            <th><h4>Name</h4></th>
                            <th><h4>:</h4></th>
                            <td><h4>{attributes?.name || ''}</h4></td>
                        </tr>
                        <tr className='address'>
                            <th><h4>Email</h4></th>
                            <th><h4>:</h4></th>
                            <td><h4>{attributes?.email || ''}</h4></td>
                        </tr>
                        <tr className='address'>
                            <th><h4>Phone</h4></th>
                            <th><h4>:</h4></th>
                            <td><h4>{attributes?.phone_number || ''}</h4></td>
                        </tr>
                        <tr className='address'>
                            <th><h4>Address</h4></th>
                            <th><h4>:</h4></th>
                            <td style={{width:'18em'}}><h4>{`${attributes?.['custom:doorNo'] ? attributes?.['custom:doorNo'] : '' } ${attributes?.address ? ', '+attributes?.address : '' }${attributes?.['custom:addressLine2'] ? ', '+attributes?.['custom:addressLine2'] : '' } ${attributes?.['custom:addressLine3'] ? ', '+attributes?.['custom:addressLine3'] : '' } ${attributes?.['custom:district'] ? ', '+attributes?.['custom:district'] : ''}${attributes?.['custom:states'] ? ', '+attributes?.['custom:states'] : ''} ${attributes?.['custom:country'] ? ', '+attributes?.['custom:country'] : ''}${attributes?.['custom:pincode'] ? ' - '+attributes?.['custom:pincode'] : ''}`}</h4></td>
                            
                        </tr>
                    </tbody>
                </table>
                <div className="d-flex justify-content-center align-items-center m-3 p-3">
                    <NavLink to={"/profileUpdate"}><button className='px-3 p-2 me-3 btn-default'>Update</button></NavLink>
                    <button className='p-2 px-3 btn-default' onClick={signOut}>Sign out</button>
                </div>
            </div>
        </div>
        </div>
      )}
     
    </main>
    </>
  )
}

export default UserDetails
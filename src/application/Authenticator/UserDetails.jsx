import React,{useState,useEffect} from 'react'
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

    const ProfileUpdatepage=()=> {
        window.location.href = "/profileUpdate";
      }
  return (
    <>
    <main className="text-center mx-md-5 mt-2 px-md-5">
    {loading ? (
        <Atom color="#8488df" size="large" text="Please wait..." textColor="#ff00df" />
      ) : (
        <div className="d-md-block justify-content-center px-xl-5">
            <div className="px-md-5">
            <div className="userprofile px-lg-5">
                <div className='amplify-heading'><h2>Hello, {user?.username}</h2></div>
                <fieldset className= 'amplify-flex text-start pb-3' style={{flexDirection: "column"}}>
                    <div className='amplify-flex p-1 m-2 px-xl-5' style={{flexDirection: "column"}}>
                        <div className='amplify-flex amplify-field amplify-textfield'>
                            <label htmlFor="name" className='amplify-label pe-3'>Full Name</label>
                            <div className='amplify-flex amplify-field-group amplify-field-group--horizontal'>
                                <div className='amplify-field-group__field-wrapper amplify-field-group__field-wrapper--horizontal'>
                                    <input
                                    type="text"
                                    name="name"
                                    className='amplify-input amplify-field-group__control'
                                    value={attributes?.name || ''}
                                    placeholder="Name"
                                    readOnly
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='amplify-flex amplify-field amplify-textfield'>
                        <label htmlFor="email" className='amplify-label pe-3'>Email</label>
                        <div className='amplify-flex amplify-field-group amplify-field-group--horizontal'>
                            <div className='amplify-field-group__field-wrapper amplify-field-group__field-wrapper--horizontal'>
                            <input
                                type="email"
                                name="email"
                                className='amplify-input amplify-field-group__control'
                                value={attributes?.email || ''}
                                placeholder="Email"
                                readOnly
                            />
                            </div>
                        </div>
                        </div>
                        <div className='amplify-flex amplify-field amplify-textfield'>
                        <label htmlFor="phone_number" className='amplify-label pe-3'>Phone Number</label>
                        <div className='amplify-flex amplify-field-group amplify-field-group--horizontal'>
                            <div className='amplify-field-group__field-wrapper amplify-field-group__field-wrapper--horizontal'>
                            <input
                                type="tel"
                                name="phone_number"
                                className='amplify-input amplify-field-group__control'
                                value={attributes?.phone_number || ''}
                                placeholder="phone number"
                                readOnly
                            />
                            </div>
                        </div>
                        </div>
                        <div className='amplify-flex amplify-field amplify-textfield'>
                            <label htmlFor="address" className='amplify-label pe-3'>Address</label>
                            <div className='amplify-flex amplify-field-group amplify-field-group--horizontal'>
                                <div className='amplify-field-group__field-wrapper amplify-field-group__field-wrapper--horizontal'>
                                    <textarea
                                    rows={'4'}
                                    type="text"
                                    name="address"
                                    className='amplify-input amplify-field-group__control'
                                    value={`${attributes?.['custom:doorNo'] ? attributes?.['custom:doorNo'] : '' } ${attributes?.address ? ', '+attributes?.address : '' }${attributes?.['custom:addressLine2'] ? ', '+attributes?.['custom:addressLine2'] : '' } ${attributes?.['custom:district'] ? ', '+attributes?.['custom:district'] : ''}${attributes?.['custom:states'] ? ', '+attributes?.['custom:states'] : ''} ${attributes?.['custom:country'] ? ', '+attributes?.['custom:country'] : ''}${attributes?.['custom:pincode'] ? ' - '+attributes?.['custom:pincode'] : ''}`}
                                    placeholder="Address"
                                    readOnly
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='amplify-flex amplify-field amplify-textfield'>
                            <label htmlFor="custom:addressLine3" className='amplify-label pe-3'>Landmark</label>
                            <div className='amplify-flex amplify-field-group amplify-field-group--horizontal'>
                                <div className='amplify-field-group__field-wrapper amplify-field-group__field-wrapper--horizontal'>
                                <input
                                type="text"
                                name="custom:addressLine3"
                                className='amplify-input amplify-field-group__control'
                                value={attributes?.['custom:addressLine3'] ? attributes?.['custom:addressLine3'] : '' }
                                placeholder="Landmark"
                                readOnly
                                /></div>
                            </div>
                        </div>
                        <div className='amplify-flex amplify-field amplify-textfield text-center'>
                        <div className='amplify-flex amplify-field-group amplify-field-group--horizontal'>
                            <div className='amplify-field-group__field-wrapper amplify-field-group__field-wrapper--horizontal'>
                            <button className='p-2 me-2 amplify-button amplify-button--primary' onClick={()=>ProfileUpdatepage()}>Update</button>
                            <button className='p-2 amplify-button amplify-button--primary' onClick={signOut}>Sign out</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </fieldset>
                <div className="d-flex justify-content-center align-items-center m-3 p-3">
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
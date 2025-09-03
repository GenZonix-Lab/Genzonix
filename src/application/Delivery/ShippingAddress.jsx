import { fetchUserAttributes } from 'aws-amplify/auth';
import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ShippingAddress = () => {
const navigate=useNavigate();
//user Credentials
const [attributes, setAttributes] = useState({});
useEffect(() => {
    const fetchUser = async () => {
    try {
        const fetchuser = await fetchUserAttributes()
        setAttributes(fetchuser)
    } catch (err) {
        console.error("Error to who you are...", err);
    }};
    fetchUser();
}, []);

return (    
<div className='amplify-flex amplify-field amplify-textfield'>
    <div className='amplify-flex amplify-field-group amplify-field-group--horizontal'>
        <div className='amplify-field-group__field-wrapper amplify-field-group__field-wrapper--horizontal'>
            <textarea
                rows={'6'}
                type="text"
                name="address"
                className='amplify-input amplify-field-group__control fst-italic'
                value={`${attributes?.['name'] ? attributes?.['name'] : '' }
${attributes?.['custom:doorNo'] ? attributes?.['custom:doorNo'] +', ' : '' } ${attributes?.address ? attributes?.address+', ' : '' }${attributes?.['custom:addressLine3'] ? attributes?.['custom:addressLine3']+',' : '' }
${attributes?.['custom:addressLine2'] ? attributes?.['custom:addressLine2']+', ' : '' } 
${attributes?.['custom:district'] ? attributes?.['custom:district']+ (attributes?.['custom:pincode'] ?'':',' ): ''}${attributes?.['custom:pincode'] ? ' - '+attributes?.['custom:pincode'] : ''}
${attributes?.['custom:states'] ? attributes?.['custom:states']+',' : ''} ${attributes?.['custom:country'] ? attributes?.['custom:country'] : ''}
Phone Number :${attributes?.['phone_number'] ? attributes?.['phone_number'] : 'please update your phone number'}`}
                placeholder="Address"
                autoComplete="on"
                readOnly
            />
        </div>
    </div>
    <div className='amplify-flex amplify-field amplify-textfield text-end'>
        <div className='amplify-flex amplify-field-group amplify-field-group--horizontal'>
            <div className='amplify-field-group__field-wrapper amplify-field-group__field-wrapper--horizontal'>
                <button className='p-2 me-2 amplify-button amplify-button--primary' onClick={()=>(navigate("/profileUpdate"))}>{attributes?.address?'Update':attributes?.['custom:pincode'] ?"fill your address corrrectly":'fill your Address here'}</button>
            </div>
        </div>
    </div>
</div>
  )
}

export default ShippingAddress
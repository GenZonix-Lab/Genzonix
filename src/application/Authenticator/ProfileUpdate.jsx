import React, { useEffect, useState } from 'react';
import { Country, State, City }  from 'country-state-city';
import PhoneInput from 'react-phone-input-2'
import { Atom, ThreeDot } from 'react-loading-indicators';
import { useNavigate } from 'react-router-dom';
import './reactStyle.css'
import {
  fetchUserAttributes,
  updateUserAttribute,
  confirmUserAttribute,
} from 'aws-amplify/auth';


const ProfileUpdate = ({user}) => {
  const [attributes, setAttributes] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate= useNavigate();
  const [pendingVerification, setPendingVerification] = useState(null);
  const [confirmationCode, setConfirmationCode] = useState('');
  useEffect(() => {
    const loadAttributes = async () => {
      try {
        setLoading(true);
        const attrs = await fetchUserAttributes();
        setAttributes(attrs);
        setFormData({
          ...attrs,
          handlephoneChange
        });
      } catch (err) {
        console.error('Failed to fetch attributes:', err);
      } finally {
        setLoading(false);
      }
    };
    setAttributes(null);
    loadAttributes();
  }, [user]);
  const handlephoneChange = (value,data) =>{
    setFormData((prev)=> ({ ...prev, country_code : data.dialCode}))
    setFormData((prev)=> ({ ...prev, phone_number : '+' + value}))
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      setMessage('Loading');
      
      const updatableFields = {
        name: formData.name,
        email: formData.email,

      };

      const addressFields = {
        address: formData.address,
        'custom:addressLine2': formData?.['custom:addressLine2'],
        'custom:addressLine3': formData?.['custom:addressLine3'],
        'custom:doorNo': formData?.['custom:doorNo'],
        'custom:states': formData?.['custom:states'],
        'custom:district': formData?.['custom:district'],
        'custom:country': formData?.['custom:country'],
        'custom:stateCode': formData?.['custom:stateCode'],
        'custom:districtCode': formData?.['custom:districtCode'],
        'custom:countryCode': formData?.['custom:countryCode'],
        'custom:pincode': formData?.['custom:pincode'],
      }
      for (const [key, value] of Object.entries(addressFields)) { 
          await updateUserAttribute({
            userAttribute: {
              attributeKey: key,
              value: value ? value.trim() : '',
            },
          });
      }


      for (const [key, value] of Object.entries(updatableFields)) {
        if (value && value.trim() !== '') {
          await updateUserAttribute({
            userAttribute: {
              attributeKey: key,
              value: value.trim(),
            },
          });
        }
      }

      if (formData.phone_number && formData.country_code) {
        const output = await updateUserAttribute({
          userAttribute: {
            attributeKey: 'phone_number',
            value: formData.phone_number,
          },
        });

        if (output.nextStep?.updateAttributeStep === 'CONFIRM_ATTRIBUTE_WITH_CODE') {
          setPendingVerification('phone_number');
          setMessage('Verification code sent to phone number.');
        }
      }
      const updatedAttrs = await fetchUserAttributes();
      setAttributes(updatedAttrs);
      setFormData({
        ...updatedAttrs,
        handlephoneChange
      });
      setMessage('Profile updated successfully!');
    } catch (err) {
      console.error('Failed to update attributes:', err);
      setMessage('Failed to update profile.');
    }
  };

  const handleConfirm = async () => {
    try {
      await confirmUserAttribute({
        attributeKey: pendingVerification,
        confirmationCode: confirmationCode.trim(),
      });
      setMessage(`${pendingVerification} confirmed successfully.`);
      setPendingVerification(null);
      setConfirmationCode('');
      const updatedAttrs = await fetchUserAttributes();
      setAttributes(updatedAttrs);
    } catch (err) {
      console.error('Confirmation failed:', err);
      setMessage('Failed to confirm attribute.');
    }
  };

  //Countries
  const countries = Country.getAllCountries();
  const handleCountryChange = (event) => {
      const selectedValue = event.target.value;
      const selectedCountryName = countries.find(country => country.isoCode === selectedValue)?.name;
      setFormData((prev) => ({ ...prev, 'custom:countryCode': selectedValue }));
      setFormData((prev) => ({ ...prev, 'custom:country': selectedCountryName }));
  };
  //States
  const states = State.getStatesOfCountry(formData?.['custom:countryCode'])
  const handleStateChange = (event) => {
      const selectedValue = event.target.value;
      const selectedStateName = states.find(state => state.isoCode === selectedValue)?.name;
      setFormData((prev) => ({ ...prev, 'custom:stateCode': selectedValue }));
      setFormData((prev) => ({ ...prev, 'custom:states': selectedStateName }));
  }
  //Cities
  const cities = City.getCitiesOfState(formData?.['custom:countryCode'], formData?.['custom:stateCode']);
  const handleCityChange = (event) => {
      const selectedValue = event.target.value;
      setFormData((prev) => ({ ...prev, 'custom:district': selectedValue !=='none' ? selectedValue : '','custom:districtCode': selectedValue !=='none' ? selectedValue : ''}));
  }
  return (
    <>
    <main className="text-center mx-md-5 p-md-5">
      
      {loading ? (
        <Atom color="#8488df" size="large" text="Please wait..." textColor="#ff00df" />
      ) : (
        <div className="d-flex justify-content-center px-xl-5">
        <div className="px-md-5 userprofile" id='updateprofile'>
          <div className='px-lg-5'>
            <div className="amplify-heading"><h1>User Details</h1></div>
            <fieldset className='amplify-flex text-start pb-3' style={{"flex-direction": "column"}}>
              <div className='amplify-flex p-1 m-2 px-xl-5' style={{"flex-direction": "column"}}>
                <div className='amplify-flex amplify-field amplify-textfield'>
                  <label htmlFor="name" className='amplify-label pe-3'>Full name (First and Last name)</label>
                  <div className='amplify-flex amplify-field-group amplify-field-group--horizontal'>
                    <div className='amplify-field-group__field-wrapper amplify-field-group__field-wrapper--horizontal'>
                    <input
                    type="text"
                    name="name"
                    className='amplify-input amplify-field-group__control'
                    value={formData.name || ''}
                    onChange={handleChange}
                    placeholder="Name"
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
                        value={formData.email || ''}
                        onChange={handleChange}
                        placeholder="Email"
                      />
                    </div>
                  </div>
                </div>
                <div className='amplify-flex amplify-field amplify-textfield'>
                  <label htmlFor="phone_number" className='amplify-label pe-3'>Phone Number</label>
                  <div className='amplify-flex amplify-field-group amplify-field-group--horizontal'>
                    <div className='amplify-field-group__field-wrapper amplify-field-group__field-wrapper--horizontal'>
                      <PhoneInput
                        country={'in'}
                        name="phone_number"
                        className='amplify-input amplify-field-group__control'
                        placeholder="Phone Number"
                        value={formData.phone_number || ''}
                        onChange={handlephoneChange}
                      />
                    </div>
                  </div>
                </div>
                <div className='amplify-flex amplify-field amplify-textfield'>
                  <label htmlFor="doorNo" className='amplify-label pe-3'>Flat, House no., Building, Company, Apartment</label>
                  <div className='amplify-flex amplify-field-group amplify-field-group--horizontal'>
                    <div className='amplify-field-group__field-wrapper amplify-field-group__field-wrapper--horizontal'>
                      <input
                        type="text"
                        name="custom:doorNo"
                        className='amplify-input amplify-field-group__control'
                        value={formData?.['custom:doorNo'] || ''}
                        onChange={handleChange}
                        placeholder="eg. 17/a"
                      />
                    </div>
                  </div>
                </div>
                <div className='amplify-flex amplify-field amplify-textfield'>
                  <label htmlFor="address" className='amplify-label pe-3'>Street / Sector / Area</label>
                  <div className='amplify-flex amplify-field-group amplify-field-group--horizontal'>
                    <div className='amplify-field-group__field-wrapper amplify-field-group__field-wrapper--horizontal'>
                      <input
                      type="text"
                      name="address"
                      className='amplify-input amplify-field-group__control'
                      value={formData.address || ''}
                      onChange={handleChange}
                      placeholder="Street / Sector / Area"
                    /></div></div>
                </div>
                <div className='amplify-flex amplify-field amplify-textfield'>
                  <label htmlFor="address" className='amplify-label pe-3'>Village / town / city</label>
                  <div className='amplify-flex amplify-field-group amplify-field-group--horizontal'>
                    <div className='amplify-field-group__field-wrapper amplify-field-group__field-wrapper--horizontal'>
                      <input
                      type="text"
                      name="custom:addressLine2"
                      className='amplify-input amplify-field-group__control'
                      value={formData?.['custom:addressLine2'] || ''}
                      onChange={handleChange}
                      placeholder="Village / town / city"
                    /></div></div>
                </div>
                <div className='amplify-flex amplify-field amplify-textfield'>
                  <label htmlFor="custom:addressLine3" className='amplify-label pe-3'>Landmark</label>
                  <div className='amplify-flex amplify-field-group amplify-field-group--horizontal'>
                    <div className='amplify-field-group__field-wrapper amplify-field-group__field-wrapper--horizontal'>
                      <input
                      type="text"
                      name="custom:addressLine3"
                      className='amplify-input amplify-field-group__control'
                      value={formData?.['custom:addressLine3'] ? formData?.['custom:addressLine3'] : ''}
                      onChange={handleChange}
                      placeholder="Landmark"
                    /></div></div>
                </div>
                <div className='amplify-flex amplify-field amplify-textfield'>
                  <label htmlFor="Country" className='amplify-label pe-3'>Country</label>
                  <div className='amplify-flex amplify-field-group amplify-field-group--horizontal'>
                    <div className='amplify-field-group__field-wrapper amplify-field-group__field-wrapper--horizontal'>
                      <select className='amplify-select amplify-field-group__control' onChange={handleCountryChange} value={formData?.['custom:countryCode'] || ''}>
                        <option key={formData?.['custom:countryCode'] || ''} value={formData?.['custom:countryCode'] || ''}>{formData?.['custom:country'] || 'Select Country'}</option>
                        {countries.map((country) => <option key={country.isoCode} value={country.isoCode}>{country.name} {country.flag}</option>)}
                        <option value="none"></option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className='amplify-flex amplify-field amplify-textfield'>
                  <label htmlFor="State" className='amplify-label pe-3'>State</label>
                  <div className='amplify-flex amplify-field-group amplify-field-group--horizontal'>
                    <div className='amplify-field-group__field-wrapper amplify-field-group__field-wrapper--horizontal'>
                    <select className='amplify-select amplify-field-group__control' onChange={handleStateChange} value={formData?.['custom:stateCode'] || ''}>
                      <option key={formData?.['custom:stateCode'] || ''} value={formData?.['custom:stateCode'] || ''}>{formData?.['custom:states'] || 'Select State'}</option>
                      {states.map((state) => <option key={state.isoCode} value={state.isoCode}>{state.name}</option>)}
                      <option value="none"></option>
                  </select>
                    </div>
                  </div>
                </div>
                <div className='amplify-flex amplify-field amplify-textfield'>
                  <label htmlFor="City" className='amplify-label pe-3'>District</label>
                  <div className='amplify-flex amplify-field-group amplify-field-group--horizontal'>
                    <div className='amplify-field-group__field-wrapper amplify-field-group__field-wrapper--horizontal'>
                    <select className='amplify-select amplify-field-group__control' onChange={handleCityChange} value={formData?.['custom:districtCode'] || ''}>
                      <option key={formData?.['custom:districtCode'] || ''} value={formData?.['custom:districtCode'] || ''}>{formData?.['custom:district'] || 'Select District'}</option>
                      {cities.map((city) => <option className='country-options' key={city.name} value={city.name}>{city.name}</option>)}
                      <option value="none"></option>
                  </select>
                  </div>
                  </div>
                </div>
                <div className='amplify-flex amplify-field amplify-textfield'>
                  <label htmlFor="pincode" className='amplify-label pe-3'>Pincode</label>
                  <div className='amplify-flex amplify-field-group amplify-field-group--horizontal'>
                    <div className='amplify-field-group__field-wrapper amplify-field-group__field-wrapper--horizontal'>
                    <input
                      type="text"
                      name="custom:pincode"
                      className='amplify-input amplify-field-group__control'
                      value={formData?.['custom:pincode'] || ''}
                      onChange={handleChange}
                      placeholder="Pincode"
                    />
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
            <button className='amplify-button amplify-button--secondary p-2 px-xl-4 me-3' onClick={()=>navigate(-1)}>⬅ Back</button>
            <button className='amplify-button amplify-button--primary p-2 px-xl-4' onClick={handleUpdate}>Update All</button>

            </div>

            {pendingVerification && (
              <div>
                <input
                  type="text"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  placeholder="Enter confirmation code"
                />
                <button className='p-2 px-3 btn-default' onClick={handleConfirm}>Confirm {pendingVerification}</button>
              </div>
            )}

            <p className='message-paragraph'>{message=="Loading"?<ThreeDot variant="bounce" color="#cae8ff" size="200px" text="please wait" textColor="#549acf" />:message}</p>
          </div>
        </div>
      )}
    </main>
    <hr />
    </>
  )
}

export default ProfileUpdate
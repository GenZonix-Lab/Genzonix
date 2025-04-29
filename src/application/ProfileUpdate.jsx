import React, { useEffect, useState } from 'react';
import { Country, State, City }  from 'country-state-city';
import PhoneInput from 'react-phone-input-2'
import { Atom } from 'react-loading-indicators';
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
    <main className="text-center m-3 p-3">
      
      {loading ? (
        <Atom color="#8488df" size="large" text="Please wait..." textColor="#ff00df" />
      ) : (
        <div className="d-flex justify-content-center">
        <div className="userprofile" id='updateprofile'>
          <div className='d-grid justify-content-center align-items-center'>
            <h1>User Details</h1>
            <table className='text-center'>
              <tbody className='text-start'>
                <tr className='address'>
                  <th><label htmlFor="name" className='pe-3'><h4>Name</h4></label></th>
                  <th><h4>:</h4></th>
                  <td>
                    <h4>
                    <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    placeholder="Name"
                  />
                    </h4>
                  </td>
                </tr>
                <tr className='address'>
                  <th><label htmlFor="email" className='pe-3'><h4>Email</h4></label></th>
                  <th><h4>:</h4></th>
                  <td>
                    <h4>
                      <input
                        type="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleChange}
                        placeholder="Email"
                      />
                    </h4>
                  </td>
                </tr>
                <tr className='address'>
                  <th><label htmlFor="phone_number" className='pe-3'><h4>Phone Number</h4></label></th>
                  <th><h4>:</h4></th>
                  <td>
                    <h4>
                      <PhoneInput
                        country={'in'}
                        name="phone_number"
                        placeholder="Phone Number"
                        value={formData.phone_number || ''}
                        onChange={handlephoneChange}
                      />
                    </h4>
                  </td>
                </tr>
                <tr className='address'>
                  <th><label htmlFor="doorNo" className='pe-3'><h4>Door No</h4></label></th>
                  <th><h4>:</h4></th>
                  <td>
                    <h4>
                      <input
                        type="text"
                        name="custom:doorNo"
                        value={formData?.['custom:doorNo'] || ''}
                        onChange={handleChange}
                        placeholder="eg. 17/a"
                      />
                    </h4>
                  </td>
                </tr>
                <tr className='address'>
                  <th><label htmlFor="address" className='pe-3'><h4>Address Line 1</h4></label></th>
                  <th><h4>:</h4></th>
                  <td><h4><input
                      type="text"
                      name="address"
                      className=''
                      value={formData.address || ''}
                      onChange={handleChange}
                      placeholder="Address line 1"
                    /></h4></td>
                </tr>
                <tr className='address'>
                  <th><label htmlFor="address" className='pe-3'><h4>Address Line 2</h4></label></th>
                  <th><h4>:</h4></th>
                  <td><h4><input
                      type="text"
                      name="custom:addressLine2"
                      value={formData?.['custom:addressLine2'] || ''}
                      onChange={handleChange}
                      placeholder="Address line 2"
                    /></h4></td>
                </tr>
                <tr className='address'>
                  <th><label htmlFor="custom:addressLine3" className='pe-3'><h4>Address Line 3</h4></label></th>
                  <th><h4>:</h4></th>
                  <td><h4><input
                      type="text"
                      name="custom:addressLine3"
                      value={formData?.['custom:addressLine3'] ? formData?.['custom:addressLine3'] : ''}
                      onChange={handleChange}
                      placeholder="Address line 3"
                    /></h4></td>
                </tr>
                <tr className='address'>
                  <th><label htmlFor="Country" className='pe-3'><h4>Country</h4></label></th>
                  <th><h4>:</h4></th>
                  <td><h4><select onChange={handleCountryChange} value={formData?.['custom:countryCode'] || ''}>
                      <option key={formData?.['custom:countryCode'] || ''} value={formData?.['custom:countryCode'] || ''}>{formData?.['custom:country'] || 'Select Country'}</option>
                      {countries.map((country) => <option key={country.isoCode} value={country.isoCode}>{country.name} {country.flag}</option>)}
                      <option value="none"></option>
                  </select></h4></td>
                </tr>
                <tr className='address'>
                  <th><label htmlFor="State" className='pe-3'><h4>State</h4></label></th>
                  <th><h4>:</h4></th>
                  <td><h4><select onChange={handleStateChange} value={formData?.['custom:stateCode'] || ''}>
                      <option key={formData?.['custom:stateCode'] || ''} value={formData?.['custom:stateCode'] || ''}>{formData?.['custom:states'] || 'Select State'}</option>
                      {states.map((state) => <option key={state.isoCode} value={state.isoCode}>{state.name}</option>)}
                      <option value="none"></option>
                  </select></h4></td>
                </tr>
                <tr className='address'>
                  <th><label htmlFor="City" className='pe-3'><h4>District</h4></label></th>
                  <th><h4>:</h4></th>
                  <td><h4><select onChange={handleCityChange} value={formData?.['custom:districtCode'] || ''}>
                      <option key={formData?.['custom:districtCode'] || ''} value={formData?.['custom:districtCode'] || ''}>{formData?.['custom:district'] || 'Select District'}</option>
                      {cities.map((city) => <option className='country-options' key={city.name} value={city.name}>{city.name}</option>)}
                      <option value="none"></option>
                  </select></h4></td>
                </tr>
                <tr className='address'>
                  <th><label htmlFor="pincode" className='pe-3'><h4>Pincode</h4></label></th>
                  <th><h4>:</h4></th>
                  <td><h4><input
                      type="text"
                      name="custom:pincode"
                      value={formData?.['custom:pincode'] || ''}
                      onChange={handleChange}
                      placeholder="Pincode"
                    /></h4></td>
                </tr>
              </tbody>
            </table>
            <button className='p-2 px-3 btn-default' onClick={handleUpdate}>Update All</button>

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

            <p>{message}</p>
          </div>
        </div>
      )}
    </main>
    <hr />
    </>
  )
}

export default ProfileUpdate
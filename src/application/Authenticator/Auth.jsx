import React,{useState,useEffect} from 'react'
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import outputs from '../../../amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';
import UserDetails from './UserDetails';
import './Auth.css';

Amplify.configure(outputs);

// Amplify.configure
const Auth = () => {
  const dimension = 380;
  const [user, setUser] = useState(null);
  return (
    <>
    <div className="container-sm p-sm-4">
      <div className="d-lg-flex justify-content-around">
        <div>
          <Authenticator signUpAttributes={['name', 'email', 'phone_number']}>
            {({ signOut, user }) => {
                setUser(user);
                return user ? (
                  <UserDetails user={user} signOut={signOut} />
                ) : null;
              }}
          </Authenticator>
        </div>
        {!user && (
        <div className='text-center d-lg-flex flex-column align-items-start'>
          <hr />
          <div className='title text-start'><h4>Demo Videos</h4></div>
          <div style={{ maxWidth:"90%", margin: "0 auto" }}>
            <div style={{ 
              position:"relative",
              paddingBottom: "56.25%", // 16:9 aspect ratio
              height: 0,
              }}>
              <iframe 
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",

                }}
                height={dimension*0.5625} 
                width={dimension} 
                className='border rounded-3 pt-2'
                src="https://www.youtube.com/embed/IVVWz61G0jk?si=amE_amrFynTJVEhd" 
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                frameBorder="0"
              ></iframe>
            </div>
            <h5 className='text-start pt-2'>Watch the demo video to Login / signUp</h5>
          </div>
          
        </div>
        )}
      </div>
    </div>
    </>
  )
}

export default Auth
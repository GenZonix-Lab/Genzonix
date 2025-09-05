import {useState,useEffect} from 'react'
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import outputs from '../../../amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';
import UserDetails from './UserDetails';
import './Auth.css';

Amplify.configure(outputs);

// Amplify.configure
const Auth = () => {
  const [user, setUser] = useState(null);
  const [videoShown, setVideoShown] = useState(false)

  const handleVideoShow=()=>(
    setVideoShown(!videoShown)
  )

  const handleBackgroundClick = () => {
    if (videoShown) setVideoShown(false)
  }

  return (
    <>
    <div className="container-fluid  p-sm-4">
      <div className={videoShown?'blurred':''} onClick={handleBackgroundClick}>
        <div>
          <Authenticator 
            signUpAttributes={['name']} 
            loginMechanisms={['email']}
          >
            {({ signOut, user }) => <UserDetails user={user} signOut={signOut} setUser={setUser}/>}
          </Authenticator >
          {!user && (
            <div className='d-flex justify-content-center'>
              <button type='button'  className="btn btn-default fs-5 px-5 mb-3" onClick={handleVideoShow}> Watch Video</button>
            </div>)
          }
        </div>
      </div>
      {videoShown && 
        <div className='video-box position-absolute top-50 start-50 translate-middle p-3 rounded shadow-lg'>
          <div style={{ maxWidth:"100%", margin: "0 auto" }}>
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
            className='border rounded-3 pt-2'
            src="https://www.youtube.com/embed/IVVWz61G0jk?si=amE_amrFynTJVEhd" 
            title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            frameBorder="0"
          ></iframe>
        </div>
        <h5 className='text-start p-2 bg-default '>Watch the demo video for Login / signUp</h5>
          </div>
        </div>
      }
    </div>
    </>
  )
}

export default Auth
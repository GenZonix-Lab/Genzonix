import React from 'react'
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(outputs);
const Auth = () => {
  return (
    <>
    <Authenticator className='my-5 pt-5'>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user?.signInDetails.loginId}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
    
    </>
  )
}

export default Auth
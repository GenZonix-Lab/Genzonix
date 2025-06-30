import React,{useState,useEffect} from 'react'
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';
import UserDetails from './UserDetails';
import './Auth.css';

Amplify.configure(outputs);

// Amplify.configure
const Auth = () => {
  return (
    <>
    <div className=".container-sm p-sm-4">
      <Authenticator signUpAttributes={['name', 'email', 'phone_number']}>
      {({ signOut, user }) => <UserDetails user={user} signOut={signOut} />}
      </Authenticator>
    </div>
    <hr />
    </>
  )
}

export default Auth
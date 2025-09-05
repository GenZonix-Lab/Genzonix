import { defineAuth, secret } from '@aws-amplify/backend';
/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders:{
      google: {
        clientId: secret("gid"),
        clientSecret: secret('gst'),
        scopes:["openid", "profile", "email"],
        attributeMapping:{
          email:"email",
          emailVerified:"emailVerified",
          fullname:"name",
        }
      },
      logoutUrls:[
        "https://www.genzonix.in",
        "http://localhost:5173"
      ],
      callbackUrls:[
        "https://www.genzonix.in/profile",
        "http://localhost:5173/profile"
      ],
    }
  },


  userAttributes: {
    fullname: {mutable: true,required: true,},
    phoneNumber: {mutable: true,required: false,},
    "custom:doorNo": {dataType: "String",mutable: true,minLen: 1,maxLen: 300,},
    address: {mutable: true,required: false,},
    "custom:addressLine2": {dataType: "String",mutable: true,minLen: 1,maxLen: 300,},
    "custom:addressLine3": {dataType: "String",mutable: true,minLen: 1,maxLen: 300,},
    "custom:districtCode": {dataType: "String",mutable: true,},
    "custom:district": {dataType: "String",mutable: true,minLen: 1,maxLen: 100,},
    "custom:stateCode": {dataType: "String",mutable: true,},
    "custom:states": {dataType: "String",mutable: true,minLen: 1,maxLen: 100,},
    "custom:countryCode": {dataType: "String",mutable: true,},
    "custom:country": {dataType: "String",mutable: true,minLen: 1,maxLen: 100,},
    "custom:pincode": {dataType: "String",mutable: true,minLen: 5,maxLen: 7,},
  }
});

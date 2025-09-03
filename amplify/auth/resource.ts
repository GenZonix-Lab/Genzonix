import { defineAuth, secret } from '@aws-amplify/backend';
/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      callbackUrls: [
        'https://genzonix.in/profile'
      ],
      logoutUrls: ['https://genzonix.in'],
    }
  },
    
  userAttributes: {
    fullname: {
      mutable: true,
      required: true,
    },
    phoneNumber: {
      mutable: true,
      required: false,
    },    
    "custom:doorNo": {
      dataType: "String",
      mutable: true,
      minLen: 1,
      maxLen: 300,
    },
    address: {
      mutable: true,
      required: false,
    },
    "custom:addressLine2": {
      dataType: "String",
      mutable: true,
      minLen: 1,
      maxLen: 300,
    },
    "custom:addressLine3": {
      dataType: "String",
      mutable: true,
      minLen: 1,
      maxLen: 300,
    },
    "custom:districtCode": {
      dataType: "String",
      mutable: true,
    },
    "custom:district": {
      dataType: "String",
      mutable: true,
      minLen: 1,
      maxLen: 100,
    },
    "custom:stateCode": {
      dataType: "String",
      mutable: true,
    },
    "custom:states": {
      dataType: "String",
      mutable: true,
      minLen: 1,
      maxLen: 100,
    },
    "custom:countryCode": {
      dataType: "String",
      mutable: true,
    },
    "custom:country": {
      dataType: "String",
      mutable: true,
      minLen: 1,
      maxLen: 100,
    },
    "custom:pincode": {
      dataType: "String",
      mutable: true,
      minLen: 5,
      maxLen: 7,
    },

  }
});

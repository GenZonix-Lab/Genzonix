import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { Effect, Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Bucket } from "aws-cdk-lib/aws-s3";

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
});

const { cfnUserPool } = backend.auth.resources.cfnResources;
// an empty array denotes "email" and "phone_number" cannot be used as a username
cfnUserPool.usernameAttributes = [];

const customBucketStack = backend.createStack("custom-bucket-stack");

// Import existing bucket (no region property needed)
const customBucket = Bucket.fromBucketAttributes(customBucketStack, "MyCustomBucket", {
  bucketArn: "arn:aws:s3:::productgenzonix",
});

// Expose bucket details to Amplify clients
backend.addOutput({
  storage: {
    aws_region: backend.stack.region,
    bucket_name: customBucket.bucketName,
    buckets: [
      {
        aws_region: backend.stack.region,
        bucket_name: customBucket.bucketName,
        name: customBucket.bucketName,
        paths: {
          "/*": {
            // "write" and "delete" can also be added depending on your use case
            guest: ["get", "list"],
          },
        },
      },
    ],
  },
});

/*
  Define an inline policy to attach to Amplify's unauth role.
  This policy defines how unauthenticated/guest users can access your existing bucket.
*/
const unauthPolicy = new Policy(backend.stack, "customBucketUnauthPolicy", {
  statements: [
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["s3:GetObject"],
      resources: [`${customBucket.bucketArn}/public/*`],
    }),
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["s3:ListBucket"],
      resources: [`${customBucket.bucketArn}`], // ✅ only bucket ARN allowed
      conditions: {
        StringLike: {
          "s3:prefix": ["public/*"], // ✅ must not start with "/"
        },
      },
    }),
  ],
});

// Attach the policy to the unauthenticated user role
backend.auth.resources.unauthenticatedUserIamRole.attachInlinePolicy(unauthPolicy);
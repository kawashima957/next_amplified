import { cookies } from 'next/headers';
import { getCurrentUser } from '@aws-amplify/auth/server';
import { runWithAmplifyServerContext } from '@/utils/amplifyServerUtils';

// This component is used to render the result of the API call
const AuthFetchResult = ({ description, data }: any) => {
  return (
    <div>
      <p>{description}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

// This page always dynamically renders per request
export const dynamic = 'force-dynamic';

export default async function AuthGetCurrentUserServer() {
  try {
    const currentUser = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentUser(contextSpec),
    });

    return (
      <AuthFetchResult
        description="The API is called on the server side."
        data={currentUser}
      />
    );
  } catch (error) {
    console.error(error);
  }
}
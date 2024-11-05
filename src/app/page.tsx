import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAuthenticated } from '@/utils/amplifyServerUtils';
import AuthenticatorClient from '@/components/AuthenticatorClient';

export default async function Home() {
  const authenticated = await getAuthenticated({ cookies });

  if (authenticated) {
    redirect('/todos');
  }

  return (
    <main>
      <h1>Hello, Next.js App Router with AWS Amplify JavaScript Library v6!</h1>

      <AuthenticatorClient />
    </main>
  );
}
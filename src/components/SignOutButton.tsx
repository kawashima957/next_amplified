'use client';

import { useAuthenticator } from '@aws-amplify/ui-react';
import useAuthRedirect from '@/components/useAuthRedirect';

export default function SignOutButton() {
  useAuthRedirect({
    authhStatus: 'unauthenticated',
    redirectPath: '/',
  });

  const { signOut } = useAuthenticator();

  const handleClick = () => {
    signOut();
  };

  return <button onClick={handleClick}>Sign Out</button>;
}
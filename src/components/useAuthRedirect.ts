'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthenticator } from '@aws-amplify/ui-react';

// NOTE: type AuthStatus = "authenticated" | "configuring" | "unauthenticated"
type AuthStatus = ReturnType<typeof useAuthenticator>['authStatus'];

export default function useAuthRedirect(args: {
  authhStatus: AuthStatus;
  redirectPath: string;
}) {
  const router = useRouter();
  const { authStatus } = useAuthenticator();

  useEffect(() => {
    if (authStatus === args.authhStatus) {
      router.push(args.redirectPath);
      router.refresh();
    }
  }, [router, authStatus, args.authhStatus, args.redirectPath]);
}
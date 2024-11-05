import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import { fetchAuthSession } from 'aws-amplify/auth/server';
import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/api';
import config from '@/amplifyconfiguration.json';
import { cookies } from 'next/headers';

export const { runWithAmplifyServerContext } = createServerRunner({
  config,
});

type NextServerContext = Parameters<
  typeof runWithAmplifyServerContext
>[0]['nextServerContext'];

export const getAuthenticated = async (
  nextServerContext: NextServerContext
) => {
  return await runWithAmplifyServerContext({
    nextServerContext,
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec);
        return session.tokens !== undefined;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  });
};

export const cookieBasedClient = generateServerClientUsingCookies({
  config,
  cookies,
});
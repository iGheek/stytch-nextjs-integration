import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useStytchUser, useStytch } from '@stytch/nextjs';

const OAUTH_TOKEN = 'oauth';
const MAGIC_LINKS_TOKEN = 'magic_links';

const Authenticate = () => {
  const { user, isInitialized } = useStytchUser();
  const stytch = useStytch();
  const router = useRouter();

  useEffect(() => {
    const stytch_token_type = router?.query?.stytch_token_type?.toString();
    const token = router?.query?.token?.toString();
    if (token && stytch_token_type === OAUTH_TOKEN) {
      stytch.oauth.authenticate(token, {
        session_duration_minutes: 30,
      });
    } else if (token && stytch_token_type === MAGIC_LINKS_TOKEN) {
      stytch.magicLinks.authenticate(token, {
        session_duration_minutes: 30,
      });
    }
  }, [router, stytch]);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }
    if (user) {
      router.replace('/profile');
    }
  }, [router, user, isInitialized]);

  return null;
};

export default Authenticate;

"use client";

import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import Model from './Model';
import useAuthModel from '@/hooks/useAuthModel';
import { createClient } from '@supabase/supabase-js'

// import useAuthModal from "@/hooks/useAuthModal";
// import Modal from './Modal';

const AuthModal = () => {
  const { session } = useSessionContext();
  const router = useRouter();
  const { onClose, isOpen } = useAuthModel();


  const supabaseclient = useSupabaseClient();


  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  }

  return (
    <Model
      title="Welcome back"
      description="Login to your account."
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        supabaseClient={supabaseclient}
        providers={['google']}
        magicLink={true}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22c55e'
              }
            }
          }
        }}
        theme="dark"
      />
    </Model>
  );
}

export default AuthModal;
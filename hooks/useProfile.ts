import { useState, useEffect } from 'react';
import { getProfile } from '../lib/services/profile';
import { Profile } from '../lib/types';
import { supabase } from '../lib/supabase/supabase';

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const data = await getProfile(user.id);
      setProfile(data);
      setLoading(false);
    };

    fetchProfile();
  }, []);

  return { profile, setProfile, loading };
};

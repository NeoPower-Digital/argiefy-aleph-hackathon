import { createClient } from '../utils/supabase/client';

const useSupabase = () => {
  const supabase = createClient();

  const getUser = async (userId: string) => {
    let { data: user } = await supabase
      .from('users_data')
      .select('*')
      .eq('user_id', userId);
    return user;
  };

  return { getUser };
};

export default useSupabase;

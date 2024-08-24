import { createClient } from "../utils/supabase/client";

const useSupabase = () => {
  const supabase = createClient();

  const getUser = async (userId: string) => {
    let { data: user } = await supabase
      .from('users_data')
      .select('*')
      .eq('user_id', userId)

    return user
  }


  const validateUserWorldcoin = async (userId: string) => {
    const { data: validatedUser } = await supabase
      .from('users_data')
      .upsert({ user_id: userId, world_id_verified: 'true' })

    return validatedUser;
  }


  return { getUser, validateUserWorldcoin };

}

export default useSupabase;
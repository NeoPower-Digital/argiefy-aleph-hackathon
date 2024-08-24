import { createClient } from "../utils/supabase/client";

const useSupabase = () => {
  const supabase = createClient();

  const getUsers = async () => {
    let { data: users_data } = await supabase
      .from('users_data')
      .select('*')

    return users_data
  }


  return { getUsers };

}

export default useSupabase;
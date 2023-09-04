import cookie from "js-cookie";
import { supabase } from "../supabase";

export const setToken = (token: string) => {
  cookie.set("db_token", token, {
    expires: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
  });
};

export const getToken = async () => {
  const { data } = await supabase.auth.refreshSession();
  return data?.session?.access_token;
};

export const setProfile = (profile: string) => {
  localStorage.setItem("db_profile", profile);
};

export const getProfile = () => {
  let profile = localStorage.getItem("db_profile");
  return profile ? JSON.parse(profile) : null;
};

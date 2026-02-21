import axios from "axios";

const baseURL = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!baseURL || !anonKey) {
    throw new Error("Supabase environment variables are missing!");
}

export const supabaseAxios = axios.create({
    baseURL: `${baseURL}/rest/v1`,
    headers: {
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`,
        'Content-Type': 'application/json'
    },
});

import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://ucaflyfcvwlnmywjdpal.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjYWZseWZjdndsbm15d2pkcGFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwOTY5MTQsImV4cCI6MjA2ODY3MjkxNH0.AwzzUj90Xu6_kHx1NOAlQEe5mUNe6Gpgq5sKkrKnI8o';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
import { createClient } from '@supabase/supabase-js';

// استبدل الروابط أدناه بالبيانات الخاصة بك
const supabaseUrl = 'https://zcmelqcztilcpwjpdqep.supabase.co';
const supabaseKey = sb_publishable_UFSLuw5SOPe0mR5yxG9VbA_yHWpBfdD'

export const supabase = createClient(supabaseUrl, supabaseKey);
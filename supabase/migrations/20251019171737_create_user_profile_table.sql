-- //// table creation ////
CREATE TABLE
    IF NOT EXISTS user_profile (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
        user_id UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL,
        avatar_url VARCHAR(255),
        phone_number VARCHAR(255),
        address_line_1 VARCHAR(255),
        address_line_2 VARCHAR(255),
        city VARCHAR(255),
        state VARCHAR(255),
        country VARCHAR(255),
        postal_code VARCHAR(255),
        stripe_customer_id VARCHAR(255),
        created_at TIMESTAMP
        WITH
            TIME ZONE DEFAULT NOW (),
            updated_at TIMESTAMP
        WITH
            TIME ZONE DEFAULT NOW ()
    );

-- //// table index ////
CREATE INDEX IF NOT EXISTS idx_user_profile_user_id ON public.user_profile USING btree (user_id);

CREATE INDEX IF NOT EXISTS idx_user_profile_username ON public.user_profile USING gin (username);

CREATE INDEX IF NOT EXISTS idx_user_profile_stripe_customer_id ON public.user_profile USING btree (stripe_customer_id);

-- //// table permissions ////
GRANT ALL ON user_profile TO anon,
authenticated,
service_role;

-- //// table owner ////
ALTER TABLE user_profile OWNER TO postgres;

-- //// table policy ////
-- enable RLS policy
ALTER TABLE user_profile ENABLE ROW LEVEL SECURITY;

-- safely drop policy if exists
DROP POLICY IF EXISTS "Service role can manage all user_profile" ON public.user_profile;

-- create policy
CREATE POLICY "Service role can manage all user_profile" ON public.user_profile FOR ALL TO service_role USING (true);
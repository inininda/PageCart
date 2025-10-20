-- //// table creation ////
CREATE TABLE
    IF NOT EXISTS category (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP
        WITH
            TIME ZONE DEFAULT NOW (),
            updated_at TIMESTAMP
        WITH
            TIME ZONE DEFAULT NOW ()
    );

-- //// table index ////
CREATE INDEX IF NOT EXISTS idx_category_name ON category USING gin (name gin_trgm_ops);

-- //// table permissions ////
GRANT ALL ON category TO anon,
authenticated,
service_role;

-- //// table owner ////
ALTER TABLE category OWNER TO postgres;

-- //// table policy ////
-- enable RLS policy
ALTER TABLE category ENABLE ROW LEVEL SECURITY;

-- safely drop policy if exists
DROP POLICY IF EXISTS "Service role can manage all category" ON public.category;

-- create policy
CREATE POLICY "Service role can manage all category" ON public.category FOR ALL TO service_role USING (true);
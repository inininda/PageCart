-- //// table creation ////
CREATE TABLE
    IF NOT EXISTS book (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        price NUMERIC NOT NULL,
        description TEXT NOT NULL,
        image VARCHAR(255) NOT NULL,
        isbn VARCHAR(255) NOT NULL,
        publishedDate TIMESTAMP
        WITH
            TIME ZONE NOT NULL,
            pages INT NOT NULL,
            language VARCHAR(255) NOT NULL,
            publisher VARCHAR(255) NOT NULL,
            inStock BOOLEAN NOT NULL DEFAULT true,
            stockCount INT NOT NULL,
            featured BOOLEAN NOT NULL DEFAULT false,
            bestseller BOOLEAN NOT NULL DEFAULT false,
            newRelease BOOLEAN NOT NULL DEFAULT false,
            tags JSONB NOT NULL,
            created_at TIMESTAMP
        WITH
            TIME ZONE DEFAULT NOW (),
            updated_at TIMESTAMP
        WITH
            TIME ZONE DEFAULT NOW ()
    );

-- //// table indexes ////
CREATE INDEX IF NOT EXISTS idx_book_title ON book USING gin (title gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_book_author ON book USING gin (author gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_book_tags ON book USING gin (tags);

CREATE INDEX IF NOT EXISTS idx_book_featured ON book USING btree (featured);

CREATE INDEX IF NOT EXISTS idx_book_bestseller ON book USING btree (bestseller);

CREATE INDEX IF NOT EXISTS idx_book_new_release ON book USING btree (new_release);

CREATE INDEX IF NOT EXISTS idx_book_in_stock ON book USING btree (in_stock);

-- //// table permissions ////
GRANT ALL ON book TO anon,
authenticated,
service_role;

-- //// table owner ////
ALTER TABLE book OWNER TO postgres;

-- //// table policy ////
-- enable RLS policy
ALTER TABLE book ENABLE ROW LEVEL SECURITY;

-- safely drop policy if exists
DROP POLICY IF EXISTS "Service role can manage all book" ON public.book;

-- create policy
CREATE POLICY "Service role can manage all book" ON public.book FOR ALL TO service_role USING (true);
CREATE TABLE IF NOT EXISTS promotion (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Basic Info
    name VARCHAR(255) NOT NULL,
    description TEXT,
    code VARCHAR(50) UNIQUE, -- Coupon code (nullable for automatic promotions)
    
    -- Promotion Type & Value
    type VARCHAR(50) NOT NULL CHECK (type IN ('percentage', 'fixed_amount', 'buy_x_get_y', 'free_shipping')),
    discount_percentage NUMERIC(5,2) CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
    discount_amount NUMERIC(10,2) CHECK (discount_amount >= 0),
    
    -- Buy X Get Y specific fields
    buy_quantity INT CHECK (buy_quantity > 0),
    get_quantity INT CHECK (get_quantity > 0),
    
    -- Conditions & Limits
    minimum_order_amount NUMERIC(10,2) DEFAULT 0,
    maximum_discount_amount NUMERIC(10,2), -- Cap for percentage discounts
    usage_limit INT, -- Total times promotion can be used
    usage_limit_per_customer INT DEFAULT 1,
    
    -- Timing
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    
    -- Targeting
    applicable_to VARCHAR(50) DEFAULT 'all' CHECK (applicable_to IN ('all', 'specific_books', 'categories', 'authors')),
    target_book_ids UUID[], -- Array of book IDs
    target_categories TEXT[], -- Array of category names
    target_authors TEXT[], -- Array of author names
    
    -- Status & Visibility
    is_active BOOLEAN NOT NULL DEFAULT true,
    is_stackable BOOLEAN NOT NULL DEFAULT false, -- Can be combined with other promotions
    requires_code BOOLEAN NOT NULL DEFAULT false, -- Auto-apply vs coupon code
    is_public BOOLEAN NOT NULL DEFAULT true, -- Visible to all vs targeted customers
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_promotion_code ON promotion(code) WHERE code IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_promotion_active ON promotion(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_promotion_dates ON promotion(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_promotion_type ON promotion(type);
CREATE INDEX IF NOT EXISTS idx_promotion_target_books ON promotion USING gin(target_book_ids);

-- Constraints
ALTER TABLE promotion ADD CONSTRAINT chk_promotion_dates 
    CHECK (end_date > start_date);

ALTER TABLE promotion ADD CONSTRAINT chk_promotion_usage_limits
    CHECK (usage_limit IS NULL OR usage_limit > 0);

ALTER TABLE promotion ADD CONSTRAINT chk_promotion_discount_values
    CHECK (
        (type = 'percentage' AND discount_percentage IS NOT NULL AND discount_amount IS NULL) OR
        (type = 'fixed_amount' AND discount_amount IS NOT NULL AND discount_percentage IS NULL) OR
        (type = 'buy_x_get_y' AND buy_quantity IS NOT NULL AND get_quantity IS NOT NULL) OR
        (type = 'free_shipping')
    );

-- //// table permissions ////
GRANT ALL ON promotion TO anon,
authenticated,
service_role;

-- //// table owner ////
ALTER TABLE promotion OWNER TO postgres;

-- //// table policy ////
-- enable RLS policy
ALTER TABLE promotion ENABLE ROW LEVEL SECURITY;

-- safely drop policy if exists
DROP POLICY IF EXISTS "Service role can manage all promotion" ON public.promotion;

-- create policy
CREATE POLICY "Service role can manage all promotion" ON public.promotion FOR ALL TO service_role USING (true);
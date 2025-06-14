
-- Create products table to store scraped product data
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  image_url TEXT,
  description TEXT,
  affiliate_link TEXT NOT NULL,
  category TEXT,
  platform TEXT CHECK (platform IN ('amazon', 'aliexpress', 'ebay')) NOT NULL,
  rating DECIMAL(2,1),
  discount INTEGER,
  featured BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  is_trending BOOLEAN DEFAULT false,
  price_dropped BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  brand TEXT,
  keywords TEXT[],
  seo_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index on platform for faster queries
CREATE INDEX idx_products_platform ON public.products(platform);

-- Create index on category for filtering
CREATE INDEX idx_products_category ON public.products(category);

-- Create index on created_at for sorting
CREATE INDEX idx_products_created_at ON public.products(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (since this is an affiliate site)
CREATE POLICY "Allow public read access to products" 
  ON public.products 
  FOR SELECT 
  USING (true);

-- Create policy to allow insert/update for authenticated users (admin functionality)
CREATE POLICY "Allow authenticated users to manage products" 
  ON public.products 
  FOR ALL 
  USING (auth.role() = 'authenticated');

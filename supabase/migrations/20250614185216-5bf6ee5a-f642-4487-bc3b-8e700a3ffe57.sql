
-- Create blogs table for dynamic blog management
CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  image_url TEXT,
  link TEXT,
  published_at DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for blogs table
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to blogs
CREATE POLICY "Anyone can view blogs" 
  ON public.blogs 
  FOR SELECT 
  USING (true);

-- Create policy for insert/update/delete (for admin functionality)
CREATE POLICY "Anyone can manage blogs" 
  ON public.blogs 
  FOR ALL 
  USING (true);

-- Create function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for blogs table
CREATE TRIGGER update_blogs_updated_at 
    BEFORE UPDATE ON public.blogs 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Add some sample blog data
INSERT INTO public.blogs (title, excerpt, image_url, link) VALUES 
('10 מבצעי הטק הטובים ביותר השבוע', 'גלו הנחות מדהימות על הגאדג''טים והאלקטרוניקה החדשים ביותר שאתם לא רוצים לפספס.', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop', 'https://example.com/tech-deals'),
('מכשירי מטבח ביתיים הטובים ביותר מתחת ל-400₪', 'שנו את המטבח שלכם בלי לפוצץ את התקציב עם הממצאים המדהימים והחסכוניים האלה.', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop', 'https://example.com/kitchen-deals'),
('טרנדי אופנה 2024: מדריך סטייל במחירים נוחים', 'הישארו אופנתיים בתקציב מוגבל עם המבחר הנבחר שלנו של בגדים אופנתיים ובמחירים נגישים.', 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=300&fit=crop', 'https://example.com/fashion-deals')
ON CONFLICT DO NOTHING;

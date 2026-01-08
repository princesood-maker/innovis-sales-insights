-- Create enum types for standardized dropdowns
CREATE TYPE public.business_area AS ENUM (
  'Telecom Build',
  'Network Implementation',
  'NOC',
  'FLM',
  'Resource Provisioning'
);

CREATE TYPE public.opportunity_status AS ENUM (
  'Prospect',
  'Qualified',
  'RFP',
  'Proposal',
  'Negotiation',
  'Won',
  'Lost'
);

CREATE TYPE public.health_status AS ENUM (
  'Green',
  'Amber',
  'Red'
);

-- User profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user',
  country TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Countries reference table
CREATE TABLE public.countries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  code TEXT NOT NULL UNIQUE,
  region TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Opportunities table (core sales data)
CREATE TABLE public.opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_code TEXT NOT NULL UNIQUE,
  country_id UUID REFERENCES public.countries(id),
  customer_name TEXT NOT NULL,
  business_area public.business_area NOT NULL,
  deal_value DECIMAL(15, 2) NOT NULL DEFAULT 0,
  probability INTEGER NOT NULL DEFAULT 0 CHECK (probability >= 0 AND probability <= 100),
  expected_closure_date DATE,
  creation_date DATE DEFAULT CURRENT_DATE,
  owner_id UUID REFERENCES public.profiles(id),
  status public.opportunity_status NOT NULL DEFAULT 'Prospect',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  created_by UUID REFERENCES auth.users(id)
);

-- Business forecasts table (2-year planning)
CREATE TABLE public.forecasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id UUID REFERENCES public.countries(id) NOT NULL,
  business_area public.business_area NOT NULL,
  year INTEGER NOT NULL,
  quarter INTEGER CHECK (quarter >= 1 AND quarter <= 4),
  expected_revenue DECIMAL(15, 2) DEFAULT 0,
  growth_assumption DECIMAL(5, 2) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  UNIQUE(country_id, business_area, year, quarter)
);

-- Project delivery data (operations tracking)
CREATE TABLE public.project_delivery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id UUID REFERENCES public.countries(id) NOT NULL,
  month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
  year INTEGER NOT NULL,
  -- Planning layer
  planned_sites INTEGER DEFAULT 0,
  planned_teams INTEGER DEFAULT 0,
  planned_revenue DECIMAL(15, 2) DEFAULT 0,
  planning_assumptions TEXT,
  -- Actuals (system driven)
  actual_sites INTEGER DEFAULT 0,
  actual_teams INTEGER DEFAULT 0,
  actual_revenue DECIMAL(15, 2) DEFAULT 0,
  -- Forecast
  forecast_sites INTEGER DEFAULT 0,
  forecast_teams INTEGER DEFAULT 0,
  forecast_revenue DECIMAL(15, 2) DEFAULT 0,
  -- Health
  health_status public.health_status DEFAULT 'Green',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  UNIQUE(country_id, month, year)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forecasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_delivery ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- RLS Policies for countries (read-only for all authenticated)
CREATE POLICY "Authenticated users can view countries" ON public.countries
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert countries" ON public.countries
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update countries" ON public.countries
  FOR UPDATE TO authenticated USING (true);

-- RLS Policies for opportunities (all authenticated users can CRUD)
CREATE POLICY "Authenticated users can view opportunities" ON public.opportunities
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can create opportunities" ON public.opportunities
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update opportunities" ON public.opportunities
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete opportunities" ON public.opportunities
  FOR DELETE TO authenticated USING (true);

-- RLS Policies for forecasts
CREATE POLICY "Authenticated users can view forecasts" ON public.forecasts
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can create forecasts" ON public.forecasts
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update forecasts" ON public.forecasts
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete forecasts" ON public.forecasts
  FOR DELETE TO authenticated USING (true);

-- RLS Policies for project_delivery
CREATE POLICY "Authenticated users can view project_delivery" ON public.project_delivery
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can create project_delivery" ON public.project_delivery
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update project_delivery" ON public.project_delivery
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete project_delivery" ON public.project_delivery
  FOR DELETE TO authenticated USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for auto-updating timestamps
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_opportunities_updated_at
  BEFORE UPDATE ON public.opportunities
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_forecasts_updated_at
  BEFORE UPDATE ON public.forecasts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_project_delivery_updated_at
  BEFORE UPDATE ON public.project_delivery
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for auto-creating profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to generate opportunity code
CREATE OR REPLACE FUNCTION public.generate_opportunity_code()
RETURNS TRIGGER AS $$
DECLARE
  country_code TEXT;
  seq_num INTEGER;
BEGIN
  -- Get country code
  SELECT code INTO country_code FROM public.countries WHERE id = NEW.country_id;
  IF country_code IS NULL THEN
    country_code := 'XX';
  END IF;
  
  -- Get next sequence number for this country
  SELECT COALESCE(MAX(
    CAST(SUBSTRING(opportunity_code FROM '[0-9]+$') AS INTEGER)
  ), 0) + 1 INTO seq_num
  FROM public.opportunities
  WHERE opportunity_code LIKE country_code || '-%';
  
  -- Generate code
  NEW.opportunity_code := country_code || '-' || TO_CHAR(CURRENT_DATE, 'YYMM') || '-' || LPAD(seq_num::TEXT, 4, '0');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER generate_opp_code
  BEFORE INSERT ON public.opportunities
  FOR EACH ROW
  WHEN (NEW.opportunity_code IS NULL OR NEW.opportunity_code = '')
  EXECUTE FUNCTION public.generate_opportunity_code();

-- Insert default countries
INSERT INTO public.countries (name, code, region) VALUES
  ('Singapore', 'SG', 'Asia Pacific'),
  ('India', 'IN', 'Asia Pacific'),
  ('Nigeria', 'NG', 'Africa'),
  ('Kenya', 'KE', 'Africa'),
  ('South Africa', 'ZA', 'Africa'),
  ('Uganda', 'UG', 'Africa'),
  ('Tanzania', 'TZ', 'Africa'),
  ('Ghana', 'GH', 'Africa'),
  ('Rwanda', 'RW', 'Africa'),
  ('Ethiopia', 'ET', 'Africa'),
  ('United Arab Emirates', 'AE', 'Middle East'),
  ('Saudi Arabia', 'SA', 'Middle East'),
  ('United Kingdom', 'GB', 'Europe'),
  ('Germany', 'DE', 'Europe'),
  ('France', 'FR', 'Europe'),
  ('Netherlands', 'NL', 'Europe'),
  ('United States', 'US', 'Americas'),
  ('Brazil', 'BR', 'Americas'),
  ('Australia', 'AU', 'Asia Pacific'),
  ('Japan', 'JP', 'Asia Pacific');
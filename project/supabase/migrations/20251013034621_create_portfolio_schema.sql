/*
  # Portfolio Database Schema - Jötunheim Chronicles
  
  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text) - Project name
      - `description` (text) - Epic narrative description
      - `artifact_type` (text) - Type of artifact (axe, shield, orb, relic)
      - `image_url` (text) - Project screenshot/image
      - `demo_url` (text, optional) - Live demo link
      - `github_url` (text, optional) - Repository link
      - `skills` (text array) - Technologies used
      - `order_index` (integer) - Display order
      - `created_at` (timestamptz)
    
    - `skills`
      - `id` (uuid, primary key)
      - `name` (text) - Skill name
      - `category` (text) - AI, Backend, Frontend, Tools
      - `proficiency` (integer) - 1-100
      - `rune_color` (text) - Hex color for glow effect
      - `order_index` (integer)
      - `created_at` (timestamptz)
    
    - `achievements`
      - `id` (uuid, primary key)
      - `title` (text) - Achievement name
      - `description` (text) - Achievement details
      - `date` (date) - When achieved
      - `icon` (text) - Icon identifier
      - `order_index` (integer)
      - `created_at` (timestamptz)
    
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text) - Sender name
      - `email` (text) - Sender email
      - `message` (text) - Message content
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on all tables
    - Public read access for portfolio content (projects, skills, achievements)
    - No authentication required for viewing
    - Contact messages: anyone can insert, only admin can view
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  artifact_type text DEFAULT 'relic',
  image_url text,
  demo_url text,
  github_url text,
  skills text[] DEFAULT '{}',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text DEFAULT 'general',
  proficiency integer DEFAULT 80,
  rune_color text DEFAULT '#4ECDC4',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  date date DEFAULT CURRENT_DATE,
  icon text DEFAULT 'award',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Public read access for portfolio content
CREATE POLICY "Anyone can view projects"
  ON projects
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view skills"
  ON skills
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view achievements"
  ON achievements
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Contact messages: anyone can insert
CREATE POLICY "Anyone can send messages"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Insert sample data for Rishabh Singh's portfolio
INSERT INTO projects (title, description, artifact_type, skills, order_index) VALUES
('Digital Twin Farming Simulation', 'A realm where virtual crops mirror reality. Through arcane algorithms, this simulation predicts harvest outcomes, optimizes resource allocation, and guides farmers through the digital mirror of their fields.', 'orb', ARRAY['AI', 'Machine Learning', 'Python', 'IoT'], 1),
('YOLOv8 Landslide Detection', 'The all-seeing eye that watches the mountains. This sentinel detects landslide threats with supernatural precision, warning villagers before disaster strikes.', 'shield', ARRAY['Computer Vision', 'Deep Learning', 'YOLOv8', 'PyTorch'], 2),
('Whisky Label Recognition', 'An enchanted lens that reads the ancient scripts of spirits. Using vision beyond mortal sight, it identifies whisky labels with perfect accuracy.', 'relic', ARRAY['Computer Vision', 'TensorFlow', 'OCR', 'Python'], 3),
('Agri-Intelligence Platform', 'A fortress of knowledge for the agricultural realm. This platform unites farmers with AI wisdom, providing insights that turn soil into gold.', 'axe', ARRAY['Full Stack', 'AI', 'React', 'Node.js', 'Cloud'], 4),
('KissanGPT - Voice Assistant', 'A mystical oracle that speaks the language of farmers. This voice-powered companion answers agricultural queries in their native tongue, bridging worlds through conversation.', 'orb', ARRAY['NLP', 'LLM', 'Voice AI', 'Python', 'GPT'], 5);

INSERT INTO skills (name, category, proficiency, rune_color, order_index) VALUES
('Artificial Intelligence', 'AI', 95, '#00D9FF', 1),
('Machine Learning', 'AI', 90, '#4ECDC4', 2),
('Deep Learning', 'AI', 88, '#00A8CC', 3),
('Computer Vision', 'AI', 92, '#0096C7', 4),
('Natural Language Processing', 'AI', 85, '#0077B6', 5),
('Python', 'Backend', 95, '#FFB703', 6),
('TensorFlow', 'AI', 87, '#FB8500', 7),
('PyTorch', 'AI', 85, '#FF6B35', 8),
('React', 'Frontend', 88, '#06FFA5', 9),
('Node.js', 'Backend', 82, '#2EC4B6', 10),
('Cloud Computing', 'Tools', 80, '#A0C4FF', 11),
('Docker', 'Tools', 83, '#9BF6FF', 12);

INSERT INTO achievements (title, description, date, icon, order_index) VALUES
('AI Innovation Award', 'Forged in the fires of competition, this honor recognizes breakthrough contributions to agricultural AI systems.', '2024-03-15', 'trophy', 1),
('Research Publication', 'Ancient knowledge inscribed in academic scrolls, advancing the understanding of intelligent farming systems.', '2023-11-20', 'scroll', 2),
('Hackathon Champion', 'Victor of the 48-hour siege, where code was weapon and creativity was armor.', '2024-01-10', 'sword', 3),
('Open Source Contributor', 'A guardian of the commons, contributing sacred code to benefit all realms.', '2023-09-05', 'shield', 4),
('Tech Speaker', 'A voice that echoes across halls, sharing wisdom with gatherings of fellow warriors.', '2024-05-22', 'horn', 5);
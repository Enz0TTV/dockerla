-- Création de la table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role VARCHAR(50) DEFAULT 'student',
  student_id VARCHAR(50),
  phone VARCHAR(50),
  birth_date DATE,
  address VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Compte administrateur par défaut (mot de passe: admin123)
INSERT INTO users (email, password, first_name, last_name, role, student_id)
VALUES (
  'admin@myges.fr',
  '$2b$10$w8fl5ZVVFnYFOfV6r2MXrOJQezwn90wR3H45E2Xj1aWRwgu6/mWxC',
  'Admin',
  'Système',
  'admin',
  'ADMIN001'
)
ON CONFLICT (email) DO NOTHING;

-- Compte étudiant par défaut pour la démo (mot de passe: password123)
INSERT INTO users (email, password, first_name, last_name, role, student_id, phone, birth_date, address)
VALUES (
  'enzo.g@myges.fr',
  '$2b$10$5G8iftyt/x8iehPSmWLQo./u1nD6hx40IIxfjYLTzoj/tMW2eY0qe',
  'Enzo',
  'G.',
  'B3 Informatique',
  '20240142',
  '06 12 34 56 78',
  '2003-05-15',
  '42 rue de la République, 75011 Paris'
)
ON CONFLICT (email) DO NOTHING;
-- Create students table
create table students (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  nis text not null unique,
  classroom_id uuid not null references classrooms(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table students enable row level security;

-- Create policies for Row Level Security
CREATE POLICY "Students are viewable by everyone" 
  ON students FOR SELECT 
  USING (true);

CREATE POLICY "Students can be inserted by authenticated users" 
  ON students FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Students can be updated by authenticated users" 
  ON students FOR UPDATE 
  USING (true);

CREATE POLICY "Students can be deleted by authenticated users" 
  ON students FOR DELETE 
  USING (true);

-- Create trigger for updated_at
create trigger students_updated_at
before update on students
for each row
execute procedure handle_updated_at();
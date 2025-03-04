-- Create violation_summaries table
create table violation_summaries (
  id uuid default uuid_generate_v4() primary key,
  student_id uuid not null references students(id) on delete cascade,
  violation_id uuid not null references violations(id) on delete cascade,
  date date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table violation_summaries enable row level security;

-- Create trigger for updated_at
create trigger violation_summaries_updated_at
before update on violation_summaries
for each row
execute procedure handle_updated_at();

-- Create indexes for better performance
create index violation_summaries_student_id_idx on violation_summaries(student_id);
create index violation_summaries_violation_id_idx on violation_summaries(violation_id);
create index violation_summaries_date_idx on violation_summaries(date);
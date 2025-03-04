-- Create classrooms table
create table classrooms (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  teacher text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table classrooms enable row level security;

-- Create trigger for updated_at
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger classrooms_updated_at
before update on classrooms
for each row
execute procedure handle_updated_at();
-- Create violations table
create table violations (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  point integer not null,
  categories_id uuid not null references categories(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table violations enable row level security;

-- Create trigger for updated_at
create trigger violations_updated_at
before update on violations
for each row
execute procedure handle_updated_at();

-- Create index on categories_id for better performance
create index violations_categories_id_idx on violations(categories_id);
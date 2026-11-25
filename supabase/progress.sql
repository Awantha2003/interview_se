create table public.lesson_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  item text not null check (char_length(item) between 1 and 100),
  done boolean not null,
  primary key (user_id, item)
);
alter table public.lesson_progress enable row level security;
revoke all on public.lesson_progress from anon, authenticated;
grant select, insert, update on public.lesson_progress to authenticated;
create policy "Read own progress" on public.lesson_progress for select to authenticated using ((select auth.uid()) = user_id);
create policy "Insert own progress" on public.lesson_progress for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Update own progress" on public.lesson_progress for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

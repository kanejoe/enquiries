# Supabase types

A Next.js 13 template for building apps with Radix UI and Tailwind CSS.

## Usage

```bash
npx supabase gen types typescript --project-id "lzbkmmebsqyknmnnqoez" --schema public > lib/database.types.ts
```

## node canvas issue on tests

```bash
cd ./node_modules/canvas && npx node-pre-gyp install --fallback-to-build --update-binary && cd ../..
```

https://github.com/Automattic/node-canvas/issues/2135#issuecomment-1400307682

## Prompt to Purchase

I have a table called 'requisitions' and the column names are below in markdown.

| column_name   |
| ------------- |
| id            |
| parent_id     |
| sequence      |
| is_complete   |
| is_flagged    |
| is_required   |
| is_applicable |
| has_doc       |
| query         |
| reply         |
| status        |

I want to create another table. That table creates a precedent set. It will have a name and subname as fields. The precedent set table will then create any number of requisitions in it. On creation of that precedent set, the row can be locked, so no more requisitions can be added.

What I want to do then, is that a user can clone the precedent set and fill in their own replies in the requisition table. Give me a structure for this.

I have a table called precedent_template, which is hosted in supabase and I have a nextjs14 application. The fields are 'name', 'subname'. There is a separate table called 'requisitions'. The relevant fields in the requisitions table, are 'query', 'reply' and 'precedent_template_id'. So there is a 1 to many relationship between the requisitions and precedent_template tables. Here is what I want to do: A user creates a new precedent_template and creates any number of associated requisitions. Only the query and precedent_template_id fields will be filled in. The reply field will be left blank. When the user is happy with this, then this template can be locked. It can then be cloned by another user, so that the query becomes locked and the reply can be filled in in the new set. Model this for me please.

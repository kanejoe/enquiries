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

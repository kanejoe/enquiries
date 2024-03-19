export const renderers = {
  // Renderer for unordered lists
  ul: ({ node, ...props }: { node?: any }) => (
    <ul className="mb-4 list-disc space-y-2 pl-5 text-sm" {...props} />
  ),
  // Renderer for ordered lists
  ol: ({ node, ...props }: { node?: any }) => (
    <ol className="list-decimal space-y-2 pl-5" {...props} />
  ),
  // Renderer for list items
  li: ({ node, ...props }: { node?: any }) => (
    <li className="ml-4 text-sm" {...props} />
  ),
  p: ({ node, ...props }: { node?: any }) => (
    <p className="text-balance text-sm" {...props} />
  ),
}

import Messages from "./messages"

export default function Login() {
  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <form
        className="flex w-full flex-1 flex-col justify-center gap-2 text-foreground"
        action="/auth/sign-in"
        method="post"
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="mb-6 rounded-md border bg-inherit px-4 py-2"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="mb-6 rounded-md border bg-inherit px-4 py-2"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <button className="mb-2 rounded bg-green-700 px-4 py-2 text-white">
          Sign In
        </button>
        <button
          formAction="/auth/sign-up"
          className="mb-2 rounded border border-gray-700 px-4 py-2 text-black"
        >
          Sign Up
        </button>
        <Messages />
      </form>
    </div>
  )
}

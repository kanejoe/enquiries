import { Spinner } from "@/components/Spinner"

export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-13rem)] items-center justify-center">
      <div className="flex h-[400px] w-[400px] flex-col items-center justify-center space-y-4 rounded-xl border-2 border-gray-400/10 p-24 shadow-sm shadow-gray-400/10">
        <div className="flex items-center justify-center space-x-6">
          <p className="mb-2 font-albertsans text-xl font-semibold tracking-wide text-gray-400 small-caps">
            Loading...
          </p>
          <Spinner className="-mt-1 h-6 w-6 text-gray-400" />
        </div>
        <div className="h-[200px] w-[200px] animate-pulse rounded-lg bg-gray-200" />
        <p className="h-4 w-3/4 animate-pulse bg-gray-200" />
        <p className="h-4 w-1/2 animate-pulse bg-gray-200" />
      </div>
    </div>
  )
}

/* HTML: <div class="loader"></div> */
// .loader {
//   width: 50px;
//   aspect-ratio: 1;
//   border-radius: 50%;
//   border: 8px solid;
//   border-color: #000 #0000;
//   animation: l1 1s infinite;
// }
// @keyframes l1 {to{transform: rotate(.5turn)}}

// https://css-loaders.com/spinner/

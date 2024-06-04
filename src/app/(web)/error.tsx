'use client';

export default function Error({
  error,
  reset,
}: {
  error: string;
  reset: () => void;
}) {
  return (
    <div className='container mx-auto'>
      <h2 className='font-heading text-red-800 mb-10'>Something went wrong!</h2>
      <p>Error: {`${error}`}</p>

      <button onClick={() => reset()} className='btn-primary'>
        Try Again
      </button>
    </div>
  );
}

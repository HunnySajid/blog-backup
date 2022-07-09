const Hero = () => {
  return (
    <>
      <h1 className='text-6xl font-bold'>
        Welcome to{' '}
        <a className='text-blue-600' href='https://hashnode.com/'>
          Hashub
        </a>
      </h1>
      <p className='mt-3 text-2xl'>
        Search hashnode{' '}
        <code className='rounded-md bg-gray-100 p-3 font-mono text-lg'>
          username
        </code>{' '}
        to take blog backup
      </p>
    </>
  );
};

export default Hero;

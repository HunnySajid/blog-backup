export default function Error({ text }) {
  return (
    <div className=' w-full pt-8 pb-8 justify-center lg:max-w-full lg:flex'>
      <div className='border border-gray-400 lg:border-gray-400 bg-gray-100 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal'>
        <div className='mb-4 mt-4'>
          <div className='text-gray-900 font-bold text-xl mb-2'>{text}</div>
        </div>
      </div>
    </div>
  );
}

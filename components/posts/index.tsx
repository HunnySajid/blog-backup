export default function Posts({ posts, author }) {
  return (
    <div className='p-10'>
      {posts?.map((post) => (
        <div key={post._id} className=' w-full pt-8 lg:max-w-full lg:flex'>
          <div
            className='h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden'
            style={{ backgroundImage: `url(${post.coverImage})` }}
            title={post.title}
          />
          <div className='border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal'>
            <div className='mb-8'>
              <div className='text-gray-900 font-bold text-xl mb-2'>
                {post.title}
              </div>
              <p className='text-gray-700 text-base'>{post.brief}</p>
            </div>
            <div className='flex items-center'>
              <div className='text-sm'>
                <p className='text-gray-900 leading-none'>{author}</p>
                <p className='text-gray-600'>{post.dateAdded}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

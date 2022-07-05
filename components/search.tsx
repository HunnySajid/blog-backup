import React from 'react';
type ISearch = {
    onPressSearch: (filter: string) => void
    handleInput: (inputVal: string) => void
    filter: string
    children: any
}
const Search: ISearch = ({ onPressSearch, handleInput, filter }) => {
  return (
    <div className='mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full'>
      <input
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 w-96 p-2.5'
        onChange={handleInput}
        placeholder={'Search username'}
        value={filter}
      />
      <button
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        onClick={onPressSearch}
      >
        {' '}
        Search{' '}
      </button>
    </div>
  )
}
export default Search;

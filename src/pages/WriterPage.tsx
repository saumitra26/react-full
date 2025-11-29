import React from 'react'
import WriterList from '../components/writer/WriterList'

const WriterPage = () => {
  return (
   <>
      <section>
        <div className="max-w-7xl mx-auto py-8">
          <h1 className="text-6xl font-bold text-gray-600 pt-8 text-center">
           Author List
          </h1>
          <div className="h-px bg-gray-300 my-4"></div>
        </div>
      </section>
      <WriterList paginate={false} />
    </>
  )
}

export default WriterPage
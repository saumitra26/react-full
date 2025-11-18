import React from 'react'
import { useBook } from '../context/BookContext'
import { useWriter } from '../context/WriterContext'
const HomePage = () => {
   // const { books } = useBook()
   // console.log("ddd",books)
    const { writers } = useWriter();
     console.log("writers",writers)
  return (
      <div>
          {writers.map((book) =>
              <ul key={ book.id}>
                  <li >{ book.id}</li>
              </ul>
        )}
    </div>
  )
}

export default HomePage
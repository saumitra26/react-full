import React, { type ReactNode } from 'react'

const HomeCard = ({ children, bg = "bg-gray-100" }: { children: ReactNode; bg?: string }) => {
  return (
      <div className={`rounded-md ${bg} shadow px-6 py-8 flex flex-col items-center`}>
          {children}
      </div>
  )
}

export default HomeCard 
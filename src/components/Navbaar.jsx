import React from 'react'

const Navbaar = () => {
  return (
    <nav className='flex bg-violet-600 p-3 text-white justify-between text-xl'>
        <div className="log">
            <span>i-Task</span>
        </div>
        <ul className='flex gap-7'>
            <li className='cursor-pointer hover:font-bold'>Home</li>
            <li className='cursor-pointer hover:font-bold'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbaar

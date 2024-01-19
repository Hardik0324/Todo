import Image from 'next/image'
import Search from './search'
import Table from './Table'
import Body1 from './body1'

export default function Home() {
  return (
    <>
      <div  className='w-100 h-[6vh] bg-gray-100 block'>
      </div>
        <div className='w-100 h-[94vh] bg-gray-100 flex'>
          <div className='w-[5%] h-[100%] bg-[#391E5A]'>
          </div>
          <Body1/>
        </div>
    </>
  )
}

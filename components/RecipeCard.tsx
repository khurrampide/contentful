import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const RecipeCard = ({recipe}:any) => {
  const {title, slug, cookingTime, thumbnail} = recipe.fields
  console.log(recipe)
  return (
    <>
    <div className=''>
      <div className='featured'>
        {/* Featured Image */}
        <Image src={'https:' + thumbnail.fields.file.url}
          width = {thumbnail.fields.file.details.image.width}
          height = {thumbnail.fields.file.details.image.height}
          alt="Marmite"         />

      </div>
      <div className='bg-white '>
        {/* Info */}
        <div className='p-4'>
          <h4 className='my-1 uppercase'>{title}</h4>
          <p className='text-[#777]'>Takes approx {cookingTime} mins to make</p>
        </div>
        {/* Actions */}
        <div className=' flex justify-end '>
          <div className='bg-[#f01b29] py-2 px-5 text-white'>
            <Link href={'/recipes/' + slug}>Cook This</Link> 
          </div>
        </div>
       </div> 
    </div>
    </>
  )
}

export default RecipeCard
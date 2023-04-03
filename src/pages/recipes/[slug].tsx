import React from 'react'
import { createClient } from 'contentful'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID, 
    accessToken: process.env.CONTENTFUL_ACCESS_KEY 
  })

export const getStaticPaths = async ()=>{
    const res = await client.getEntries({content_type: 'recipe'})
    const paths = res.items.map(item => {
        return {
            params: {slug: item.fields.slug}
        }
    })
    return {
        paths,
        fallback: true 
    }
}

export async function getStaticProps({params}){
    const {items} = await client.getEntries({
        content_type: 'recipe',
        'fields.slug': params.slug
    })

    if (!items.length){
        return{
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    //console.log(items[0])
    return{
        props: {
            recipe: items[0],
            revalidate: 1
        }
    }
}

const RecipeDetails = ({recipe}) => {
    //console.log(recipe)
    if (!recipe) return <div>Loading...</div>
    const {featuredImage, title, cookingTime, ingredients, method} = recipe.fields
  return (
    <div className='bg-yellow-500 md:px-[160px] px-[50px]'>
        <div>
            <Image src={'https:' +  featuredImage.fields.file.url} 
                width={featuredImage.fields.file.details.image.width}
                height={featuredImage.fields.file.details.image.height}
                alt={title}
            />
            </div>
            <div className='flex'>
                <div className='bg-red-800 p-2 mb-2 uppercase text-white text-2xl mt-4 font-semibold '>{title}</div>
            </div>
        <div>
            Takes about {cookingTime} mins to cook
            <h3 className='my-2 text-xl text-red-800'>Ingredients:</h3>
            {
                ingredients.map(ing => (
                    <span  key={ing}>{ing}. </span>
                ))
            }
        </div>
        <div >
            <h3 className='my-2 text-xl text-red-800'>Method:</h3>
            <div>{documentToReactComponents(method)}</div>
        </div>
    </div>
  )
}

export default RecipeDetails
import { createClient } from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    apiVersion: '2022-11-25',
    dataset: 'production',
    projectId: 'pdr1t7di',
    useCdn: true,
})

const builder = createImageUrlBuilder(client)
  
export function urlFor(source) {
  return builder.image(source)
}
  
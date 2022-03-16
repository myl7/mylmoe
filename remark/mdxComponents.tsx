import Image from 'next/image'
import { MDXComponents } from 'mdx/types'

// Only for ![]() syntax
export const MdxImage = (props: { src?: string; alt?: string }) => <Image src={props.src!} alt={props.alt!} />

const mdxComponents: MDXComponents = {
  img: MdxImage,
}

export default mdxComponents

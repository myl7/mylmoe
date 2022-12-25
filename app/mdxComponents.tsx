import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'
import { MdLaunch, MdLink } from 'react-icons/md'

/** The caller needs to ensure proper props are passed */
function withClassname<P>(extraClassName: string, Elem: keyof JSX.IntrinsicElements | React.FC<P>) {
  return (props: any) => {
    const { className, ...rest } = props
    return <Elem className={classNames(className, extraClassName)} {...rest} />
  }
}

function requiredProp<T>(prop?: T | null): T {
  if (prop != null && prop != undefined) {
    return prop
  } else {
    throw new Error('Miss required prop')
  }
}

function hx(x: number) {
  return function ({ children, id, ...rest }: { children?: React.ReactNode; id?: string }) {
    // id is set by remark-slug so no need to check it

    const HTag = `h${x}` as keyof JSX.IntrinsicElements
    const Elem = withClassname(classNames(''), HTag)

    return (
      <Elem {...rest}>
        <Link href={`#${id!}`} aria-hidden={true}>
          <MdLink className="" />
        </Link>
        {children}
      </Elem>
    )
  }
}

// classNames wrappers are for TailwindCSS completions
const components = {
  a: ({ href: hrefUnchecked, children, ...rest }: { href?: string; children?: React.ReactNode }) => {
    const href = requiredProp(hrefUnchecked)

    let external = false
    if (href.startsWith('http')) {
      try {
        const url = new URL(href)
        if (url.host != 'myl.moe') {
          external = true
        }
      } catch (e) {}
    }

    const Elem = withClassname(
      classNames('text-blue hover:underline', { 'inline-flex items-center': external }),
      external ? 'a' : Link
    )
    return external ? (
      <Elem href={href} rel="noopener" {...rest}>
        {children}
        <MdLaunch className="w-3.5 h-3.5" />
      </Elem>
    ) : (
      <Elem href={href} {...rest}>
        {children}
      </Elem>
    )
  },

  pre: ({ children, ...rest }: { children?: React.ReactNode }) => (
    <pre {...rest}>
      {React.Children.map(children, (child) =>
        // @ts-ignore New prop to distinguish code in pre
        React.isValidElement(child) ? React.cloneElement(child, { inPre: true }) : child
      )}
    </pre>
  ),

  code: (props: any) => {
    // inPre is set in pre components
    const { inPre, ...rest } = props as { inPre?: true }

    const Elem = withClassname(
      inPre ? classNames('') : classNames('font-mono bg-bg-l2 dark:bg-bg-d2 rounded px-0.5'),
      'code'
    )
    return <Elem {...rest} />
  },

  h1: () => {
    // h1 will be set by other elements with JSX and should only be set in the body
    throw new Error('h1 should not be used in the body')
  },
  h2: hx(2),
  h3: hx(3),
  h4: hx(4),
  h5: hx(5),
  h6: hx(6),

  ul: withClassname(classNames('list-disc pl-4'), 'ul'),
  ol: withClassname(classNames('list-decimal pl-4'), 'ol'),
  summary: withClassname(classNames('cursor-pointer'), 'summary'),
}

export default components

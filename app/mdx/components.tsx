// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

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

/**
 * @param x 2-6
 */
function hx(x: number) {
  return function ({ children, id: idUnchecked, ...rest }: { children?: React.ReactNode; id?: string }) {
    // id is set by remark-slug so no need to check it
    const id = idUnchecked!

    const HTag = `h${x}` as keyof JSX.IntrinsicElements
    const Elem = withClassname(
      classNames('inline-flex items-center gap-0.5', {
        // 'text-2xl': x == 1, // For h1
        'text-xl': x == 2,
        'text-lg': x == 3,
        'text-base': x == 4,
        'text-sm': x == 5,
        'text-xs': x == 6,
      }),
      HTag
    )

    return (
      <div className="w-full">
        <Elem {...rest} id={id}>
          <a href={`#${id}`}>
            <MdLink
              className={classNames({
                'h-5 w-5': x == 2,
                'h-[1.125rem] w-[1.125rem]': x == 3,
                'h-4 w-4': x == 4,
                'h-3.5 w-3.5': x == 5,
                'h-3 w-3': x == 6,
              })}
            />
          </a>
          {children}
        </Elem>
        <hr className="border-bg-l4 dark:border-bg-d4" />
      </div>
    )
  }
}

// classNames wrappers are for TailwindCSS completions
const components = {
  a: ({ href: hrefUnchecked, children, ...rest }: { href?: string; children?: React.ReactNode }) => {
    let href = requiredProp(hrefUnchecked)

    let external = false
    let internal = false
    if (href.startsWith('/')) {
      internal = true
    } else if (href.match(/^https:\/\/myl\.moe(\/|$)/)) {
      internal = true
      href = href.substring('https://myl.moe'.length)
    } else if (href.match(/^[a-z]+:\/\//)) {
      try {
        new URL(href)
        external = true
      } catch (e) {}
    }

    const Elem = withClassname(
      classNames('text-blue hover:underline', { 'inline-flex items-center': external }),
      internal ? Link : 'a'
    )
    return external ? (
      <Elem href={href} rel="noopener" {...rest}>
        {children}
        <MdLaunch className="h-3.5 w-3.5" />
      </Elem>
    ) : (
      <Elem href={href} {...rest}>
        {children}
      </Elem>
    )
  },

  pre: ({ children, ...rest }: { children?: React.ReactNode }) => {
    const Elem = withClassname(
      classNames('bg-bg-l2 dark:bg-bg-d2 rounded px-2 py-1 max-w-full overflow-x-scroll'),
      'pre'
    )

    return (
      <Elem {...rest}>
        {React.Children.map(children, (child) =>
          // @ts-ignore New prop to distinguish code in pre
          React.isValidElement(child) ? React.cloneElement(child, { inPre: true }) : child
        )}
      </Elem>
    )
  },

  // TODO: Language tag, line number
  code: (props: any) => {
    // inPre is set in pre components
    const { inPre, ...rest } = props as { inPre?: true }

    const Elem = withClassname(
      inPre ? classNames('font-mono') : classNames('font-mono bg-bg-l2 dark:bg-bg-d2 rounded px-0.5'),
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

  // TODO: Handle table
  // TODO: Handle img
  // TODO: handle task list in li

  ul: withClassname(classNames('list-disc pl-4'), 'ul'),
  ol: withClassname(classNames('list-decimal pl-4'), 'ol'),
  // TODO: Handle details with proper gap
  summary: withClassname(classNames('cursor-pointer'), 'summary'),
  hr: withClassname(classNames('border-bg-l4 dark:border-bg-d4 w-full'), 'hr'),
  blockquote: withClassname(
    classNames(
      'bg-bg-l2 dark:bg-bg-d2 border border-bg-l4 dark:border-bg-d4 rounded px-2 py-1 max-w-full overflow-x-scroll'
    ),
    'blockquote'
  ),

  // TODO: LaTeX math
  div: ({ className, ...rest }: { className?: string }) => {
    const classes = className?.split(/ +/) ?? []
    if (classes.includes('math')) {
      return <div className="" {...rest} />
    } else {
      return <div className={className} {...rest} />
    }
  },
}

export default components

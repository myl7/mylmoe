import { FaCreativeCommons, FaCreativeCommonsBy, FaCreativeCommonsSa } from 'react-icons/fa'
import { MdLaunch } from 'react-icons/md'

export default function Footer() {
  return (
    <footer className="rounded border-2 border-bg-l4 bg-bg-l1 p-2 font-serif dark:border-bg-d4 dark:bg-bg-d1">
      <p>Copyright (C) 2020-2022 myl7</p>
      <p>
        Posts licensed under{' '}
        <span className="inline-flex items-center" aria-label="CC BY-SA 4.0">
          <FaCreativeCommons className="h-4 w-4" />
          <FaCreativeCommonsBy className="h-4 w-4" />
          <FaCreativeCommonsSa className="h-4 w-4" />
        </span>{' '}
        <a
          href="https://creativecommons.org/licenses/by-sa/4.0/"
          rel="license noopener"
          className="inline-flex items-center text-blue hover:underline"
        >
          CC BY-SA 4.0
          <MdLaunch className="h-3.5 w-3.5" />
        </a>{' '}
        by default, unless otherwise explicitly stated, e.g., in a <span className="italic">License</span> section
      </p>
      <p>
        Code & raw posts available on{' '}
        <a
          href="https://github.com/myl7/mylmoe"
          rel="noopener"
          className="inline-flex items-center font-mono text-blue hover:underline"
        >
          myl7/mylmoe
          <MdLaunch className="h-3.5 w-3.5" />
        </a>
      </p>
      <p>
        <a href="https://icp.gov.moe" rel="noopener" className="inline-flex items-center text-blue hover:underline">
          萌ICP备
          <MdLaunch className="h-3.5 w-3.5" />
        </a>{' '}
        <a
          href="https://icp.gov.moe/?keyword=20210016"
          rel="noopener"
          className="inline-flex items-center text-blue hover:underline"
        >
          20210016
          <MdLaunch className="h-3.5 w-3.5" />
        </a>{' '}
        号
      </p>
      <p>
        Favicon created by{' '}
        <a
          href="https://www.freepik.com"
          title="Freepik"
          rel="noopener"
          className="inline-flex items-center text-blue hover:underline"
        >
          Freepik
          <MdLaunch className="h-3.5 w-3.5" />
        </a>{' '}
        from{' '}
        <a
          href="https://www.flaticon.com"
          title="Flaticon"
          rel="noopener"
          className="inline-flex items-center text-blue hover:underline"
        >
          Flaticon
          <MdLaunch className="h-3.5 w-3.5" />
        </a>
      </p>
    </footer>
  )
}

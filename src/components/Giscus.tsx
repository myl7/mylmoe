import React from 'react'
import { default as GiscusInner } from '@giscus/react'

export default function Giscus() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light')
  // Should only run once in the initial render
  React.useEffect(() => {
    const dark = document.documentElement.classList.contains('dark')
    if (dark && theme != 'dark') {
      setTheme('dark')
    } else if (!dark && theme != 'light') {
      setTheme('light')
    }
  }, [])

  return (
    <div className="min-h-[26rem]">
      <GiscusInner
        id="giscus"
        repo="myl7/mylmoe"
        repoId="MDEwOlJlcG9zaXRvcnkzMDA4MzYxMzI="
        category="Announcements"
        categoryId="DIC_kwDOEe5lJM4CRLe1"
        mapping="title"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme}
        lang="en"
        loading="lazy"
      />
    </div>
  )
}

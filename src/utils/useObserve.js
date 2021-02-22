import {useEffect, useRef, useState} from 'react'

const useObserve = config => {
  const [start, setStart] = useState(false)

  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setStart(true)
      }
    }, config)
    if (ref.current) {
      observer.observe(ref.current)
    }
    return () => observer.disconnect()
  }, [ref.current, config]) // eslint-disable-line react-hooks/exhaustive-deps

  return {start, ref}
}

export default useObserve

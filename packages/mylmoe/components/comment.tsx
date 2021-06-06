import {useEffect, useRef} from 'react'
import {Card} from '@material-ui/core'
import {useSelector} from 'react-redux'
import {State} from '../redux/state'
import site from '../config/site'

const Comment = () => {
  const ref = useRef<HTMLDivElement>()

  const dark = useSelector((state: State) => state.theme.dark)

  useEffect(() => {
    const elem = ref.current
    if (elem) {
      const script = document.createElement('script')
      script.src = 'https://telegram.org/js/telegram-widget.js?14'
      script.async = true
      script.dataset['telegramDiscussion'] = site.tgChannel
      script.dataset['commentsLimit'] = '5'
      script.dataset['colorful'] = '1'
      if (dark) {
        script.dataset['dark'] = '1'
      }

      if (elem.firstChild) {
        elem.removeChild(elem.firstChild)
      }
      elem.appendChild(script)
      return () => {
        try {
          elem.removeChild(script)
        } catch {
        }
      }
    }
  }, [ref, dark])

  return (
    <Card variant="outlined" ref={ref} />
  )
}

export default Comment

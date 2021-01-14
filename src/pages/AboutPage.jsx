import React from 'react'
import BodyPage from './BodyPage'
import Markdown from 'markdown-to-jsx'
import {md2jsxOptions} from '../utils/md2jsx'
import aboutText from '../assets/aboutText.md'

export default () => {
  return (
    <BodyPage title={'About me'} description={
      'It is a pleasure to meet you!'
    } path={'/pages/about'}>
      <Markdown options={md2jsxOptions}>{aboutText}</Markdown>
    </BodyPage>
  )
}

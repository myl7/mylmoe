import React from 'react'
import BodyPage from './BodyPage'
import Markdown from 'markdown-to-jsx'
import {md2jsxOptions} from '../utils/md2jsx'
import privacyPolicyText from '../assets/privacyPolicyText.md'

export default () => {
  return (
    <BodyPage title={'Privacy Policy'} description={
      'As a static and serverless website, This website does not collect any information on its own.\n' +
      'However, external services that this website depends on may collect additional information.'
    } subheader={'Updated on 2021-01-14'} path={'/pages/privacy-policy'}>
      <Markdown options={md2jsxOptions}>{privacyPolicyText}</Markdown>
    </BodyPage>
  )
}

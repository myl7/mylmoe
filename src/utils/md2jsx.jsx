import React from 'react'
import {Accordion, AccordionDetails, AccordionSummary} from '@material-ui/core'
import {ExpandMore as ExpandMoreIcon} from '@material-ui/icons'
import Markdown from 'markdown-to-jsx'
import ExternalLink from '../components/ExternalLink'
import RouterLink from '../components/RouterLink'

const AutoA = props => {
  const {href, className, ...others} = props

  if (href.startsWith('/')) {
    return <RouterLink to={href} {...others} />
  } else {
    return <ExternalLink href={href} {...others} />
  }
}

const Fold = props => {
  const {summary, detail, summaryProps, ...others} = props

  console.log(detail)

  return (
    <Accordion {...others}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} {...summaryProps}>
        <Markdown options={md2jsxOptions}>{
          summary && summary[0] === '{' ? summary.substring(1, summary.length - 1) : summary
        }</Markdown>
      </AccordionSummary>
      <AccordionDetails>
        <Markdown options={md2jsxOptions}>{
          detail && detail[0] === '{' ? detail.substring(1, detail.length - 1) : detail
        }</Markdown>
      </AccordionDetails>
    </Accordion>
  )
}

export const md2jsxOptions = {
  overrides: {
    a: AutoA,
    Fold: {component: Fold}
  }
}

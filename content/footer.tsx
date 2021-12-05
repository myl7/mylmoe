import {Card, CardContent, Typography} from '@material-ui/core'
import ExtLinkRel from '../components/links/extLinkRel'
import ExtLink from '../components/links/extLink'
import IntLink from '../components/links/intLink'
import site from './site'

const Footer = () => {
  const ccProps = (code: string) => ({
    src: `/images/cc/${code}.svg`,
    alt: `${code.toUpperCase()} icon of CC license`,
    width: '22px',
    height: '22px',
    style: {
      verticalAlign: 'text-bottom'
    }
  })

  // noinspection HtmlRequiredAltAttribute Provided with `ccProps`
  return (
    <Card component="footer" variant="outlined" style={{margin: '1em'}}>
      <CardContent>
        <Typography variant="body1">
          Copyright (c) 2020-2021 myl7 | Posts use {''}
          <ExtLinkRel rel="license" href="https://creativecommons.org/licenses/by-nc-sa/4.0">
            CC-BY-SA 4.0
          </ExtLinkRel>
          {' '}
          <ExtLinkRel rel="license" href="https://creativecommons.org/licenses/by-nc-sa/4.0">
            <img {...ccProps('cc')} />
            <img {...ccProps('by')} />
            <img {...ccProps('sa')} />
          </ExtLinkRel>
          , code uses MIT, unless otherwise stated | Released on {''}
          <ExtLink href="https://github.com/myl7/mylmoe">
            myl7/mylmoe
          </ExtLink>
        </Typography>
        <Typography variant="body1">
          <ExtLink href="https://icp.gov.moe">
            萌ICP备
          </ExtLink>
          {' '}
          <ExtLink href={`https://icp.gov.moe/?keyword=${site.moeCode}`}>
            {site.moeCode}
          </ExtLink>
          {' '}
          号
          {' | '}
          Icons made by {''}
          <ExtLink href="https://www.freepik.com" title="Freepik">
            Freepik
          </ExtLink>
          {''} from {''}
          <ExtLink href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </ExtLink>
        </Typography>
        <Typography variant="body1">
          <IntLink href="/pages/privacy-policy">
            Privacy Policy
          </IntLink>
          {' | '}
          <IntLink href="/pages/about">
            About
          </IntLink>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Footer

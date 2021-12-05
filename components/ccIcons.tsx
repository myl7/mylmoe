import {FC} from 'react'
import ExtLinkRel from './links/extLinkRel'

export interface CcIconsProps {
  license: string
}

const CcIcons: FC<CcIconsProps> = props => {
  const {license} = props

  let [licenseSlug, licenseVer] = license.toLowerCase().split(' ')
  if (!licenseSlug || !licenseVer) {
    throw new Error(`Invalid license ${license}`)
  }
  if (licenseSlug.startsWith('cc-')) {
    licenseSlug = licenseSlug.slice(3)
  }
  const licenseUrl = `https://creativecommons.org/licenses/${licenseSlug}/${licenseVer}`

  const ccProps = (code: string) => ({
    key: code,
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
    <span>
      <ExtLinkRel rel="license" href={licenseUrl}>
        {license}
      </ExtLinkRel>
      <img {...ccProps('cc')} />
      {licenseSlug.split('-').map(code => (
        <img {...ccProps(code)} />
      ))}
    </span>
  )
}

export default CcIcons

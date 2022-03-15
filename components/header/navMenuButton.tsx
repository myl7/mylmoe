import React, { FC, useState } from 'react'
import { Button, ButtonProps, Menu, MenuItem, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
import ExtLinkSign from '../links/extLinkSign'

export interface NavMenuButtonProps extends ButtonProps {
  name: string
  list: { name: string; href: string; external?: boolean }[]
}

const NavMenuButton: FC<NavMenuButtonProps> = props => {
  const { name, list, ...others } = props

  const menuId = name.toLowerCase().replace(' ', '-')

  const [elem, setElem] = useState<Element | null>(null)

  const handleClick = (e: React.MouseEvent) => setElem(e.currentTarget)

  const handleClose = () => setElem(null)

  const router = useRouter()

  const handleGo = (href: string, external?: boolean) => () => {
    if (!external) {
      router.push(href)
    } else {
      window.location.assign(href)
    }
  }

  return (
    <>
      <Button variant="outlined" aria-controls={menuId} aria-haspopup={true} onClick={handleClick} {...others}>
        <Typography variant="subtitle1">{name}</Typography>
      </Button>
      <Menu
        id={menuId}
        className="header-menu"
        anchorEl={elem}
        keepMounted
        open={Boolean(elem)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        disableScrollLock={true}
      >
        {list.map(({ name, href, external }) => (
          <MenuItem onClick={handleGo(href, external)} key={name} onAnimationEnd={handleClose}>
            <Typography variant="subtitle1">{name}</Typography>
            {external ? (
              <span className="ext-link">
                <ExtLinkSign />
              </span>
            ) : (
              ''
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default NavMenuButton

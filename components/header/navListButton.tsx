import { FC, useState } from 'react'
import { Collapse, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import { ChevronRight as ChevronRightIcon } from '@material-ui/icons'
import { useRouter } from 'next/router'
import ExtLinkSign from '../links/extLinkSign'

export interface NavListButtonProps {
  name: string
  list: { name: string; href: string; external?: boolean }[]
  handleRootClose?: () => void
}

const NavListButton: FC<NavListButtonProps> = props => {
  const { name, list, handleRootClose = () => 0 } = props

  const [open, setOpen] = useState(false)

  const handleClick = () => setOpen(open => !open)

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
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <ChevronRightIcon color="primary" />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="subtitle1">{name}</Typography>
        </ListItemText>
      </ListItem>
      <Collapse in={open}>
        <List disablePadding>
          {list.map(({ name, href, external }) => (
            <ListItem button key={name} onClick={handleGo(href, external)} onAnimationEnd={handleRootClose}>
              <ListItemText style={{ paddingLeft: '5em' }}>
                <Typography variant="subtitle1">{name}</Typography>
                {external ? (
                  <span className="ext-link">
                    <ExtLinkSign />
                  </span>
                ) : (
                  ''
                )}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  )
}

export default NavListButton

import {FC, useState} from 'react'
import {Collapse, List, ListItem, ListItemIcon, ListItemText, Typography} from '@material-ui/core'
import IntLinkReset from '../links/intLinkReset'
import {ChevronRight as ChevronRightIcon} from '@material-ui/icons'

export interface NavListButtonProps {
  name: string,
  list: {name: string, href: string}[]
}

const NavListButton: FC<NavListButtonProps> = props => {
  const {name, list} = props

  const [open, setOpen] = useState(false)

  const handleClick = () => setOpen(open => !open)

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <ChevronRightIcon color="primary" />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="subtitle1">
            {name}
          </Typography>
        </ListItemText>
      </ListItem>
      <Collapse in={open}>
        <List disablePadding>
          {list.map(({name, href}) => (
            <ListItem button key={name}>
              <ListItemText style={{paddingLeft: '2em'}}>
                <IntLinkReset href={href}>
                  <Typography variant="subtitle1">
                    {name}
                  </Typography>
                </IntLinkReset>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  )
}

export default NavListButton

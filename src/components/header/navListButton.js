import React, {useState} from 'react'
import {Collapse, List, ListItem, ListItemIcon, ListItemText, Typography} from '@material-ui/core'
import IntLinkReset from '../links/intLinkReset'
import {ChevronRight as ChevronRightIcon} from '@material-ui/icons'

const NavListButton = props => {
  const {text, list} = props

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
            {text}
          </Typography>
        </ListItemText>
      </ListItem>
      <Collapse in={open}>
        <List disablePadding>
          {list.map(({text, to}) => (
            <ListItem button key={text}>
              <ListItemText style={{paddingLeft: '2em'}}>
                <IntLinkReset to={to}>
                  <Typography variant="subtitle1">
                    {text}
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

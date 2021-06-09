import {FC, useState} from 'react'
import {Collapse, List, ListItem, ListItemIcon, ListItemText, Typography} from '@material-ui/core'
import {ChevronRight as ChevronRightIcon} from '@material-ui/icons'
import {useRouter} from 'next/router'

export interface NavListButtonProps {
  name: string,
  list: {name: string, href: string}[]
}

const NavListButton: FC<NavListButtonProps> = props => {
  const {name, list} = props

  const [open, setOpen] = useState(false)

  const handleClick = () => setOpen(open => !open)

  const router = useRouter()

  const handleGo = (href: string) => () => router.push(href)

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
            <ListItem button key={name} onClick={handleGo(href)}>
              <ListItemText style={{paddingLeft: '5em'}}>
                <Typography variant="subtitle1">
                  {name}
                </Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  )
}

export default NavListButton

// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import React from 'react'
import NextLink from 'next/link'
import {
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react'
import {
  MdDarkMode,
  MdExpandLess,
  MdExpandMore,
  MdHome,
  MdLightMode,
  MdRefresh,
  MdRssFeed,
  MdSearch,
  MdSubscriptions,
} from 'react-icons/md'
import colorHooks from '../utils/colors'

export default function Header() {
  return <DesktopHeader />
}

export const headerHeight = 45

function DesktopHeader() {
  const colors = {
    textColor: colorHooks.useTextColor(),
    paleTextColor: colorHooks.usePaleTextColor(),
  }

  const { colorMode, toggleColorMode } = useColorMode()

  const resetColorModeToSystem = () => localStorage.removeItem('chakra-ui-color-mode')

  const searchInputRef = React.useRef<HTMLInputElement>(null)
  const getGoogleSiteSearchUrl = (q: string) => {
    const params = new URLSearchParams([
      ['q', q],
      ['as_sitesearch', window.location.origin],
      ['ncr', '1'],
    ])
    return 'https://www.google.com/search?' + params.toString()
  }
  const search = () => {
    const query = searchInputRef.current?.value
    if (query) {
      window.location.href = getGoogleSiteSearchUrl(query)
      // The following one will be blocked by Firefox in searching via Enter
      // window.open(getGoogleSiteSearchUrl(query), '_blank')
    }
  }

  return (
    <Flex
      as="header"
      borderWidth={1.5}
      borderColor={colors.textColor}
      px={1}
      py={2}
      position="fixed"
      w="100%"
      backgroundColor="var(--chakra-colors-chakra-body-bg)"
      zIndex={100} // On top of all other elements
    >
      <HStack>
        {/* Title */}
        <Center pl={3}>
          <Text fontSize="lg" fontWeight="bold" color={colors.textColor}>
            <Tooltip
              hasArrow
              placement="bottom-start"
              label="myl7's blog & utils"
              fontWeight="bold"
              closeOnClick={false}
            >
              mylmoe
            </Tooltip>
          </Text>
        </Center>

        {/* Home */}
        <NextLink href="/" passHref>
          <Button
            as={Link}
            leftIcon={<MdHome />}
            size="sm"
            variant="outline"
            borderWidth={1.5}
            borderColor={colors.textColor}
          >
            Home
          </Button>
        </NextLink>
      </HStack>

      <Spacer />

      <HStack justify="end">
        {/* Search */}
        <InputGroup size="sm" maxW={250} borderColor={colors.textColor}>
          <Input
            type="search"
            placeholder="Search..."
            borderRadius="md"
            borderWidth={1.5}
            ref={searchInputRef}
            onKeyDown={(e) => (e.key == 'Enter' ? search() : null)}
            _placeholder={{ color: colors.paleTextColor }}
          />
          <InputRightAddon borderRadius="md" borderWidth={1.5} borderColor={colors.textColor}>
            <IconButton
              aria-label="Search"
              borderColor={colors.textColor}
              icon={<MdSearch />}
              size="xs"
              variant="outline"
              rounded="full"
              onClick={() => search()}
            />
          </InputRightAddon>
        </InputGroup>

        {/* Color mode */}
        {/* h={32.5} to match the heights of other header elments */}
        <HStack borderWidth={1.5} borderColor={colors.textColor} borderRadius="md" px={3} py={0.5}>
          <Center>
            <Text fontSize="sm" fontWeight="bold" color={colors.textColor}>
              Color:
            </Text>
          </Center>
          <IconButton
            aria-label="Toggle color mode"
            borderColor={colors.textColor}
            icon={colorMode == 'dark' ? <MdDarkMode /> : <MdLightMode />}
            size="xs"
            variant="outline"
            rounded="full"
            onClick={toggleColorMode}
          />
          <IconButton
            aria-label="Reset color mode to system"
            borderColor={colors.textColor}
            icon={<MdRefresh />}
            size="xs"
            variant="outline"
            rounded="full"
            onClick={resetColorModeToSystem}
          />
        </HStack>

        {/* Follow */}
        <Menu matchWidth>
          {({ isOpen }) => (
            <>
              <MenuButton
                isActive={isOpen}
                as={Button}
                size="sm"
                variant="outline"
                borderWidth={1.5}
                borderColor={colors.textColor}
                leftIcon={<MdSubscriptions />}
                rightIcon={isOpen ? <MdExpandLess /> : <MdExpandMore />}
                minW="initial" // <MenuList> minW={0} will affect this so explicitly reset it
              >
                Follow
              </MenuButton>
              {/* minW={0} to shrink menu items */}
              <MenuList minW={0}>
                <NextLink href="/rss.xml" passHref>
                  {/* Use <Icon> to forcibly set icon size, but cause menu item text unaligned */}
                  <MenuItem as={Link} icon={<Icon as={MdRssFeed} w={4} h={4} />} h={8} fontWeight="bold" fontSize="xs">
                    RSS
                  </MenuItem>
                </NextLink>
              </MenuList>
            </>
          )}
        </Menu>
      </HStack>
    </Flex>
  )
}

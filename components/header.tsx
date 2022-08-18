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
  useColorModeValue,
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

export default function Header() {
  return <DesktopHeader />
}

export const headerHeight = 51

function DesktopHeader() {
  const colors = {
    lineColor: useColorModeValue('blackAlpha.800', 'whiteAlpha.800'),
    paleLineColor: useColorModeValue('blackAlpha.700', 'whiteAlpha.700'),
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
      // The following one will be blocked by Firefox
      // window.open(getGoogleSiteSearchUrl(query), '_blank')
    }
  }

  return (
    <Flex as="header" borderWidth={1.5} borderColor={colors.lineColor} px={1} py={2} position="fixed" w="100%">
      <HStack spacing={4}>
        {/* Title */}
        <Center pl={3}>
          <Text fontSize="lg" fontWeight="bold" color={colors.lineColor}>
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
        <Button leftIcon={<MdHome />} size="sm" variant="outline" borderWidth={1.5} borderColor={colors.lineColor}>
          <NextLink href="/" passHref>
            <Link>Home</Link>
          </NextLink>
        </Button>
      </HStack>

      <Spacer />

      <HStack justify="end" spacing={4}>
        {/* Search */}
        <InputGroup size="sm" maxW={250} borderColor={colors.lineColor}>
          <Input
            type="search"
            placeholder="Search..."
            borderRadius="md"
            borderWidth={1.5}
            ref={searchInputRef}
            onKeyDown={(e) => (e.key == 'Enter' ? search() : null)}
            _placeholder={{ color: colors.paleLineColor }}
          />
          <InputRightAddon borderRadius="md" borderWidth={1.5} borderColor={colors.lineColor}>
            <IconButton
              aria-label="Search"
              borderColor={colors.lineColor}
              icon={<MdSearch />}
              size="xs"
              variant="outline"
              rounded="full"
              onClick={() => search()}
            />
          </InputRightAddon>
        </InputGroup>

        {/* Color mode */}
        <HStack borderWidth={1.5} borderColor={colors.lineColor} borderRadius="md" px={3} h={32.5}>
          <Center>
            <Text fontSize="sm" fontWeight="bold" color={colors.lineColor}>
              Color:
            </Text>
          </Center>
          <IconButton
            aria-label="Toggle color mode"
            borderColor={colors.lineColor}
            icon={colorMode == 'dark' ? <MdDarkMode /> : <MdLightMode />}
            size="xs"
            variant="outline"
            rounded="full"
            onClick={toggleColorMode}
          />
          <IconButton
            aria-label="Reset color mode to system"
            borderColor={colors.lineColor}
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
                borderColor={colors.lineColor}
                leftIcon={<MdSubscriptions />}
                rightIcon={isOpen ? <MdExpandLess /> : <MdExpandMore />}
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

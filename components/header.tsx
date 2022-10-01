// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import React from 'react'
import NextLink from 'next/link'
import {
  Box,
  Button,
  Center,
  Collapse,
  Divider,
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
  useBreakpointValue,
  useColorMode,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'
import {
  MdDarkMode,
  MdExpandLess,
  MdExpandMore,
  MdHome,
  MdLightMode,
  MdMenu,
  MdRefresh,
  MdRssFeed,
  MdSearch,
  MdSubscriptions,
} from 'react-icons/md'
import colorHooks from '../utils/colors'

export default function Header() {
  const headerType = useBreakpointValue({ base: 'mobile', md: 'desktop' }, { fallback: 'mobile' }) as
    | 'mobile'
    | 'desktop'
  return { mobile: <MobileHeader />, desktop: <DesktopHeader /> }[headerType]
}

function DesktopHeader() {
  const colors = {
    textColor: colorHooks.useTextColor(),
    paleTextColor: colorHooks.usePaleTextColor(),
  }

  const { colorMode, toggleColorMode } = useColorMode()

  const toast = useToast()

  const resetColorModeToSystem = () => localStorage.removeItem('chakra-ui-color-mode')

  const searchInputRef = React.useRef<HTMLInputElement>(null)
  const search = () => {
    const query = searchInputRef.current?.value
    if (query) {
      window.location.href = getGoogleSiteSearchUrl(query)
      // The following one will be blocked by Firefox in searching via Enter
      // window.open(getGoogleSiteSearchUrl(query), '_blank')
    }
  }

  return (
    <>
      <Flex
        as="header"
        borderWidth="0 0 1.5px"
        borderColor={colors.textColor}
        px={1}
        py={2}
        position="fixed"
        w="100%"
        backgroundColor="var(--chakra-colors-chakra-body-bg)"
        zIndex="banner"
        gap={1}
      >
        <HStack>
          {/* Title */}
          <Center pl={3}>
            <Text fontSize="lg" fontWeight="bold" color={colors.textColor}>
              <NextLink href="/" passHref>
                <Link>mylmoe</Link>
              </NextLink>
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
          <InputGroup size="sm" maxW="250px" borderColor={colors.textColor}>
            <Input
              type="search"
              placeholder="Search..."
              borderRadius="md"
              borderWidth={1.5}
              ref={searchInputRef}
              onKeyDown={(e) => (e.key == 'Enter' ? search() : null)}
              _placeholder={{ color: colors.paleTextColor }}
              sx={{ '&:hover': { borderRightColor: colors.textColor } }}
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
              onClick={() => {
                resetColorModeToSystem()
                toast({
                  title: 'Color mode',
                  description: 'has been reset to follow system perference.',
                  status: 'success',
                  isClosable: true,
                })
              }}
            />
          </HStack>

          {/* Follow */}
          <Menu>
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
                <MenuList>
                  <MenuItem
                    as={Link}
                    href="/rss.xml"
                    icon={<Icon as={MdRssFeed} w={4} h={4} />}
                    h={8}
                    fontWeight="bold"
                    fontSize="sm"
                  >
                    RSS feed
                  </MenuItem>
                  <MenuItem
                    as={Link}
                    href="/atom.xml"
                    icon={<Icon as={MdRssFeed} w={4} h={4} />}
                    h={8}
                    fontWeight="bold"
                    fontSize="sm"
                  >
                    Atom feed
                  </MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
        </HStack>
      </Flex>
      <Box
        // Placeholder to align post with header
        h="50.5px"
      />
    </>
  )
}

const MobileHeader = () => {
  const colors = {
    textColor: colorHooks.useTextColor(),
    paleTextColor: colorHooks.usePaleTextColor(),
  }

  const { colorMode, toggleColorMode } = useColorMode()

  const toast = useToast()

  const resetColorModeToSystem = () => localStorage.removeItem('chakra-ui-color-mode')

  const searchInputRef = React.useRef<HTMLInputElement>(null)
  const search = () => {
    const query = searchInputRef.current?.value
    if (query) {
      window.location.href = getGoogleSiteSearchUrl(query)
    }
  }

  const { isOpen, onToggle } = useDisclosure()

  return (
    <>
      <Flex
        as="header"
        borderWidth="0 0 1.5px"
        borderColor={colors.textColor}
        px={1}
        py={2}
        position="fixed"
        w="100%"
        backgroundColor="var(--chakra-colors-chakra-body-bg)"
        zIndex="banner"
      >
        <HStack>
          {/* Title */}
          <Center pl={3}>
            <Text fontSize="lg" fontWeight="bold" color={colors.textColor}>
              <NextLink href="/" passHref>
                <Link>mylmoe</Link>
              </NextLink>
            </Text>
          </Center>
        </HStack>

        <Spacer />

        <HStack justify="end">
          {/* Color mode */}
          <HStack spacing={0}>
            <IconButton
              aria-label="Reset color mode to system"
              borderColor={colors.textColor}
              icon={<Icon as={MdRefresh} w={5} h={5} />}
              size="sm"
              variant="outline"
              rounded="md"
              onClick={() => {
                resetColorModeToSystem()
                toast({
                  title: 'Color mode',
                  description: 'has been reset to follow system perference.',
                  status: 'success',
                  isClosable: true,
                })
              }}
            />
            <Center>-</Center>
            <IconButton
              aria-label="Toggle color mode"
              borderColor={colors.textColor}
              icon={<Icon as={colorMode == 'dark' ? MdDarkMode : MdLightMode} w={5} h={5} />}
              size="sm"
              variant="outline"
              rounded="md"
              onClick={toggleColorMode}
            />
          </HStack>

          {/* Home */}
          <NextLink href="/" passHref>
            <IconButton
              as={Link}
              aria-label="Go home"
              icon={<Icon as={MdHome} w={5} h={5} />}
              size="sm"
              variant="outline"
              rounded="md"
              borderColor={colors.textColor}
            />
          </NextLink>

          {/* Menu */}
          <IconButton
            aria-label="Toggle menu"
            icon={<Icon as={MdMenu} w={5} h={5} />}
            size="sm"
            variant="outline"
            rounded="md"
            borderColor={colors.textColor}
            onClick={onToggle}
          />
        </HStack>
      </Flex>
      <Box h="50.5px" />
      <Collapse in={isOpen} animateOpacity>
        <VStack px={4} py={2} mt={-2}>
          {/* Search */}
          <InputGroup size="sm" w="100%" borderColor={colors.textColor}>
            <Input
              type="search"
              placeholder="Search..."
              borderRadius="md"
              borderWidth={1.5}
              ref={searchInputRef}
              onKeyDown={(e) => (e.key == 'Enter' ? search() : null)}
              _placeholder={{ color: colors.paleTextColor }}
              sx={{ '&:hover': { borderRightColor: colors.textColor } }}
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

          <HStack justify="end" w="100%">
            {/* Follow */}
            <Center>
              <Text fontSize="sm" fontWeight="bold">
                Follow with
              </Text>
            </Center>
            <VStack spacing={-1}>
              <Center>
                <Text fontSize="xs" fontWeight="bold">
                  RSS
                </Text>
              </Center>
              <IconButton
                as={Link}
                href="/rss.xml"
                aria-label="RSS feed"
                icon={<Icon as={MdRssFeed} w={5} h={5} />}
                size="xs"
                variant="outline"
                rounded="md"
                borderColor={colors.textColor}
              />
            </VStack>
            <VStack spacing={-1}>
              <Center>
                <Text fontSize="xs" fontWeight="bold">
                  Atom
                </Text>
              </Center>
              <IconButton
                as={Link}
                href="/atom.xml"
                aria-label="Atom feed"
                icon={<Icon as={MdRssFeed} w={5} h={5} />}
                size="xs"
                variant="outline"
                rounded="md"
                borderColor={colors.textColor}
              />
            </VStack>
          </HStack>
          <Divider />
        </VStack>
      </Collapse>
    </>
  )
}

function getGoogleSiteSearchUrl(q: string) {
  const params = new URLSearchParams([
    ['q', q],
    ['as_sitesearch', window.location.origin],
    ['ncr', '1'],
  ])
  return 'https://www.google.com/search?' + params.toString()
}

import { useColorModeValue } from '@chakra-ui/react'

const colorHooks = {
  // Edges may also use textColor
  useTextColor: () => useColorModeValue('blackAlpha.800', 'whiteAlpha.800'),
  usePaleTextColor: () => useColorModeValue('blackAlpha.700', 'whiteAlpha.700'),
  useLinkColor: () => useColorModeValue('blue.500', 'blue.300'),
}

export default colorHooks

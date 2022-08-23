import { visit } from 'unist-util-visit'

export default function remarkCodeAsProp() {
  return (tree) => {
    visit(tree, 'code', (node) => {
      const data = node.data || (node.data = {})
      const props = data.hProperties || (data.hProperties = {})
      if (props.dataCode) {
        throw new Error('hast prop data-code has been occupied')
      } else {
        props.dataCode = node.value
      }
    })
  }
}

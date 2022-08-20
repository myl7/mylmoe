export interface Frontmatter {
  title: string
  abstract?: string
  createdDate: string | Date
  updatedDate?: string | Date
  tags?: string
  // Prepare for i18n, currently unused
  lang?: string
}

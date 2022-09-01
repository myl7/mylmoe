// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

export interface Frontmatter {
  title: string
  abstract?: string
  createdDate: string | Date
  updatedDate?: string | Date
  tags?: string | string[]
  // Prepare for i18n, currently unused
  lang?: string
  categories?: string | string[]
  image?: string
}

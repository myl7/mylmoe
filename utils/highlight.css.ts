// Copyright (c) 2020-2022 myl7
// SPDX-License-Identifier: Apache-2.0

// Add this wrapper to help exclude the css from esbuild
// esbuild checks external before plugins, external './node_modules/*' causes plugin to remove css import not working

import 'highlight.js/styles/atom-one-dark.css'

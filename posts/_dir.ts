// These files named /_dir\.[jt]sx?$/ will be matched and processed by dirLoader
// See dirLoader for the impl
// The content will be dropped and has no effect on build output
// However you can still export corresponding types to mock TS and IDE

export default {} as { [fname: string]: string }

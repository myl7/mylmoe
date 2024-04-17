export default function setGiscusTheme(dark: boolean) {
  const iframe = document.querySelector('#giscus')?.shadowRoot?.querySelector('iframe')
  if (!iframe || !iframe.contentWindow) return false
  try {
    iframe.contentWindow.postMessage(
      {
        giscus: {
          setConfig: {
            theme: dark ? 'dark' : 'light',
          },
        },
      },
      'https://giscus.app',
    )
    return true
  } catch {}
  return false
}

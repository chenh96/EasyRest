export function urlToTab(str: string) {
  if (!str || str.length <= 0) {
    return '新请求'
  }

  try {
    let url = new URL(str)
    return url.pathname.length > 1 ? url.pathname : url.host
  } catch (err) {
    return str
  }
}


export default function needFetch () {
  if(process.env.BROWSER && !window.firstTime) {
    window.firstTime = true
    return false
  }
  return true
}

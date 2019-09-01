const $el = document.getElementById('viz')

const VIZ_WIDTH = 900
const VIZ_HEIGHT = 400
const BAR_WIDTH = 5
const BAR_AMOUNT = Math.floor(VIZ_WIDTH / BAR_WIDTH)

const arr = []
const bars = []

let i = 0
while (i < BAR_AMOUNT) {
  arr.push(Math.random())
  i += 1
}

arr.forEach(val => createBar(val))

function createBar(val) {
  const bar = document.createElement('span')
  bar.classList.add('bar')
  bar.style.height = `${VIZ_HEIGHT * val}px`
  bar.style.width = `${BAR_WIDTH}px`
  bar.style.translate = `translateX(${BAR_WIDTH * i})`
  bar.style.backgroundColor = `hsl(${100 * val + 180}, 100%, 50%)`
  $el.appendChild(bar)
  bars.push(bar)
}

const render = bars => {
  bars.forEach((bar, i) => {
    bar.style.height = `${VIZ_HEIGHT * arr[i]}px`
    bar.style.backgroundColor = `hsl(${100 * arr[i] +
      180}, 100%, 50%)`
  })
}

const wait = (t = 10) => new Promise(res => setTimeout(res, t))

const quickSort = async (arr, start, end) => {
  if (start >= end) return

  let index = await partition(arr, start, end)

  await Promise.all([
    quickSort(arr, start, index - 1),
    quickSort(arr, index, end),
  ])
}

const partition = async (arr, start, end) => {
  let currentIndex = start
  let currentVal = arr[end]

  for (let i = start; i < end; i++) {
    if (arr[i] < currentVal) {
      await wait()
      render(bars)

      let temp = arr[i]
      arr[i] = arr[currentIndex]
      arr[currentIndex] = temp
      currentIndex++
    }
  }

  await wait()
  render(bars)

  let temp = arr[currentIndex]
  arr[currentIndex] = arr[end]
  arr[end] = temp
  return currentIndex
}

quickSort(arr, 0, arr.length - 1)

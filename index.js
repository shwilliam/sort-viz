(() => {
  const $viz = document.getElementById('viz')
  const $algoForm = document.getElementById('algorithm-form')
  const $algoFormSelect = document.getElementById('algorithm-select')
  const $randomize = document.getElementById('randomize')

  const VIZ_WIDTH = window.innerWidth || 300
  const VIZ_HEIGHT = 400
  const BAR_AMOUNT = Math.floor(VIZ_WIDTH / 10)

  const bars = []
  let arr = []

  let recentlyRandomized = true

  arr = randomizeBars($viz)

  const sortFns = {
    bubble: (arr) => bubbleSort(arr),
    quick: (arr) => quickSort(arr, 0, arr.length - 1)
  }

  $algoForm.addEventListener('submit', e => {
    e.preventDefault()

    console.log(recentlyRandomized)
    if (!recentlyRandomized) {
      arr = randomizeBars($viz)
    }
    sortFns[$algoFormSelect.value](arr)
    recentlyRandomized = false
  })

  $randomize.addEventListener('click', () => {
    recentlyRandomized = true
    randomizeBars($viz)
  })

  function randomizeBars(container) {
    arr = []
    container.innerHTML = ''

    let i = 0
    while (i < BAR_AMOUNT) {
      arr.push(Math.random())
      i += 1
    }

    const createBar = val => {
      const bar = document.createElement('span')
      bar.classList.add('viz__bar')
      bar.style.height = `${VIZ_HEIGHT * val}px`
      bar.style.backgroundColor = `hsl(${100 * val + 180}, 100%, 50%)`
      container.appendChild(bar)
      bars.push(bar)
    }

    arr.forEach(val => createBar(val))
    return arr
  }

  function render(container, bars) {
    Array.from(container).forEach((bar, i) => {
      bar.style.height = `${VIZ_HEIGHT * arr[i]}px`
      bar.style.backgroundColor = `hsl(${100 * arr[i] +
        180}, 100%, 50%)`
    })
  }

  async function quickSort (arr, start, end) {
    if (start >= end) return

    let index = await partition(arr, start, end)

    await quickSort(arr, start, index - 1)
    await quickSort(arr, index, end)
  }

  async function partition (arr, start, end) {
    let currentIndex = start
    let currentVal = arr[end]

    for (let i = start; i < end; i++) {
      if (arr[i] < currentVal) {
        await wait()
        render($viz.children)

        let temp = arr[i]
        arr[i] = arr[currentIndex]
        arr[currentIndex] = temp
        currentIndex++
      }
    }

    await wait()
    render($viz.children)

    let temp = arr[currentIndex]
    arr[currentIndex] = arr[end]
    arr[end] = temp
    return currentIndex
  }

  async function bubbleSort (arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        const currentVal = arr[j]
        const nextVal = arr[j + 1]
        if (currentVal > nextVal) {
          arr[j + 1] = currentVal
          arr[j] = nextVal
        }

        await wait(0)
        render($viz.children)
      }
    }
  }

  function wait (t = 10) { return new Promise(res => setTimeout(res, t)) }
})()

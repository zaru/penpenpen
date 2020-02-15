const canvas = document.getElementById('canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d')
canvas.setAttribute('width', document.body.clientWidth.toString())
canvas.setAttribute('height', document.body.clientHeight.toString())

const pen = {
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    drawing: false
}

document.getElementById('download').addEventListener('click', () => {
    console.log('aa')
    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    link.download = 'penpenpen.png'
    link.click()
})

document.addEventListener('keydown', event => {
    if (event.isComposing || event.keyCode === 229) {
        return
    }
    if (['f', 'j'].includes(event.key)) {
        pen.drawing = true
        pen.startX = pen.x
        pen.startY = pen.y
    }
})

document.addEventListener('keyup', () => {
    pen.drawing = false
})

canvas.addEventListener('mousemove', event => {
    if (!(event.target instanceof HTMLElement)) {
        return
    }
    const rect = event.target.getBoundingClientRect()
    pen.x = event.clientX - rect.left - 1
    pen.y = event.clientY - rect.top - 1

    if (pen.drawing) {
        ctx.beginPath()
        ctx.moveTo(pen.startX, pen.startY)
        ctx.lineTo(pen.x, pen.y)
        ctx.strokeStyle = 'black'
        ctx.stroke()
        pen.startX = pen.x
        pen.startY = pen.y
    }
})
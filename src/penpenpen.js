const pen = {
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    drawing: false
};
const DrawHistory = {
    list: [],
    ctx: null,
    width: 0,
    height: 0,
    stack() {
        const image = this.ctx.getImageData(0, 0, this.width, this.height);
        this.list.push(image);
    },
    pop() {
        const image = this.list.pop();
        this.ctx.putImageData(image, 0, 0);
    }
};
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const documentWidth = document.body.clientWidth;
const documentHeight = document.body.clientHeight;
canvas.setAttribute('width', documentWidth.toString());
canvas.setAttribute('height', documentHeight.toString());
DrawHistory.ctx = ctx;
DrawHistory.width = documentWidth;
DrawHistory.height = documentHeight;
document.getElementById('download').addEventListener('click', () => {
    console.log('aa');
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'penpenpen.png';
    link.click();
});
document.addEventListener('keydown', event => {
    if (event.isComposing || event.keyCode === 229) {
        return;
    }
    if (['f', 'j'].includes(event.key)) {
        if (!pen.drawing) {
            DrawHistory.stack();
        }
        pen.drawing = true;
        pen.startX = pen.x;
        pen.startY = pen.y;
    }
    if (event.key === 'z' && (event.ctrlKey || event.metaKey)) {
        console.log('press z');
        DrawHistory.pop();
    }
});
document.addEventListener('keyup', () => {
    pen.drawing = false;
});
canvas.addEventListener('mousemove', event => {
    if (!(event.target instanceof HTMLElement)) {
        return;
    }
    const rect = event.target.getBoundingClientRect();
    pen.x = event.clientX - rect.left - 1;
    pen.y = event.clientY - rect.top - 1;
    if (pen.drawing) {
        ctx.beginPath();
        ctx.moveTo(pen.startX, pen.startY);
        ctx.lineTo(pen.x, pen.y);
        ctx.strokeStyle = 'black';
        ctx.stroke();
        pen.startX = pen.x;
        pen.startY = pen.y;
    }
});
//# sourceMappingURL=penpenpen.js.map

export function useCanvas (canvas: Ref<HTMLCanvasElement | null>) {
  function drawImage (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    x: number,
    y: number,
    w: number,
    h: number,
    offsetX = 0.5,
    offsetY = 0.5,
  ): void {
    if (arguments.length === 2) {
      x = y = 0
      w = ctx.canvas.width
      h = ctx.canvas.height
    }

    // keep bounds [0.0, 1.0]
    if (offsetX < 0) {
      offsetX = 0
    }
    if (offsetY < 0) {
      offsetY = 0
    }
    if (offsetX > 1) {
      offsetX = 1
    }
    if (offsetY > 1) {
      offsetY = 1
    }

    const iw = img.width
    const ih = img.height
    const r = Math.min(w / iw, h / ih)
    let nw = iw * r
    let nh = ih * r
    let cx; let cy; let cw; let ch; let ar = 1

    if (nw < w) {
      ar = w / nw
    }
    if (Math.abs(ar - 1) < 1e-14 && nh < h) {
      ar = h / nh
    }
    nw *= ar
    nh *= ar

    cw = iw / (nw / w)
    ch = ih / (nh / h)

    cx = (iw - cw) * offsetX
    cy = (ih - ch) * offsetY

    if (cx < 0) {
      cx = 0
    }
    if (cy < 0) {
      cy = 0
    }
    if (cw > iw) {
      cw = iw
    }
    if (ch > ih) {
      ch = ih
    }

    ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h)
  }

  function setImage (avatar: string) {
    if (!canvas.value) {
      return false
    }

    const ctx = canvas.value.getContext('2d') as CanvasRenderingContext2D

    const img: HTMLImageElement = new Image()
    img.addEventListener('load', () => {
      drawImage(ctx, img, 0, 0, canvas.value!.width, canvas.value!.height)
    }, false)

    img.src = avatar

    return true
  }

  return {
    setImage,
  }
}

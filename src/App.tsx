import React from 'react'

import './App.css'

interface Position {
  x: number
  y: number
}

const points: Position[] = [
  { x: 0.2, y: 0 },
  { x: 0.5, y: 1 },
  { x: 0.8, y: 0 },
  { x: 0, y: 0.5 },
  { x: 1, y: 0.5 },
  { x: 0.2, y: 0 },
]

export function App() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect((): (() => void) | void => {
    if (!canvasRef.current) return

    const ctx: CanvasRenderingContext2D | null =
      canvasRef.current.getContext('2d')

    if (!ctx) return

    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    let frameHandle: number
    let prevTime: number = 0

    let pointIndex: number = 0
    let pointTime: number = 0

    const animationFrame: FrameRequestCallback = (
      time: DOMHighResTimeStamp,
    ): void => {
      const elapsedTime: number = time - prevTime

      if (elapsedTime < 0) {
        frameHandle = window.requestAnimationFrame(animationFrame)
        return
      }

      pointTime += elapsedTime

      const progress = Math.min(1, pointTime / 2000)

      const point = points[pointIndex]
      const nextPoint = points[pointIndex + 1]

      if (!point || !nextPoint) return

      const startPos: Position = {
        x: point.x * ctx.canvas.width,
        y: point.y * ctx.canvas.height,
      }
      let endPos: Position = {
        x:
          (point.x * (1 - progress) + nextPoint.x * progress) *
          ctx.canvas.width,
        y:
          (point.y * (1 - progress) + nextPoint.y * progress) *
          ctx.canvas.height,
      }

      let grad: CanvasGradient = ctx.createLinearGradient(
        startPos.x,
        startPos.y,
        endPos.x,
        endPos.y,
      )
      grad.addColorStop(0, '#FF0000')
      grad.addColorStop(1, '#0000FF')

      ctx.beginPath()
      ctx.moveTo(startPos.x, startPos.y)
      ctx.lineTo(endPos.x, endPos.y)

      ctx.strokeStyle = grad
      ctx.stroke()

      endPos = {
        x:
          (point.x * (1 - progress) + nextPoint.x * progress) *
          ctx.canvas.width,
        y: nextPoint.y * ctx.canvas.height,
      }

      grad = ctx.createLinearGradient(
        startPos.x,
        startPos.y,
        endPos.x,
        endPos.y,
      )
      grad.addColorStop(0, '#FF0000')
      grad.addColorStop(1, '#0000FF')

      ctx.beginPath()
      ctx.moveTo(startPos.x, startPos.y)
      ctx.lineTo(endPos.x, endPos.y)

      ctx.strokeStyle = grad
      ctx.stroke()

      // endPos = {
      //   x: nextPoint.x * ctx.canvas.width,
      //   y:
      //     (point.y * (1 - progress) + nextPoint.y * progress) *
      //     ctx.canvas.height,
      // }

      // grad = ctx.createLinearGradient(
      //   startPos.x,
      //   startPos.y,
      //   endPos.x,
      //   endPos.y,
      // )
      // grad.addColorStop(0, '#FF0000')
      // grad.addColorStop(1, '#0000FF')

      // ctx.beginPath()
      // ctx.moveTo(startPos.x, startPos.y)
      // ctx.lineTo(endPos.x, endPos.y)

      // ctx.strokeStyle = grad
      // ctx.stroke()

      if (progress >= 1) {
        pointTime = 0
        pointIndex++
      }

      prevTime = time
      frameHandle = window.requestAnimationFrame(animationFrame)
    }
    frameHandle = window.requestAnimationFrame(animationFrame)

    return () => cancelAnimationFrame(frameHandle)
  }, [])

  return <canvas width={1440} height={1440} ref={canvasRef} />
}

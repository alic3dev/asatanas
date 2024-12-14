import type { Position } from '@/types'

import React from 'react'

import styles from '@/apps/App.module.css'

export function AppThree(): React.ReactElement {
  const appString: string = `58533665 798646767 7847568797 453427658798797 8766554586876 53424376576598787 87764656587676 454354746575`

  const appStringMax: number = appString
    .split('')
    .reduce((p: number, c: string): number => {
      const charCode = c.charCodeAt(0)

      return p > charCode ? p : charCode
    }, 0)

  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const mousePosition = React.useRef<Position>({ x: 0, y: 0 })

  React.useEffect((): (() => void) | void => {
    if (!canvasRef.current) return

    const ctx: CanvasRenderingContext2D | null =
      canvasRef.current.getContext('2d')

    if (!ctx) return

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    const canvas: HTMLCanvasElement = ctx.canvas

    let frameHandle: number

    let frameCount: number = 0

    const animationFrame: FrameRequestCallback = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const imageData: ImageData = new ImageData(canvas.width, canvas.height)

      for (let x: number = 0; x < imageData.width; x++) {
        const xProgress: number = x / imageData.width

        for (let y: number = 0; y < imageData.height; y++) {
          const yOffset: number = y * imageData.width
          const index: number = (x + yOffset) * 4

          // const yProgress: number = y / imageData.height

          imageData.data[index] =
            ((Math.sin(xProgress + frameCount * Math.PI) + 1) / 2) * 255
          imageData.data[index + 1] = imageData.data[index + 2] = 255
          imageData.data[index + 3] = 255
        }
      }

      ctx.putImageData(imageData, 0, 0)

      frameCount++
      frameHandle = window.requestAnimationFrame(animationFrame)
    }
    frameHandle = window.requestAnimationFrame(animationFrame)

    return (): void => {
      window.cancelAnimationFrame(frameHandle)
    }
  }, [appString, appStringMax])

  const onMouseMove = React.useCallback<
    React.MouseEventHandler<HTMLCanvasElement>
  >((event: React.MouseEvent<HTMLCanvasElement>): void => {
    mousePosition.current.x = event.clientX
    mousePosition.current.y = event.clientY
  }, [])

  return (
    <canvas
      className={`${styles.fit} ${styles['hue-rotate']}`}
      width={720}
      height={270}
      ref={canvasRef}
      onMouseMove={onMouseMove}
    />
  )
}

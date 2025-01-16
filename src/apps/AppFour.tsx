import React from 'react'

import styles from '@/apps/App.module.css'

function initImageData(width: number, height: number): ImageData {
  return new ImageData(width, height, {
    colorSpace: 'srgb',
  })
}

export function AppFour(): React.ReactElement {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const imageDataRef = React.useRef<{ imageData?: ImageData }>({})

  React.useEffect((): (() => void) | void => {
    if (!canvasRef.current) return

    const ctx: CanvasRenderingContext2D | null =
      canvasRef.current.getContext('2d')

    if (!ctx) return

    if (!imageDataRef.current.imageData) {
      imageDataRef.current.imageData = initImageData(
        ctx.canvas.width,
        ctx.canvas.height,
      )
    }

    const imageData: ImageData = imageDataRef.current.imageData

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    let frameHandle: number

    let frameCount: number = 0

    const animationFrame: FrameRequestCallback = (): void => {
      if (frameCount >= Number.MAX_SAFE_INTEGER) {
        frameCount = 0
      }

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

      for (let x: number = 0; x < imageData.width; x++) {
        for (let y: number = 0; y < imageData.height; y++) {
          const yOffset: number = y * imageData.width
          const index: number = (x + yOffset) * 4

          imageData.data[index] = (frameCount + x) % 255
          imageData.data[index + 1] = (frameCount + 3 + x + y) % 255
          imageData.data[index + 2] = (frameCount + 2 + y) % 255
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
  }, [])

  return (
    <>
      <canvas
        className={`${styles.fit} ${styles['hue-rotate']}`}
        width={1920}
        height={1080}
        ref={canvasRef}
      />
    </>
  )
}

import type { Position } from '@/types'

import React from 'react'

import styles from '@/apps/App.module.css'

export function AppTwo(): React.ReactElement {
  const appString: string = `
    BeelzeAboveBelowOhHowItShowsWhatWeDontKnowYetSeemToBestow. 
    To Say no mo' of what is in store, it's quite a Bore, my lovely deadly whore. 

    Calling from or calling to, all that's known is what's shown to you. 
    Vero we, des clancasi, mes peitos es fre, es neidos es reit. 
    Porle porle, es muenos la clay. Forlei ze no, de ino es mo. 

    Aqwerie te ni, esta un miedras es zantos e reit. 
    Plonas planos esquipas te reidos, alto es mo, to no geu xay... 
    
    Lotos y undos y todos y gue. Weirtas gholl po heitras y tu.

    Derquirtos es las, habochos e e dou.

    Abado es mau.

    Li-tilth es filth.

    Forever stuck in your own wilt.
  `

  const appStringMax = appString
    .split('')
    .reduce(
      (p: number, c: string) => (p > c.charCodeAt(0) ? p : c.charCodeAt(0)),
      0,
    )

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
      const evenFrame: boolean = frameCount % 2 === 0

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const imageData: ImageData = new ImageData(canvas.width, canvas.height)

      const cache: Position<number[]> = {
        x: [],
        y: [],
      }

      const mouseSum: number = mousePosition.current.x + mousePosition.current.y

      for (let x: number = 0; x < imageData.width; x++) {
        cache.x.push(
          Math.abs(
            Math.sin(
              (appString.charCodeAt(
                (x + frameCount + mousePosition.current.x) % appString.length,
              ) /
                appStringMax) *
                Math.PI,
            ),
          ),
        )

        for (let y: number = 0; y < imageData.height; y++) {
          const yOffset: number = y * imageData.width
          const index: number = (x + yOffset) * 4

          if (
            (evenFrame && x % 2 !== 0) ||
            (!evenFrame && x % 2 === 0) ||
            (evenFrame && y % 2 !== 0) ||
            (!evenFrame && y % 2 === 0)
          ) {
            imageData.data[index] = 0
            imageData.data[index + 1] = 0
            imageData.data[index + 2] = 0
            imageData.data[index + 3] = 255

            continue
          }

          if (!cache.y[y]) {
            cache.y.push(
              Math.abs(
                Math.sin(
                  (appString.charCodeAt(
                    (y + frameCount + mousePosition.current.y) %
                      appString.length,
                  ) /
                    appStringMax) *
                    Math.PI,
                ),
              ),
            )
          }

          const valThree: number = Math.abs(
            Math.sin(
              (appString.charCodeAt(
                (frameCount + x + y + mouseSum) % appString.length,
              ) /
                appStringMax) *
                Math.PI,
            ),
          )

          const val = cache.x[x] + cache.y[y] + valThree > 2 ? 255 : 0

          imageData.data[index] = val * cache.x[x]
          imageData.data[index + 1] = val * cache.y[y]
          imageData.data[index + 2] = val * valThree
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

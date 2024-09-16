import React, { MouseEventHandler } from 'react'

import './App.css'

interface Position<T = number> {
  x: T
  y: T
}

export function App(): React.ReactNode {
  const appString: string = `'lwl:F$*2kpajdO(*kjksapkJDJAB%JFJjs0(*#$)-=209*$#IJ2oa2khjdf0s9jhv#$)iFz0ek220j2koJFlw8u3FJGVFHalkJFJlwl:FJDJAB%$*'adsfjue93qwe"ASDFicjJFooiRYEL@#(*@#)((*Ueuiwe*(WRhj34jkhjdf0s9jhvkjoejaCZKozEerj2Fz0ek2200(jeQjl20JDFKBVj2koaJBU!(@#*983spJpajdOFHalkJFJlwl:FJDJAB%$*2ks0(*#$)-=209*$#IJFlw8u3FJGVNSS??><f,/siqwe"A'adsfjue93oaicjJFo*(WRhj320JoiRYELSDF@#(*@#)((*UeuiweDFKBVCZKJBU!(@#*9834jkhjdf0s9jhvkjoeja0(jeQjlsozEerj2Fz0ek220j2koapJpajdOFHalJFlw8u3FJGVNSS??><f,/siqwe"ASD'adsfjue93oaicjJFooiRYEL@#(*@#)((*Ueuiwe*(WRhj320JDFKBVCZKJBU!(@#*9834jkhjdf0s9jhvkjoeja0(jeQjlsozEerj2Fz0ek220j2koapJpajdOFHalkJFJlwl:FJDJAB%$*2ks0(*#$)-=209*$#IJFlw8u3FJGVNSS??><f,/siqwe"ASDF'adsfjue93oaicjJFooiRYEL@#(*@#)((*Ueuiwe*(WRhj320JDFKBVCZKJBU!(@#*9834jkhjdf0s9jhvkjoeja0(jeQjlsozEerj2Fz0ek220j2koapJpajdOFHalkJFJlwl:FJDJAB%$*2ks0(*#$)-=209*$#IJFlw8u3FJGVNSS??><f,/siqwe"ASDF'adsfjue93oaicjJFooiRYEL@#(*@#)((*Ueuiwe*(WRhj320JDFKBVCZKJBU!(@#*9834jkhjdf0s9jhvkjoeja0(jeQjlsozEerj2Fz0ek220j2koapJpajdOFHalkJFJlwl:FJDJAB%$*2ks0(*#$)-=209*$#IJFlw8u3FJGVNSS??><f,/siqwe"ASDF'adsfjue93oaicjJFooiRYEL@#(*@#)((*Ueuiwe*(WRhj320JDFKBVCZKJBU!(@#*9834jkhjdf0s9jhvkjoeja0(jeQjlsozEerj2Fz0ek220j2koapJpajdOFHalkJFJlwl:FJDJAB%$*2ks0(*#$)-=209*$#0NSS??><f,/s-=209*$#IJFlw8u3FJGVNSS??><f,/siqwe"ASDF'adsfjue93oaicjJFooiRYEL@#(*@#)((*Ueuiwe*(WRhj320JDFKBVCZKJBU!(@#*9834jkhjdf0s9jhvkjoeja0(jeQjlsozEerj2Fz0ek220j2koapJpajdOFHalkJFJlwl:FJDJAB%$*2ks0(*#$)-=209*$#IJFlw8u3FJGVNSS??><f,/siqwe"ASDF'adsfjue93oaicjJFooiRYEL@#(*@#)((*Ueuiwe*(WRhj320JDFKBVCZKJBU!(@#*9834jkhjdf0s9jhvkjoeja0(jeQjlsozEerj2Fz0ek220j2koapJpajdOFHalkJFJlwl:FJDJAB%$*2ks0(*#$)-=209*$#IJFlw8u3FJGVNSS??><f,/siqwe"ASDF'adsfjue93oaicjJFooiRYEL@#(*@#)((*Ueuiwe*(WRhj320JDFKBVCZKJBU!(@#*9834jkhjdf0s9jhvkjoeja0(jeQjlsozEerj2Fz0ek220j2koapJpajdOFHalkJFJlwl:FJDJAB%$*2ks0(*#$)-=209*$#IJFlw8u3FJGVNSS??><f,/siqwe"ASDF'adsfjue93oaicjJFooiRYEL@#(*@#)((*Ueuiwe*(WRhj320JDFKBVCZKJBU!(@#*9834jkhjdf0s9jhvkjoeja0(jeQjlsozEerj2Fz0ek220j2koapJpajdOFHalkJFJlwl:FJDJAB%$*2ks0(*#$)-=209*$#IJFlw8u3FJGVNSS??><f,/siqwe"ASDF'adsfjue93oaicjJFooiRYEL@#(*@#)((*Ueuiwe*(WRhj320JDFKBVCZKJBU!(@#*9834jkhjdf0s9jhvkjoeja0(jeQjlsozEerj2Fz0ek220j2koapJpajdOFHalkJFJlwl:FJDJAB%$*2ks0(*#$)-=209*$#IJFlw8u3FJGVNSS??><f,/siqwe"ASDF'adsfjue93oaicjJFooiRYEL@#(*@#)((*Ueuiwe*(WRhj320JDFKBVCZKJBU!(@#*9834jkhjdf0s9jhvkjoeja0(jeQjlsozEerj2Fz0ek220j2koapJpajdOFHalkJFJlwl:FJDJAB%$*2ks0(*#$)-=209*$#IJFlw8u3FJGVNSS??><f,/siqwe"ASDF'adsfjue93oaicjJFooiRYEL@#(*@#)((*Ueuiwe*(WRhj320JDFKBVCZKJBU!(@#*9834jkhjdf0s9jhvkjoeja0(jeQjlsozEerj2Fz0ek220j2koapJpajdOFHalkJFJlwl:FJDJAB%$*2ks0(*#$)-=209*$#IJFlw8u3FJGVNSS??><f,/siqwe"ASDF'adsfjue93oaicjJFooiRYEL@#(*@#)((*Ueuiwe*(WRhj320JDFKBVCZKJBU!(@#*9834jkhjdf0s9jhvkjoeja0(jeQjlsozEerj2Fz0ek220j2koapJpajdOFHalkJFJlwl:FJDJAB%$*2ks0(*#$)-=209*$#IJFlw8u3FJGVNSS??><f,/siqwe"ASDF'adsfjue93oaicjJFooiRYEL@#(*@#)((*Ueuiwe*(WRhj320JDFKBVCZKJBU!(@#*9834jkhjdf0s9jhvkjoeja0(jeQjlsozEerj2Fz0ek220j2koapJpajdOFHalkJFJlwl:FJDJAB%$*2ks0(*#$)-=209*$#IJFlw8u3FJGVNSS??><f,/siqwe"we*(WRhj320JDFKBVCZKJBU!(@#*9834jkhjdf0s9jhvkjoeja0(jASDF'adsfjue93oaicjJFooiRYEL@#(*@#)((*UeuieQjlsozEerj2Fz0ek220j2koapJpajdOFHalkJFJlwl:FJDJAB%$*2ks0(*#$)-=209*$#IJFlw8u3FJGVNSS??><f,/siqwe"ASDF'adsfjue93oaicjJFooiRYEL@#(*@#)((*Ueuiwe*(WRhj320JDFKBVCZKJBU!(@#*9834jkhjdf0s9jhvkjoeja0(jeQjlsozEerj2Fz0ek220j2koapJpajdOFHalkJFJlwl:FJDJAB%$*2ks0(*#$)-=209*$#IJFlw8u3FJGVNSS??><f,/siqwe"ASDF'adsfjue93oaicjJFooiRYEL@#(*@#)((*Ueuiwe*(WRhj320JDFKBVCZKJBU!(@#*9834jkhjdf0s9jhvkjoeja0(jeQjlsozEerj2Fz0ek220j2koapJpajdOFHalkJFJlwl:FJDJAB%$*2ks0(*#$)-=209*$#IJFlw8u3FJGVNSS??><f,/sRYEL@#(*@#)((*Ueuiwe*(WRhj32iqwe"ASDF'adsfjue93oaicjJFooi0JDFKBVCZKJBU!(@#*9834jkhjdf0s9jhvkjoeja0(jeQjlsozEerj2Fz0ek220j2koapJpajdOFHalkJFJlwl:FJDJAB%$*2ks0(*#$)-=209*$#IJQjlsozEerFlw8u3FJGVNSS??><f,/siqwe"ASDF'adsfjue93oaicjJFooiRYEL@#(*@#)((*Ueuiwe*(WRhj320JDFKBVCZKJBU!(@#*9834joeja0(je'`

  const appStringMax = appString
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
    let frameHandleTwo: number

    let frameCount: number = 0

    const animationFrame: FrameRequestCallback = (): void => {
      const evenFrame: boolean = Math.floor(frameCount) % 2 === 0

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const imageData: ImageData = new ImageData(canvas.width, canvas.height)

      // const cache: Position<number[]> = {
      //   x: [],
      //   y: [],
      // }

      for (let x: number = 0; x < imageData.width; x++) {
        const xProgress: number = x / imageData.width

        // cache.x.push(
        //   Math.abs(
        //     Math.sin(
        //       (appString.charCodeAt(
        //         (x + frameCount + mousePosition.current.x) % appString.length,
        //       ) /
        //         appStringMax) *
        //         Math.PI,
        //     ),
        //   ),
        // )

        for (let y: number = 0; y < imageData.height; y++) {
          const yOffset: number = y * imageData.width
          const index: number = (x + yOffset) * 4

          const yProgress: number = y / imageData.height

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

          // if (!cache.y[y]) {
          //   cache.y.push(
          //     Math.abs(
          //       Math.sin(
          //         (appString.charCodeAt(
          //           (y + frameCount + mousePosition.current.y) %
          //             appString.length,
          //         ) /
          //           appStringMax) *
          //           Math.PI,
          //       ),
          //     ),
          //   )
          // }

          imageData.data[index] = Math.abs(Math.sin(xProgress * Math.PI)) * 255
          imageData.data[index + 1] = yProgress * 255
          imageData.data[index + 2] = ((xProgress + yProgress) / 2) * 255
          imageData.data[index + 3] = 255

          // imageData.data[index] = cache.x[x] * 255
          // imageData.data[index + 1] = cache.y[y] * 255
          // imageData.data[index + 2] = ((cache.x[x] + cache.y[y]) / 2) * 255
          // imageData.data[index + 3] = 255
        }
      }

      ctx.putImageData(imageData, 0, 0)

      frameCount += 0.3
      frameHandle = window.requestAnimationFrame(animationFrame)
    }
    frameHandle = window.requestAnimationFrame(animationFrame)

    return (): void => {
      window.cancelAnimationFrame(frameHandle)
      window.cancelAnimationFrame(frameHandleTwo)
    }
  }, [appString, appStringMax])

  const onMouseMove = React.useCallback<MouseEventHandler<HTMLCanvasElement>>(
    (event: React.MouseEvent<HTMLCanvasElement>): void => {
      mousePosition.current.x = event.clientX
      mousePosition.current.y = event.clientY
    },
    [],
  )

  return (
    <>
      <canvas
        width={720}
        height={270}
        ref={canvasRef}
        onMouseMove={onMouseMove}
      />
    </>
  )
}

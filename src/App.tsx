import React from 'react'

import './App.css'

interface Position {
  x: number
  y: number
}

const pointSets: Record<string, Position[][]> = {
  IPPoints: [
    [
      { x: 0.2, y: 0 },
      { x: 0.5, y: 1 },
      { x: 0.8, y: 0 },
      { x: 0, y: 0.6 },
      { x: 1, y: 0.6 },
      { x: 0.2, y: 0 },
    ],
  ],
  SDPoints: [
    [
      { x: 0, y: 0.3 },
      { x: 0.5, y: 0.9 },
      { x: 1, y: 0.3 },
      { x: 0, y: 0.3 },
      // { x: 0, y: 0.3 },
      // { x: 0.5, y: 0.9 },
      // { x: 1, y: 0.3 },
      // { x: 0, y: 0.3 },
    ],
    [
      { x: 0, y: 0.7 },
      { x: 0.5, y: 0.1 },
      { x: 1, y: 0.7 },
      { x: 0, y: 0.7 },
    ],
  ],
}

const originalPoints: Position[][] = pointSets.IPPoints
const points: Position[][] = [
  ...originalPoints.map((a) => [...a.map((b) => ({ ...b }))]),
]

for (let i = 0; i < 2; i++) {
  for (let y = 0; y < originalPoints.length; y++) {
    for (const index in originalPoints[y]) {
      if (originalPoints[y][index].x > 0.5) {
        originalPoints[y][index].x -= (originalPoints[y][index].x - 0.5) * 0.25
      } else if (originalPoints[y][index].x < 0.5) {
        originalPoints[y][index].x += (0.5 - originalPoints[y][index].x) * 0.25
      }

      if (originalPoints[y][index].y > 0.5) {
        originalPoints[y][index].y -= (originalPoints[y][index].y - 0.5) * 0.25
      } else if (originalPoints[y][index].y < 0.5) {
        originalPoints[y][index].y += (0.5 - originalPoints[y][index].y) * 0.25
      }
    }
  }
}

const intro: string = `Fractured memories, lost epiphanies.
Still, we can not see.
Another failed set of trickery.`

export function App() {
  const [introText, setIntroText] = React.useState<string>('')
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    let prevTime: DOMHighResTimeStamp = 0
    let typeAfterMS: number = 333
    let finished: boolean = false

    let animationHandle: number
    const animationFrame: FrameRequestCallback = (
      time: DOMHighResTimeStamp,
    ): void => {
      if (finished) return

      if (time - prevTime >= typeAfterMS) {
        setIntroText((prevText: string): string => {
          if (prevText.length + 1 >= intro.length) {
            finished = true
          }

          return intro.substring(0, prevText.length + 1)
        })

        prevTime = time
        typeAfterMS = Math.random() * 83 + 50
      }

      animationHandle = window.requestAnimationFrame(animationFrame)
    }
    animationHandle = window.requestAnimationFrame(animationFrame)

    return (): void => window.cancelAnimationFrame(animationHandle)
  }, [])

  React.useEffect((): (() => void) | void => {
    if (!canvasRef.current) return

    const ctx: CanvasRenderingContext2D | null = canvasRef.current.getContext(
      '2d',
      { willReadFrequently: true },
    )

    if (!ctx) return

    // ctx.fillStyle = '#000000'
    // ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    let frameHandle: number
    let frameHandleTwo: number
    let prevTime: number = 0

    let pointIndex: number = 0
    let pointTime: number = 0
    let loops: number = 0

    let rotationRads: number

    const pointsCache: Record<number, Position[][]> = {}

    let prevImageData: ImageData = new ImageData(1, 1)

    const animationFrameTwo: FrameRequestCallback = () =>
      // time: DOMHighResTimeStamp,
      {
        // ctx.canvas.style.filter = `invert(${
        //   // 0
        //   // Math.abs(Math.sin(time / 9999))
        //   // loops % 2 === 0 ? 0 : 1
        //   Math.floor(time / 66) % 2
        // }) hue-rotate(${Math.abs(
        //   Math.sin((time / (666 / (loops + 1))) * Math.PI) * 360,
        // )}deg)`
        frameHandleTwo = window.requestAnimationFrame(animationFrameTwo)
      }
    frameHandleTwo = window.requestAnimationFrame(animationFrameTwo)

    const animationFrame: FrameRequestCallback = (
      time: DOMHighResTimeStamp,
    ): void => {
      const elapsedTime: number = time - prevTime

      if (elapsedTime < 0) {
        frameHandle = window.requestAnimationFrame(animationFrame)
        return
      }

      pointTime += elapsedTime

      const progress = Math.min(1, pointTime / (333 / (0 + 1)))

      for (let really = 0; really < 1; really++) {
        rotationRads =
          ((((time % 6666) / 6666) * 360 * Math.PI) / 180) *
          (really === 0 ? -1 : 1)
        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2)
        ctx.rotate(rotationRads)
        ctx.translate(-ctx.canvas.width / 2, -ctx.canvas.height / 2)

        for (let iteration = 0; iteration < (loops % 10) + 1; iteration++) {
          // ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2)
          // if (iteration % 2 === 0) {
          //   ctx.rotate(rotationRads)
          // } else {
          //   ctx.rotate(-rotationRads)
          // }
          // ctx.translate(-ctx.canvas.width / 2, -ctx.canvas.height / 2)

          if (iteration === 0) {
            const ogP = [
              ...originalPoints.map((a) => [...a.map((b) => ({ ...b }))]),
            ]

            points.splice(0, points.length, ...ogP)

            pointsCache[iteration] = ogP
          } else {
            for (let y = 0; y < points.length; y++) {
              for (const index in points[y]) {
                if (points[y][index].x > 0.5) {
                  points[y][index].x -= (points[y][index].x - 0.5) * 0.25
                } else if (points[y][index].x < 0.5) {
                  points[y][index].x += (0.5 - points[y][index].x) * 0.25
                }

                if (points[y][index].y > 0.5) {
                  points[y][index].y -= (points[y][index].y - 0.5) * 0.25
                } else if (points[y][index].y < 0.5) {
                  points[y][index].y += (0.5 - points[y][index].y) * 0.25
                }
              }
            }
          }

          const roundSize: number = 50 / ((iteration + 1) * 0.5)

          for (let z = 0; z < points.length; z++) {
            let point: Position = points[z][pointIndex]
            let nextPoint: Position = points[z][pointIndex + 1]

            if (!point || !nextPoint) {
              // if (loops < 10) {
              //   for (const index in points) {
              //     if (points[index].x > 0.5) {
              //       points[index].x -= (points[index].x - 0.5) * 0.25
              //     } else if (points[index].x < 0.5) {
              //       points[index].x += (0.5 - points[index].x) * 0.25
              //     }

              //     if (points[index].y > 0.5) {
              //       points[index].y -= (points[index].y - 0.5) * 0.25
              //     } else if (points[index].y < 0.5) {
              //       points[index].y += (0.5 - points[index].y) * 0.25
              //     }
              //   }
              // }

              loops++
              pointIndex = 0
              point = points[z][pointIndex]
              nextPoint = points[z][pointIndex + 1]
            }

            ctx.globalCompositeOperation = 'source-over'
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            ctx.putImageData(prevImageData, 0, 0)

            // ctx.fillStyle = '#00000001'
            // ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

            ctx.globalCompositeOperation = 'difference'

            const startPos: Position = {
              x: point.x * ctx.canvas.width,
              y: point.y * ctx.canvas.height + 34,
            }
            const endPos: Position = {
              x:
                (point.x * (1 - progress) + nextPoint.x * progress) *
                ctx.canvas.width,
              y:
                (point.y * (1 - progress) + nextPoint.y * progress) *
                  ctx.canvas.height +
                34,
            }

            const grad: CanvasGradient = ctx.createLinearGradient(
              startPos.x,
              startPos.y,
              endPos.x,
              endPos.y,
            )
            grad.addColorStop(
              0,
              `#${'0'.repeat(loops % 2 === 0 ? 0 : 4)}FF${'0'.repeat(
                loops % 2 === 0 ? 4 : 0,
              )}`,
            )
            grad.addColorStop(
              1,
              `#${'0'.repeat(loops % 2 === 0 ? 4 : 0)}FF${'0'.repeat(
                loops % 2 === 0 ? 0 : 4,
              )}`,
            )
            ctx.strokeStyle = grad

            ctx.beginPath()
            for (let i = 0; i < points[z].length; i++) {
              ctx[i ? 'lineTo' : 'moveTo'](
                points[z][i].x * ctx.canvas.width,
                points[z][i].y * ctx.canvas.height + 34,
              )
            }
            ctx.stroke()

            const pp: Position[] = []

            ctx.beginPath()
            for (let x = 1; x < 3; x++) {
              for (let i = 0; i < points[z].length; i++) {
                const pos1 = points[z][i]
                const pos2 = points[z][(i + x) % (points[z].length - 1)]

                pp.push({
                  x: ((pos1.x + pos2.x) / 2) * ctx.canvas.width,
                  y: ((pos1.y + pos2.y) / 2) * ctx.canvas.height + 34,
                })

                ctx[i ? 'lineTo' : 'moveTo'](
                  ((pos1.x + pos2.x) / 2) * ctx.canvas.width,
                  ((pos1.y + pos2.y) / 2) * ctx.canvas.height + 34,
                )

                ctx.lineTo(
                  pos1.x * ctx.canvas.width,
                  pos1.y * ctx.canvas.height + 34,
                )
                ctx.lineTo(
                  pos2.x * ctx.canvas.width,
                  pos2.y * ctx.canvas.height + 34,
                )

                ctx.lineTo(
                  ((pos1.x + pos2.x) / 2) * ctx.canvas.width,
                  ((pos1.y + pos2.y) / 2) * ctx.canvas.height + 34,
                )
              }
            }
            ctx.stroke()

            // ctx.beginPath()
            // ctx.moveTo(startPos.x, startPos.y)
            // ctx.lineTo(endPos.x, endPos.y)
            // ctx.stroke()

            // if (false) {
            //   endPos = {
            //     x:
            //       (point.x * (1 - progress) + nextPoint.x * progress) *
            //       ctx.canvas.width,
            //     y: nextPoint.y * ctx.canvas.height,
            //   }

            //   grad = ctx.createLinearGradient(
            //     startPos.x,
            //     startPos.y,
            //     endPos.x,
            //     endPos.y,
            //   )
            //   grad.addColorStop(
            //     0,
            //     `#${'33FF'.repeat(loops % 2 === 0 ? 0 : 1)}EE${'FF33'.repeat(
            //       loops % 2 === 0 ? 1 : 0,
            //     )}`,
            //   )
            //   grad.addColorStop(
            //     1,
            //     `#${'FF33'.repeat(loops % 2 === 0 ? 1 : 0)}EE${'33FF'.repeat(
            //       loops % 2 === 0 ? 0 : 1,
            //     )}`,
            //   )

            // ctx.beginPath()
            // ctx.moveTo(startPos.x, startPos.y)
            // ctx.lineTo(endPos.x, endPos.y)

            // ctx.strokeStyle = grad
            // ctx.stroke()
            // }

            prevImageData = ctx.getImageData(
              0,
              0,
              ctx.canvas.width,
              ctx.canvas.height,
            )

            ctx.globalCompositeOperation = 'source-over'
            ctx.fillStyle = grad

            // ctx.beginPath()
            // ctx.roundRect(
            //   ctx.canvas.width / 2 - 50,
            //   ctx.canvas.height / 2 - 50,
            //   roundSize,
            //   roundSize,
            //   360,
            // )
            // ctx.fill()

            for (let i = 0; i < points[z].length; i++) {
              const pos1 = points[z][i]
              const pos2 = points[z][(i + 2) % (points[z].length - 1)]

              ctx.beginPath()
              ctx.roundRect(
                pos1.x * ctx.canvas.width - roundSize / 2,
                pos1.y * ctx.canvas.height + 34 - roundSize / 2,
                roundSize,
                roundSize,
                360,
              )
              ctx.fill()

              ctx.beginPath()
              ctx.roundRect(
                ((pos1.x + pos2.x) / 2) * ctx.canvas.width -
                  (roundSize * 0.75) / 2,
                ((pos1.y + pos2.y) / 2) * ctx.canvas.height +
                  34 -
                  (roundSize * 0.75) / 2,
                roundSize * 0.75,
                roundSize * 0.75,
                360,
              )
              ctx.fill()
            }
          }

          // ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2)
          // if (iteration % 2 === 0) {
          //   ctx.rotate(-rotationRads)
          // } else {
          //   ctx.rotate(rotationRads)
          // }
          // ctx.translate(-ctx.canvas.width / 2, -ctx.canvas.height / 2)
        }
        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2)
        ctx.rotate(-rotationRads)
        ctx.translate(-ctx.canvas.width / 2, -ctx.canvas.height / 2)
      }

      // // const progress = Math.min(1, pointTime / 2000)
      // let progressTwo: number =
      //   Math.min(points.length, (pointIndex * 2000 + pointTime) / 2000) /
      //   points.length

      // if (progressTwo > 0.5) {
      //   progressTwo = 1 - progressTwo
      // }

      // ctx.beginPath()
      // ctx.moveTo(ctx.canvas.width / 2 - 200, ctx.canvas.height / 2)
      // ctx.quadraticCurveTo(
      //   ctx.canvas.width / 2,
      //   ctx.canvas.height / 2 + 100 * progressTwo,
      //   ctx.canvas.width / 2 + 200,
      //   ctx.canvas.height / 2,
      // )
      // ctx.strokeStyle = '#00Ff00'
      // ctx.stroke()

      // ctx.lineTo(ctx.canvas.width / 2 + 225, ctx.canvas.height / 2 + 0)
      // ctx.quadraticCurveTo(
      //   ctx.canvas.width / 2,
      //   ctx.canvas.height / 2 + 100 + 100 * progressTwo,
      //   ctx.canvas.width / 2 - 225,
      //   ctx.canvas.height / 2 + 0,
      // )
      // ctx.closePath()
      // ctx.save()
      // ctx.clip()

      // for (let i = 0; i < 11; i++) {
      //   ctx.beginPath()

      //   const a: Position = {
      //     x: ctx.canvas.width / 2,
      //     y: ctx.canvas.height / 2 - 100,
      //   }

      //   ctx.moveTo(a.x, a.y)

      //   const b = (i - 5) / 5

      //   ctx.lineTo(a.x + b * 600, a.y + 300)

      //   // ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.height / 2 + 100)

      //   ctx.stroke()
      // }

      // ctx.restore()

      // ctx.beginPath()
      // ctx.moveTo(ctx.canvas.width / 2 - 200, ctx.canvas.height / 2)
      // ctx.quadraticCurveTo(
      //   ctx.canvas.width / 2,
      //   ctx.canvas.height / 2 + 100 * progressTwo,
      //   ctx.canvas.width / 2 + 200,
      //   ctx.canvas.height / 2,
      // )
      // ctx.lineTo(ctx.canvas.width / 2 + 225, ctx.canvas.height / 2 - 200)
      // ctx.lineTo(ctx.canvas.width / 2 - 225, ctx.canvas.height / 2 - 200)
      // ctx.closePath()
      // ctx.save()
      // ctx.clip()

      // const progressThree: number =
      //   Math.min(points.length, (pointIndex * 2000 + pointTime) / 2000) /
      //   points.length

      // ctx.beginPath()
      // ctx.roundRect(
      //   ctx.canvas.width / 2 - 50 + progressTwo * 100,
      //   ctx.canvas.height / 2 - 50 - progressThree * 50,
      //   100,
      //   100,
      //   360,
      // )
      // ctx.stroke()

      // ctx.restore()

      if (progress >= 1) {
        pointTime = 0
        pointIndex++
      }

      prevTime = time
      frameHandle = window.requestAnimationFrame(animationFrame)
    }
    frameHandle = window.requestAnimationFrame(animationFrame)

    return () => {
      window.cancelAnimationFrame(frameHandle)
      window.cancelAnimationFrame(frameHandleTwo)
    }
  }, [])

  return (
    <>
      <canvas width={2560} height={2560} ref={canvasRef} />

      <pre className="text">{introText}</pre>
      <pre className="text reversed">{introText}</pre>

      <pre className="text bottom">{introText}</pre>
      <pre className="text bottom reversed">{introText}</pre>
    </>
  )
}

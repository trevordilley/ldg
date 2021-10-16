import { useRef, useState } from "react"
import { useDt } from "./useDt"

export interface UseFrameProps {
  startFrame: number,
  endFrame: number,
  frameDuration?: number,
  initialFrame?: number,
  repeat?: boolean,
  onStart?: () => void
  onEnd?: () => void
}
export const useFrame = ({  startFrame, endFrame,  onStart, onEnd, initialFrame, frameDuration = 100,  repeat = true }: UseFrameProps) => {

  const elapsed = useRef(0)
  const [frame, setFrame] = useState(initialFrame ?? startFrame)
  const [hasStarted, setHasStarted] = useState(false)
  const [hasEnded, setHasEnded] = useState(false)


  const frameIdx = (i: number) => i
  useDt(dt => {
    if(hasEnded) return
    elapsed.current += dt
    if(elapsed.current > frameDuration) {
      elapsed.current = 0
      setFrame(prev => frameIdx(prev + 1))
    }
  })

  if(!hasStarted && onStart) {
    onStart()
    setHasStarted(true)
  }

  if(frame === endFrame) {
    if(onEnd) onEnd()
    if(repeat) {
      setFrame(0)
    } else {
      setHasEnded(true)
    }
  }

  return frame
}

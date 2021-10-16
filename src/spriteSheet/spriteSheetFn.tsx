export interface SpritesheetProps {
  spriteSheetId: string
  spriteSheetPath: string
  spriteSheetWidth: number
  spriteSheetHeight: number
  spriteSize: number
}
export const spriteSheetFn = ({spriteSheetId, spriteSheetPath, spriteSheetHeight, spriteSheetWidth, spriteSize}: SpritesheetProps) => {
  const defUrl = `url(#${spriteSheetId})`
  return {
    spriteSheet:(<defs>
      <clipPath id={spriteSheetId}>
        <rect x="0" y="0" width={spriteSize} height={spriteSize}></rect>
      </clipPath>
    </defs>),
    sprite: (frame: number, position: {x: number, y: number}) => (
      <g transform={`translate(${position.x}, ${position.y})`}>
        <g>
          <image width={spriteSheetWidth} height={spriteSheetHeight} href={spriteSheetPath} clipPath={defUrl} x={frame * spriteSize * -1} y="0"></image>
        </g>
      </g>
    )
  }
}


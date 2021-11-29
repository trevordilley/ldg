import {defineComponent, Types } from "bitecs"
import { FC } from "react"
import { useFrame } from "../../hooks/useFrame"
import { fighterSpriteSheetFn } from "../../spriteSheet/fighterSpriteSheetFn"
import {System, SystemProps } from "./System"

const RenderData = { startFrame: Types.ui8, endFrame: Types.ui8,  }

export const RenderComponent = defineComponent(RenderData)

// TODO
const frame = useFrame({startFrame: 0, endFrame: 8})
const {sprite, spriteSheet} = fighterSpriteSheetFn()

// TODO
export const RenderSystem:FC<Omit<SystemProps, "query">> = props => {
  return <System
    query={[RenderComponent]}
    fn={(dt, world, eids) => {
    }}
    {...props}
  />
}

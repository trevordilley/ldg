import { defineComponent, removeComponent, Types } from "bitecs"
import { FC, useState } from "react"
import { System, SystemProps } from "./System"

const PositionData = { x: Types.f32, y: Types.f32 }
const DestinationData = { x: Types.f32, y: Types.f32, speed: Types.f32 }

export const PositionComponent = defineComponent(PositionData)
export const DestinationComponent = defineComponent(DestinationData)

const arrivalDistance = 0.5

export const MovementSystem:FC<Omit<SystemProps, "query">> = props => {
  return <System
    query={[PositionComponent, DestinationComponent]}
    fn={(dt, world, eids) => {
      for(let i = 0; i < eids.length; i++) {
        // Calculate new position based on destination
        const eid = eids[i]
        const px = PositionComponent.x[eid]
        const py = PositionComponent.y[eid]

        const dx = DestinationComponent.x[eid]
        const dy = DestinationComponent.y[eid]
        const s = DestinationComponent.speed[eid]
        let x = dx -px
        let y = dy -py

        // Get vector magnitude
        const m: number = Math.sqrt(x * x + y * y)
        // Divide by magnitude and multiply by desired speed
        const newX = x / m * s
        const newY = y / m * s
        PositionComponent.x[eid] += 1.5
        PositionComponent.y[eid] += 1.5

        // They have arrived
        if(m < arrivalDistance) {
          removeComponent(world, DestinationComponent, eid)
        }
      }
    }}
    {...props}
  />
}


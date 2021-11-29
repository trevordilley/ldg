import React from "react"
import { ECSContext } from "../components/ecs/ECS"

export const useWorld = () => {
  const world = React.useContext(ECSContext)
  if (!world) { throw new Error("useWorld() must be within the ECS Context!!!")}
  return world
}

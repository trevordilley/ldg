import { createWorld, IWorld } from "bitecs";
import React, { FC } from "react";

export const ECSContext = React.createContext<IWorld | undefined>(undefined)

// For some reason the world needs to be created OUTSIDE OF REACT ENTIRELY using createWorld()
export const ECS: FC<{world: IWorld}> = props =>
  <ECSContext.Provider value={props.world}>{props.children}</ECSContext.Provider>

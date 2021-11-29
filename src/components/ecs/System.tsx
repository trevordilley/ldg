import {Component,removeQuery,  defineQuery, IWorld, Query, QueryModifier } from "bitecs";
import { FC, useEffect, useRef, useState } from "react";
import { useDt } from "../../hooks/useDt";
import { useWorld } from "../../hooks/useWorld";

export interface SystemProps {
  query: (Component | QueryModifier)[]
  fn?: (dt: number, world:IWorld, eids: number[]) => void
  view?: (eids: number[], world: IWorld) => JSX.Element
}

export const System:FC<SystemProps> = ({ query, fn, view}) => {
  const world = useWorld()
  const q = useRef(defineQuery(query))
  const eids = useRef<number[]>([])
  const [_, set] = useState(0)
  useEffect(() => {
    return () => {
      removeQuery(world, q.current)
    }
  }, [])

  useDt(dt => {
    if(view) {
      set(dt)
    }
    eids.current = q.current(world)
    fn?.(dt, world, eids.current)
  })
  return view?.(eids.current, world) ?? null
}


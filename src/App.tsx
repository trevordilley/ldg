import {addComponent, addEntity, createWorld, defineComponent, Types } from 'bitecs';
import React, {useEffect, useState } from 'react';
import { useRef } from 'react';
import './App.css';
import { ECS } from './components/ecs/ECS';
import {DestinationComponent, MovementSystem, PositionComponent } from './components/ecs/MovementSystem';
import { System } from './components/ecs/System';
import { useFrame } from './hooks/useFrame';
import { fighterSpriteSheetFn } from './spriteSheet/fighterSpriteSheetFn';
const height = 1365
const width = 2048
const mapPath = "./maps/hag_cave/hag_cave.jpeg"
const collisionPath = "./maps/hag_cave/collision.geojson"
const fovPath = "./maps/hag_cave/FoV.geojson"

interface MapGeometery {
  features: {
    geometry: {
      coordinates: number[][][][]
    }
  }[]
}
const loadMap = async (filePath: string) => {
  const retrieved  = await fetch( filePath)
  const datums = await retrieved.json() as MapGeometery
  const points = datums.features[0].geometry.coordinates[0][0]
  return points
}




const markerColor = "#ff0000"

const pointsToStr = (points: number[][]): string => points.map (([x,y]) => `${x},${y}`).join(" ")

const gisToSvgCoords = (points: number[][]): number[][] => points.map(([x,y]) => [x, -y])
function App() {
  const [collisionPoints, setCollisionPoints] = useState<number[][]>([])
  const [fovPoints, setFovPoints] = useState<number[][]>([])
  const [mousePos, setMousePos] = useState<{x:number, y:number}>({x: 0, y: 0})
  useEffect(() => {
    loadMap(collisionPath).then (r => setCollisionPoints(gisToSvgCoords(r)))
    loadMap(fovPath).then (r => setFovPoints(gisToSvgCoords(r)))
  }, [])

  const HealthData = { health: Types.f32 }
  const HealthComponent = defineComponent(HealthData)
  const RenderComponent = defineComponent()

  const onMouseMove = (e: MouseEvent) => {
    console.log("moving?")
    setMousePos({x: e.clientX, y: e.clientY})
  }
  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove)
    return () => window.removeEventListener("mousemove", onMouseMove)
  },[])

  const frame = useFrame({startFrame: 0, endFrame: 8})
  const {sprite, spriteSheet} = fighterSpriteSheetFn()

  const world = createWorld()
  const eid = addEntity(world)
  console.log(eid)
  addComponent(world, PositionComponent, eid)
  addComponent(world, DestinationComponent, eid)
  PositionComponent.x[eid] = 100
  PositionComponent.y[eid] = 100
  DestinationComponent.x[eid] = 600
  DestinationComponent.y[eid] = 600
  DestinationComponent.speed[eid] = 0.4
  // @ts-ignore
  return (
    <div>
  <svg
    width={width}
    height={height}
        style={{position: "fixed", top: 0, left:0, height:"100%", width: "100%"}}
        // viewBox messes with mouse position, figure that out.
        // viewBox={"0 0 1400 1400"}
      >
        {spriteSheet}
        <image href={mapPath} x={0} y={0}/>
        <text x={mousePos.x} y={mousePos.y} fill={"#fff"}>
          ClientPos: {mousePos.x}, {mousePos.y}
        </text>
        <circle fill={"#00ff0022"} cx={mousePos.x } cy={mousePos.y} r={25} />
    <ECS world={world}>
     <MovementSystem
       view={(eids, world) =>
          <>
            {eids.map(id =>
            sprite(`${id}`, frame, {x:PositionComponent.x[id] , y: PositionComponent.y[id]})
            )}
          </>
       }
     />
    </ECS>
        {sprite('mouse', frame, {x: mousePos.x, y: mousePos.y})}
    <polygon points={pointsToStr(collisionPoints)} fill={"#ff000022"} />
        <polygon points={pointsToStr(fovPoints)} fill={"#0000ff22"} />
        <circle fill={markerColor} cx={10} cy={10} r={10} />
        <circle fill={markerColor} cx={width - 10} cy={10} r={10} />
        <circle fill={markerColor} cx={width - 10} cy={height - 10} r={10} />
        <circle fill={markerColor} cx={10} cy={height - 10} r={10} />
      </svg>
      <button onClick={() => {
        const eid = addEntity(world)
        addComponent(world, HealthComponent, eid)
      }} >Add Entity</button>
    </div>

  );
}

export default App;

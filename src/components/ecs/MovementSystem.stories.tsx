import React, { FC, useRef } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { fighterSpriteSheetFn } from '../../spriteSheet/fighterSpriteSheetFn';
import { useDt } from '../../hooks/useDt';
import { useState } from 'react';
import { useEffect } from 'react';
import {FpsView} from "react-fps";
import { useFrame } from '../../hooks/useFrame';
import { addComponent, addEntity, createWorld, defineComponent, Types } from 'bitecs';
import { System } from './System';
import { ECS } from './ECS';
import {DestinationComponent, MovementSystem, PositionComponent } from './MovementSystem';

export default {
  title: 'Systems/MovementSystem',
}

const world = createWorld()

const eid = addEntity(world)
addComponent(world, PositionComponent, eid)
addComponent(world, DestinationComponent, eid)
PositionComponent.x[eid] = 100
PositionComponent.y[eid] = 100
DestinationComponent.x[eid] = 600
DestinationComponent.y[eid] = 600
DestinationComponent.speed[eid] = 5
const Template: ComponentStory<FC<{}>> = () => {
  return (
    <div style={{width: "100%", height: "100%"}} onClick={e => {
      console.log(e.clientX, e.clientY)
    }}>
      <FpsView width={240} height={180} left={800} top={10}/>
      <ECS  world={world}>
        <MovementSystem view={ (eids, world) =>
          <svg
            width={600}
            height={800}>
            {eids.map(id =>
              <g key={`g${id}`}>
                <circle
                  key={`c${id}`}
                  fill={"#0f0"} cx={PositionComponent.x[id]} cy={PositionComponent.y[id]} r={10}
                />

              </g>
              )}
          </svg>
        }
        />

      </ECS>
    </div>
  )
}


export const Primary = Template.bind({});

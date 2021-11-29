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

export default {
  title: 'Systems/RandomNumber',
}

const HealthData = { health: Types.f32 }
const HealthComponent = defineComponent(HealthData)
const RenderComponent = defineComponent()
const world = createWorld()


const Template: ComponentStory<FC<{}>> = () => {
  return (
    <div>
      <button onClick={() => {
        const eid = addEntity(world)
        addComponent(world, HealthComponent, eid)
      }} >Add Entity</button>
      <FpsView width={240} height={180} left={256} top={80}/>
      <ECS world={world}>
        <System
          query={[HealthComponent]}
          fn={(dt, world, eids) => {
            for(let i = 0; i < eids.length; i++) {
              HealthComponent.health[i] = Math.random()
            }
          }}
          view={(eids, world) =>
            <ul>
              {eids.map(id => <li key={id}>{id}  {HealthComponent.health[id]} </li>)}
            </ul>
          }
        />
      </ECS>
      </div>
    )
}


export const Primary = Template.bind({});

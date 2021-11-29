import React, { FC, useRef } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { fighterSpriteSheetFn } from '../../spriteSheet/fighterSpriteSheetFn';
import { useDt } from '../../hooks/useDt';
import { useState } from 'react';
import { useEffect } from 'react';
import {FpsView} from "react-fps";
import { useFrame } from '../../hooks/useFrame';

export default {
  title: 'SpriteSheets/Fighter',
}

const Template: ComponentStory<FC<{}>> = () => {
  const {spriteSheet:fighterSheet, sprite: fighterFn} = fighterSpriteSheetFn()
  const frame = useFrame({startFrame: 0, endFrame: 26})

  return (
    <div>
      <FpsView width={240} height={180} left={256} top={80}/>
      <svg width={1728} height={26 * 64}>
        {fighterSheet}
        {fighterFn("mouse", frame, {x: 0, y: 0})}
      </svg>
    </div>)
}


export const Primary = Template.bind({});

import React, { FC, useRef } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useDt } from '../../hooks/useDt';
import { useState } from 'react';
import { useEffect } from 'react';
import {FpsView} from "react-fps";
import { useFrame } from '../../hooks/useFrame';
import { treasureSpriteSheetFn } from '../../spriteSheet/treasureSpriteSheetFn';

export default {
  title: 'SpriteSheets/Treasure',
}

const Template: ComponentStory<FC<{}>> = () => {
  const {spriteSheet, sprite} = treasureSpriteSheetFn()
  const frame = useFrame({startFrame: 0, endFrame: 6})

  return (
    <div>
      <FpsView width={240} height={180} left={256} top={80}/>
      <svg width={128} height={128}>
        {spriteSheet}
        {sprite("treasure", frame, {x: 0, y: 0})}
      </svg>
    </div>)
}


export const Primary = Template.bind({});

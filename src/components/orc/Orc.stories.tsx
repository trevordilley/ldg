import React, { FC, useRef } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { orcSpriteSheetFn } from '../../spriteSheet/orcSpriteSheetFn';
import { useDt } from '../../hooks/useDt';
import { useState } from 'react';
import { useEffect } from 'react';
import {FpsView} from "react-fps";
import { useFrame } from '../../hooks/useFrame';

export default {
  title: 'SpriteSheets/Orc',
}

const Template: ComponentStory<FC<{}>> = () => {
  const {spriteSheet, sprite} = orcSpriteSheetFn()
  const frame = useFrame({startFrame: 0, endFrame: 23})

  return (
    <div>
      <FpsView width={240} height={180} left={256} top={80}/>
      <svg width={128} height={128}>
        {spriteSheet}
        {sprite("orc", frame, {x: 0, y: 0})}
      </svg>
    </div>)
}


export const Primary = Template.bind({});

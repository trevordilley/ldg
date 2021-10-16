import React, { FC, useRef } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import { useEffect } from 'react';
import {FpsView} from "react-fps";
import { fighterSpriteSheetFn } from './fighterSpriteSheetFn';
import { useFrame } from '../hooks/useFrame';

export default {
  title: 'SpriteSheets/StressTest',
}

const numFrames = 26
const frameIdx = (i: number) => i % numFrames
const Template: ComponentStory<FC<{}>> = () => {
  const {spriteSheet:fighterSheet, sprite: fighterFn} = fighterSpriteSheetFn()
  const frame = useFrame({startFrame: 0, endFrame: 26})

  const row = (r: number) =>
    [...Array(numFrames)].map((_, i) => fighterFn(frameIdx(frame + i), {x: i * 64, y: r * 64}))

  const stress = (numRows: number) => [...Array(numRows)].map((_, i) => row(i))
  const howStressful = 20
  return (
    <div>
      <div>Entity Count ({numFrames} frames by {howStressful} rows): {howStressful * numFrames}</div>
      <FpsView width={240} height={180} left={60} top={80}/>
      <svg width={1728} height={howStressful * 64}>
        {fighterSheet}
        {stress(howStressful)}
      </svg>
    </div>)
}


export const Primary = Template.bind({});

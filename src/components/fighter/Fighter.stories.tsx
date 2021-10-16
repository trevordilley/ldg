import React, { FC, useRef } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { fighterSpriteSheetFn } from '../../spriteSheet/fighterSpriteSheetFn';
import { useDt } from '../../hooks/useDt';
import { useState } from 'react';
import { useEffect } from 'react';
import {FpsView} from "react-fps";

export default {
  title: 'Example/Fighter',
}

const numFrames = 26
const frameIdx = (i: number) => i % numFrames
const Template: ComponentStory<FC<{}>> = () => {
  const {spriteSheet:fighterSheet, sprite: fighterFn} = fighterSpriteSheetFn()
  const elapsed = useRef(0)
  const [frame, setFrame] = useState(0)
  useDt(dt => {
    elapsed.current += dt
    if(elapsed.current > 100) {
      elapsed.current = 0
      setFrame(prev => frameIdx(prev + 1))
    }
  })
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

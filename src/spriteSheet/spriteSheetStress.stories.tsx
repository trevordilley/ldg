import React, { FC, useRef } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import { useEffect } from 'react';
import {FpsView} from "react-fps";
import { fighterSpriteSheetFn } from './fighterSpriteSheetFn';
import { useFrame } from '../hooks/useFrame';
import { orcSpriteSheetFn } from './orcSpriteSheetFn';
import { treasureSpriteSheetFn } from './treasureSpriteSheetFn';

export default {
  title: 'SpriteSheets/StressTest',
}

const numFrames = 26
const frameIdx = (i: number) => i % numFrames
const Template: ComponentStory<FC<{}>> = () => {

  // Big performance dips appear to be a function of how many sprite sheets there are which is a problem

  const {spriteSheet:fighterSheet, sprite: fighterFn} = fighterSpriteSheetFn()

  // Same image, but different sprite sheet def. I wonder if we should just pile all the sprites into a single sheet
  // (texture atlas)
  const {spriteSheet:otherFighterSheet, sprite: otherFighterFn} = fighterSpriteSheetFn()
  const {spriteSheet:orcSheet, sprite: orcFn} = orcSpriteSheetFn()
  const {spriteSheet:treasureSheet, sprite: treasureFn} = treasureSpriteSheetFn()
  const fighterFrame = useFrame({startFrame: 0, endFrame: 26})
  const orcFrame = useFrame({startFrame: 0, endFrame: 10})
  const treasureFrame = useFrame({startFrame: 0, endFrame: 4})

  const fighterRow = (r: number) =>
    [...Array(numFrames)].map((_, i) => fighterFn(frameIdx(fighterFrame + i), {x: i * 128, y: r * 64}))

  const otherFighterRow = (r: number) =>
    [...Array(numFrames)].map((_, i) => otherFighterFn(frameIdx(fighterFrame + i), {x: i * 128, y: r * 64}))

  const orcRow = (r: number) =>
    [...Array(numFrames)].map((_, i) => orcFn(frameIdx(orcFrame + i), {x: i * 128, y: r * 128}))

  const treasureRow = (r: number) =>
    [...Array(numFrames)].map((_, i) => treasureFn(frameIdx(treasureFrame + i), {x: i * 128, y: r * 128}))

  const stress = (numRows: number) => [
    [...Array(numRows)].map((_, i) =>  fighterRow(i)),
      [...Array(numRows)].map((_, i) => otherFighterRow(i)),
    [...Array(numRows)].map((_, i) => treasureRow(i)),
    [...Array(numRows)].map((_, i) => orcRow(i)),


  ].flat()
  const howStressful = 5

  const fighterCount = howStressful * 26
  const orcCount = howStressful * 10
  const treasureCount = howStressful * 4
  const total = (fighterCount + orcCount + treasureCount)
  return (
    <div>
      <FpsView width={240} height={180} left={60} top={80}/>
      <svg width={1728} height={howStressful * 128}>
        {fighterSheet}
        {otherFighterSheet}
        {orcSheet}
        {treasureSheet}
        {stress(howStressful)}
      </svg>
    </div>)
}


export const Primary = Template.bind({});

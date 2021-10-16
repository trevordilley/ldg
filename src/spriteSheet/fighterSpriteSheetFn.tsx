import React, {FC, useEffect, useState } from 'react';
import { spriteSheetFn } from './spriteSheetFn';

export const fighterSpriteSheetFn = () =>
  spriteSheetFn({
    spriteSheetId: "fighterSpriteSheet",
    spriteSheetPath: "./64_rpg_sword_shield_ase.png",
    spriteSheetWidth: 1728,
    spriteSheetHeight: 64,
    spriteSize: 64
  })



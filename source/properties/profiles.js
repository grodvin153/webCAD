/*
 * webCAD - Perfiles de dibujo
 * Copyright (C) 2026 Gonzalo Rodriguez
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { DRAWING_PROFILES } from '../config.js';

export function createProfileServices({ getState, getLineType }) {
  function drawingProfileById(profileId) {
    return DRAWING_PROFILES[profileId] || DRAWING_PROFILES.engineering;
  }

  function activeDrawingProfile() {
    return drawingProfileById(getState().drawingProfile);
  }

  function profileLineTypeDash(lineTypeId) {
    const scale = activeDrawingProfile().lineTypeScale;
    return getLineType(lineTypeId).dash.map((length) => length * scale);
  }

  return {
    activeDrawingProfile,
    drawingProfileById,
    profileLineTypeDash,
  };
}

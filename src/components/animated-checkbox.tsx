import React, { useEffect, memo, useCallback, useState } from "react";
import Animated, {
  useSharedValue,
  Easing,
  useAnimatedProps,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";
import { Switch, Checkbox,Text } from "native-base";

import Svg, { Path, Defs, ClipPath, G } from "react-native-svg";

const MARGIN = 10;
const vWidth = 60 + MARGIN;
const vHeight = 64 + MARGIN;

type Props = {
  checked?: boolean;
  onToggleCheckBox: ()=> void
};
const AnimatedCheckBox = (props: Props) => {
  const { checked,onToggleCheckBox } = props;
  
  return (
    <Checkbox value="" accessibilityLabel="taskCheck"  isChecked={checked} onChange={onToggleCheckBox}>
      </Checkbox>

  )
};

export default AnimatedCheckBox;

import * as React from "react";
import { useEffect, useCallback, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Svg, { Defs, LinearGradient, Stop, Circle } from "react-native-svg";
import { Button, Box, Pressable,Text } from "native-base";
import Animated, {
  interpolate,
  useSharedValue,
  withTiming,
  useAnimatedProps,
  useDerivedValue,
} from "react-native-reanimated";
import { ReText } from "react-native-redash";

const { width, height } = Dimensions.get("window");
const BACKGROUND_COLOR = "#444B6F";
const BACKGROUND_STROKE_COLOR = "#303858";
const STROKE_COLOR = "#A6e1FA";
const CIRCLE_LENGTH = 700; //2pi*R
const R = CIRCLE_LENGTH / (2 * Math.PI);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface Props {
  startingMinutes: number;
  startingSeconds: number;
}

const CircularProgress = ({ startingMinutes, startingSeconds }: Props) => {
  const progress = useSharedValue(0);
  const [isStart, setIstart] = useState(false);
  const [second, setSecond] = useState(startingSeconds);
  const [minutes, setMinutes] = useState(startingMinutes);
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  

  const progressText = useDerivedValue(() => {
    return `${minutes}:${second}`;
  });

  useEffect(() => {
    let sampleInterval;
    if (isStart) {
      sampleInterval = setInterval(() => {
        if (second > 0) {
          setSecond((second) => second - 1);
          // console.log("send", second);
        }
        if (second === 0) {
          if (minutes === 0) {
            clearInterval(sampleInterval);
          } else {
            // console.log("second 0 ", second);
            setMinutes((minutes) => minutes - 1);
            setSecond(59);
          }
        }
      }, 1000);
    }

    return () => {
      clearInterval(sampleInterval);
    };
  });
  const handleTime =()=> {
    setIstart(!isStart)
    const duration = (minutes * 60 + second) * 1000
    console.log(duration)
    progress.value = withTiming(isStart? 0: 1,{duration})

  }

  const handleChoseeTime =() => {
    setIstart(false)
  }

  return (
    <View style={styles.container}>
     
    
      {/* <Box style={styles.progressText}>
      <Countdown startingMinutes={60} startingSeconds={0}></Countdown>
      </Box> */}
      <Svg style={{ position: "absolute" }}>
        <Circle
          cx={width / 2}
          cy={height / 5}
          r={R}
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={30}
        ></Circle>
        <AnimatedCircle
          cx={width / 2}
          cy={height / 5}
          r={R}
          stroke={STROKE_COLOR}
          strokeWidth={15}
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={animatedProps}
          strokeLinecap={"round"}
        />
      </Svg>
      <Button style={styles.button} onPress={() => handleTime()}>
        {!isStart?'Focus':'Pause'}
      </Button>
        <Text  style={styles.progressText} fontSize="6xl" onPress={()=>handleChoseeTime()}>{minutes}:{second}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
  },
  progressText: {
    // size: 'md',
    top: height / 5 - R / 2,
    color: "rgba(0,0,0,0.7)",
  },
  button: {
    position: "absolute",
    top: height / 5 + R + 40,
  },
  buttonStop:{
    position: "absolute",
    top: height / 5 + R + 100,
  }
});

export default CircularProgress;

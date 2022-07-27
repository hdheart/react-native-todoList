import * as React from "react";
import { Text, Box, Center, VStack, Heading } from "native-base";
import { Progress } from "native-base";
import CircularProgress from "../components/circularProgress";
import Animated, { Easing,withTiming } from "react-native-reanimated";



export default function AboutScreen() {
  return (
    <VStack safeAreaTop={8} flex={1}>
        <Heading alignSelf="center" size="md">Focus Mode</Heading>
        <CircularProgress startingMinutes={0} startingSeconds={5} />
    </VStack>
  );
}

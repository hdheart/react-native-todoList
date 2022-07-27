import React from "react";
import { useState, useEffect } from "react";
import {Text} from 'native-base'

interface Props {
    startingMinutes: number,
    startingSeconds: number,
}

export default function Countdown(props: Props) {
  const { startingMinutes = 111, startingSeconds = 0 } = props;
  const [mins, setMinutes] = useState(startingMinutes);
  const [secs, setSeconds] = useState(startingSeconds);
  useEffect(() => {
    let sampleInterval = setInterval(() => {
      if (secs > 0) {
        setSeconds(secs - 1);
      }
      if (secs === 0) {
        if (mins === 0) {
          clearInterval(sampleInterval);
        } else {
          setMinutes(mins - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(sampleInterval);
    };
  });

  return (
    <Text>
        {mins} : {secs}
    </Text>
  );
}
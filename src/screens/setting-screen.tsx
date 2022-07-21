import * as React from "react";
import { Text, Box, Center, VStack, HStack, Divider, Icon } from "native-base";

export default function SettingScreen() {
  return (
    <VStack  space={3} h={100}>
      <HStack justifyContent="center">
        <Text alignContent="center" textAlign="center">Simon Mignolet</Text>
        <Icon name="arrow-forward" />
      </HStack>
      <HStack justifyContent="space-between">
        <Text>Nathaniel Clyne</Text>
        <Icon name="arrow-forward" />
      </HStack>
      <HStack justifyContent="space-between">
        <Text>Dejan Lovren</Text>
        <Icon name="arrow-forward" />
      </HStack>
    </VStack>
  );
}

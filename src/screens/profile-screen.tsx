import * as React from "react";
import {
  Text,
  Box,
  Center,
  VStack,
  HStack,
  Avatar,
  Heading,
  Icon,
  useColorModeValue,
  IconButton,
  Pressable,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import ThemeToggle from "../components/theme-toggle";
export default function PorfileScreen(props: any) {
  const { navigation } = props;
  return (
    <VStack
      px={6}
      py={4}
      h="100%"
      alignItems="center"
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "blueGray.50" }}
    >
      <VStack space={4} alignItems="center">
        <Heading size="md">Profile</Heading>
        <Avatar
          bg="purple.600"
          alignSelf="center"
          size="xl"
          source={{
            uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
          }}
        ></Avatar>
        <Heading size="md">Dalphin</Heading>
        <HStack space={3}>
          <Box bg="primary.200" p={4} borderRadius={4} shadow={3}>
            10 Task left
          </Box>
          <Box bg="primary.200" p={4} borderRadius={4} shadow={3}>
            5 Task done
          </Box>
        </HStack>
      </VStack>
      <VStack alignItems="flex-start" space={4}>
        <Heading size="sm">Setting</Heading>
        <HStack alignItems="center">
          <Icon as={Ionicons} size="md" name="home" />
          <Text ml={3} flex={3} onPress={() => navigation.navigate("Home")}>
            App Settings
          </Text>
          <Icon as={Ionicons} size="lg" name="arrow-forward" />
        </HStack>
        <Heading size="sm">Account</Heading>
        <HStack alignItems="center">
          <Icon as={Ionicons} size="md" name="home" />
          <Text ml={3} flex={3}>
            Accout Settings
          </Text>
          <Icon as={Ionicons} size="lg" name="arrow-forward" />
        </HStack>
        <Heading size="sm">uptodo</Heading>
        <HStack alignItems="center">
          <Icon as={Ionicons} size="md" name="home" />
          <Text ml={3} flex={3}>
            About Us
          </Text>
          <Icon as={Ionicons} size="lg" name="arrow-forward" />
        </HStack>
        <HStack alignItems="center">
          <Icon as={Ionicons} size="md" name="home" />
          <Text ml={3} flex={3}>
            FAQ
          </Text>
          <Icon as={Ionicons} size="lg" name="arrow-forward" />
        </HStack>
        <HStack alignItems="center">
          <Icon as={Ionicons} size="md" name="home" />
          <Text ml={3} flex={3}>
            Help & FeedBak
          </Text>
          <Icon as={Ionicons} size="lg" name="arrow-forward" />
        </HStack>
        <HStack alignItems="center">
          <Icon as={Ionicons} size="md" name="home" />
          <Text ml={3} flex={3}>
            Support Us
          </Text>
          <Icon as={Ionicons} size="lg" name="arrow-forward" />
        </HStack>
      </VStack>
      <ThemeToggle />
    </VStack>
  );
}

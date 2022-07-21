import React, { useCallback } from "react";
import {
  HStack,
  VStack,
  Center,
  Avatar,
  Heading,
  IconButton,
  useColorMode,
  useColorModeValue,
  Box,
} from "native-base";
import { DrawerContentComponentProps } from "@react-navigation/drawer";

import ThemeToggle from "./theme-toggle";
import { Feather } from "@expo/vector-icons";
import MenuButton from "./memu-button";

const Sidebar = (props: DrawerContentComponentProps) => {
  const { state, navigation } = props;
  const currentRoute = state.routeNames[state.index];

  const handlePressBackButton = useCallback(() => {
    navigation.closeDrawer();
  }, [navigation]);

  const handlePressMenuMain = useCallback(() => {
    navigation.navigate("Main");
  }, [navigation]);
  const handlepressMenuAbout = useCallback(() => {
    navigation.navigate("About");
  }, [navigation]);
  return (
    <Box h="100%"
    p={4}
    _dark={{
        backgroundColor: "blueGray.900"
      }}
      _light={{
        backgroundColor: "gray.50"
      }}
    >
      <VStack flex={1} space={2}>
        <HStack justifyContent="flex-end">
            
          <IconButton
            mt={10}
            onPress={handlePressBackButton}
            borderRadius={100}
            variant="outline"
            borderColor={useColorModeValue("blue.300", "darkBlue.700")}
            _icon={{
              as: Feather,
              name: "chevron-left",
              size: 6,
              color: useColorModeValue("blue.800", "darkBlue.700"),
            }}
          />
          
        </HStack>
        <Avatar bg="purple.600" alignSelf="center" size="2xl" source={{
        uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"
      }}>
        </Avatar>
        
        <Heading
          mb={4}
          size="xl"
          color={useColorModeValue("#000000", "#ffffff")}
        >
          dalphin
        </Heading>
        <MenuButton
          active={currentRoute === "Main"}
          onPress={handlePressMenuMain}
          icon="inbox"
        >
          Tasks
        </MenuButton>
        <MenuButton
          active={currentRoute === "About"}
          onPress={handlepressMenuAbout}
          icon="inbox"
        >
          About
        </MenuButton>
      </VStack>
      <Center>
          <ThemeToggle />
        </Center>
    </Box>
  );
};
export default Sidebar;

import * as React from "react";
import { useCallback, useState, useEffect } from "react";
import { storeData, getData } from "../utils/asyncStorage";
import {
  Text,
  Box,
  Center,
  VStack,
  themeTools,
  useTheme,
  useColorMode,
  useColorModeValue,
  Fab,
  Icon,
  Heading,
  Pressable,
  Button,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import ThemeToggle from "../components/theme-toggle";
import TaskItem from "../components/task-item";
import { StackActions, useRoute } from "@react-navigation/native";
import shortid from "shortid";

export default function MainScreen(props: any) {
  const { navigation } = props;
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData("@storage_Key");
      console.log("data", data);
    };
    fetchData().catch(e=> {
      console.log(e,'error')
    })
  }, []);
  const instState = [
    {
      id: shortid.generate(),
      title: "Code",
      isCompleted: true,
      isEditing: false,
      priority: 1,
    },
    {
      id: shortid.generate(),
      title: "Meeting with team at 9",
      isCompleted: false,
      isEditing: false,
      priority: 3,
    },
    {
      id: shortid.generate(),
      title: "Check Emails",
      isCompleted: false,
      isEditing: false,
      priority: 4,
    },
    {
      id: shortid.generate(),
      title: "Write an article",
      isCompleted: false,
      isEditing: false,
      priority: 2,
    },
  ];

  const [list, setList] = useState(instState);
  const [isEditing, setEditing] = useState(false);
  const route = useRoute();
  const onChangeSubject = useCallback((id, text) => {
    setList((prevList) => {
      const newList = [...prevList];
      const index = prevList.findIndex((item) => item.id === id);
      newList[index].title = text;
      return newList;
    });
  }, []);

  const onFinishEditing = useCallback((id) => {
    setList((prevList) => {
      const newList = [...prevList];
      const index = prevList.findIndex((item) => item.id === id);

      newList[index].isEditing = !newList[index].isEditing;
      return newList;
    });
  }, []);
  const handleCheckBox = useCallback((id) => {
    setList((prevList) => {
      const newList = [...prevList];
      const index = prevList.findIndex((item) => item.id === id);
      newList[index].isCompleted = !newList[index].isCompleted;
      return newList;
    });
  }, []);
  const handlePressText = useCallback((id) => {
    setList((prevList) => {
      const newList = [...prevList];
      const index = prevList.findIndex((item) => item.id === id);
      newList[index].isEditing = !newList[index].isEditing;
      return newList;
    });
  }, []);
  return (
    <Center
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "blueGray.50" }}
      px={4}
      flex={1}
    >
      <VStack pt={5} w="90%" space={2} alignItems="center">
        <Heading size="md"> Tasks</Heading>
        {list.map((item, index) => (
          <TaskItem
            id={item.id}
            data={item}
            key={item + index.toString()}
            isDone={item.isCompleted}
            subject={item.title}
            isEditing={item.isEditing}
            priority={item.priority}
            onChangeSubject={onChangeSubject}
            onFinishEditing={onFinishEditing}
            onChangeCheckBox={handleCheckBox}
            onPressText={handlePressText}
            navigation={navigation}
            route={route}
          />
        ))}
      </VStack>

      <Fab
        position="relative"
        // display="true"
        right={0}
        bottom={0}
        left={0}
        margin="auto"
        mb={4}
        renderInPortal={false}
        shadow={2}
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="lg" />}
      />
    </Center>
  );
}

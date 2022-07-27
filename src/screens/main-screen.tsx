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
  ScrollView,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import ThemeToggle from "../components/theme-toggle";
import TaskItem from "../components/task/task-item";
import {
  StackActions,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import shortid from "shortid";
import TaskModal from "../components/task/task-modal";
import TaskDetailModal from "../components/task/task-detail-modal";
import Masthead from "../components/masthead";
import AnimateColorBox from "../components/task/animated-color-box";
interface List {
  id: string;
  isCompleted: boolean;
  isEditing: boolean;
  priority: number;
  title: string;
}

export default function MainScreen(props: any) {
  const { navigation } = props;
  const [list, setList] = useState<List[]>([]);
  const [showModal, setShowMModal] = useState(false);

  const route = useRoute();
  // useEffect(() => {
  //   fetchData().catch((e) => {
  //     console.log(e, "error");
  //   });
  // }, []);
  useFocusEffect(
    useCallback(() => {
      fetchData().catch((e) => {
        console.log(e, "error");
      });
    }, [])
  );
  const fetchData = async () => {
    const data = await getData("@taskList");
    if (data == null) {
      return;
    }
    setList(data);
  };
  const onChangeSubject = useCallback((id, subject) => {
    setList((prevList) => {
      const newList = [...prevList];
      const index = prevList.findIndex((item) => item.id === id);
      newList[index].title = subject;
      return newList;
    });
  }, []);

  const onFinishEditing = useCallback((id) => {
    setList((prevList) => {
      const newList = [...prevList];
      const index = prevList.findIndex((item) => item.id === id);
      newList[index].isEditing = !newList[index].isEditing;
      storeData("@taskList", newList);
      return newList;
    });
  }, []);
  const handleCheckBox = useCallback((id) => {
    setList((prevList) => {
      const newList = [...prevList];
      const index = prevList.findIndex((item) => item.id === id);
      newList[index].isCompleted = !newList[index].isCompleted;
      storeData("@taskList", newList);
      return newList;
    });
  }, []);
  const handlePressText = useCallback((id) => {
    setList((prevList) => {
      const newList = [...prevList];
      const index = prevList.findIndex((item) => item.id === id);
      newList[index].isEditing = !newList[index].isEditing;
      storeData("@taskList", newList);
      return newList;
    });
  }, []);
  const handleDeleted = useCallback((id) => {
    setList((prevList) => {
      const newList = [...prevList];
      const tempList = newList.filter((item) => item.id !== id);
      storeData("@taskList", tempList);
      return tempList;
    });
  }, []);

  const handleSaveModal = useCallback((data) => {
    setShowMModal(false);
    setList(data);
    storeData("@taskList", data);
  }, []);
  const handleCancelModal = useCallback(() => {
    setShowMModal(false);
  }, []);

  const onPressFab = () => {
    setShowMModal(true);
  };

  const handleSaveItem = useCallback((items) => {
    setList((prevList) => {
      const newList = [...prevList];
      const index = prevList.findIndex((item) => item.id == items.id);
      newList[index] = items;
      storeData("@taskList", newList);
      return newList;
    });
  }, []);
  return (
    <AnimateColorBox
      flex={1}
      bg={useColorModeValue("warmGray.50", "primary.900")}
      w="full"
    >
      <VStack>
        <Masthead
          title="hi"
          image={require("../assets/masthead.png")}
        ></Masthead>
      </VStack>
      <ScrollView mb={150} mt="-20px" _contentContainerStyle={{}}>
        <VStack
          p={4}
          w="100%"
          space={2}
          bg="white"
          // mt="-20px"
          borderTopLeftRadius="20px"
          borderTopRightRadius="20px"
          borderBottomRadius="20px"
        >
          {list.map((item, index) => (
            <TaskItem
              item={item}
              key={item + index.toString()}
              onSaveItem={handleSaveItem}
              onChangeSubject={onChangeSubject}
              onFinishEditing={onFinishEditing}
              onChangeCheckBox={handleCheckBox}
              onPressText={handlePressText}
              onDeleted={handleDeleted}
              navigation={navigation}
              route={route}
            />
          ))}
        </VStack>
      </ScrollView>

      <Fab
        position="absolute"
        // display="true"
        // right={0}
        // bottom={0}
        // left={0}
        // margin="auto"
        mb={10}
        renderInPortal={false}
        shadow={2}
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="lg" />}
        onPress={onPressFab}
      />
      <TaskModal
        isOpen={showModal}
        data={list}
        onSaveModal={handleSaveModal}
        onCancelModal={handleCancelModal}
      ></TaskModal>
    </AnimateColorBox>
  );
}

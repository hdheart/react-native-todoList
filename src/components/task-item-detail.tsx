import * as React from "react";
import { useState } from "react";
import {
  Box,
  Center,
  Text,
  Button,
  Icon,
  VStack,
  HStack,
  Checkbox,
  Input,
} from "native-base";
import { StackActions } from "@react-navigation/native";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import TaskItem from "./task-item";
import { storeData, getData} from '../utils/asyncStorage'
const TaskItemDetail = ({ navigation, route }: any) => {
  // console.log(route.params);

  const { id, title, isCompleted, priority } = route.params;
  const [isChecked, setChecked] = useState(isCompleted);
  const [subject, setSubject] = useState(title);
  const [isEditing, setEditing] = useState(false);

  // const storeData = async (value: object) => {
  //   try {
  //     const jsonValue = JSON.stringify(value)
  //     console.log('jsonValue',jsonValue)
  //     await AsyncStorage.setItem('@storage_Key', jsonValue)
  //   } catch (e) {
  //     // saving error
  //   }
  // }

  // const getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('@storage_Key')
  //     console.log('getdata',jsonValue)
  //     return jsonValue != null ? JSON.parse(jsonValue) : null;
  //   } catch(e) {
  //     // error reading value
  //   }
  // }
  


  const onChangeCheckBox = () => {
    setChecked(!isChecked);
  };

  const handleChangeSubject = (text:string) => {
    console.log('text', text)
    setSubject(text)
  };

  const onFinishEditing = () => {
    setEditing(false)

  };

  const onPressText = () => {
    setEditing(true)
  };

  const handleSave = () => {
    const data = [{
      id,
      title: subject,
      isCompleted: isChecked, 
      priority

    }]
    storeData('@taskList', data)
  }
  return (
    <VStack h="100%" minH={700}>
      <HStack
         mt={20} 
         mx={4}
         p={4}
        key={id}
        // w="100%"
        bg="gray.200"
        // p={4}
        borderRadius={4}
        alignItems="center"
        // justifyContent="space-between"
        space={4}
      >
        <Checkbox
          isChecked={isChecked}
          accessibilityLabel="taskCheck"
          onChange={onChangeCheckBox}
          value={subject}
        ></Checkbox>
        <VStack flex={1}>
          {isEditing ? (
            <Input
              placeholder="task"
              value={subject}
              variant="unstyled"
              fontSize={14}
              size="xs"
              // maxW={200}
              // px={1}
              // py={0}
              autoFocus
              blurOnSubmit
              onChangeText={handleChangeSubject}
              onBlur={onFinishEditing}
            ></Input>
          ) : (
            <Text
              fontSize={19}
              // flex={1}
              onPress={onPressText}
              strikeThrough={isChecked}
            >
              {subject}
            </Text>
          )}

          <HStack alignItems="center">
            <Text flex={1}>today At 16:30</Text>

            <Button
              mr={2}
              size="sm"
              leftIcon={
                <Icon as={Ionicons} name="flag-outline" size="sm" opacity={1} />
              }
            >
              <Text color="white" fontSize={16}>
                {priority}
              </Text>
            </Button>
          </HStack>
        </VStack>
      </HStack>

      <VStack mt={1} p={8} space={8}>
        <HStack space={4} alignItems="center" justifyContent="flex-start">
          <AntDesign name="edit" size={24} color="black" />
          <Text flex={1}>Task Time</Text>
          <Button
            mr={2}
            size="sm"
            leftIcon={
              <Icon as={Ionicons} name="flag-outline" size="sm" opacity={1} />
            }
          >
            Today At 16:45
          </Button>
        </HStack>
        <HStack space={4} alignItems="center" justifyContent="flex-start">
          <AntDesign name="edit" size={24} color="black" />
          <Text flex={1}>Task Category</Text>
          <Button
            mr={2}
            size="sm"
            leftIcon={
              <Icon as={Ionicons} name="flag-outline" size="sm" opacity={1} />
            }
          >
            work
          </Button>
        </HStack>
        <HStack space={4} alignItems="center" justifyContent="flex-start">
          <AntDesign name="edit" size={24} color="black" />
          <Text flex={1}>Task priority</Text>
          <Button
            mr={2}
            size="sm"
            leftIcon={
              <Icon as={Ionicons} name="flag-outline" size="sm" opacity={1} />
            }
          >
            1
          </Button>
        </HStack>
        <HStack space={4} alignItems="center" justifyContent="flex-start">
          <AntDesign name="delete" size={24} color="black" />
          <Text color="red.500" flex={1}>
            Delete Task
          </Text>
        </HStack>
      </VStack>
      <Button alignSelf="center" position="absolute" w="90%" bottom={10} 
      onPress={handleSave}
      >
        Edit Task
      </Button>
    </VStack>
  );
};
export default TaskItemDetail;

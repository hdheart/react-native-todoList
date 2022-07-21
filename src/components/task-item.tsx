import React, { useCallback, useState } from "react";
import {
  Box,
  Text,
  useTheme,
  themeTools,
  useColorModeValue,
  HStack,
  VStack,
  Input,
  Checkbox,
  Button,
  Icon,
  IconButton,
} from "native-base";
import AnimatedCheckBox from "./animated-checkbox";
import { StackActions } from "@react-navigation/native";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";

interface Props {
  isDone: boolean;
  id: string;
  data: object
  subject: string;
  isEditing?: boolean;
  priority: number;
  onChangeSubject?: (id: string, subject: string) => void;
  onFinishEditing: (id: string) => void;
  onChangeCheckBox: (id: string) => void;
  onPressText: (id: string) => void;
  navigation: any;
  route: any;
}

const TaskItem = (props: Props) => {
  const {
    isDone,
    subject,
    isEditing,
    onChangeSubject,
    onFinishEditing,
    id,
    priority,
    onChangeCheckBox,
    onPressText,
    navigation,
    route,
    data
  } = props;
  const handleChangeSubject = useCallback(
    (text) => {
      onChangeSubject && onChangeSubject(id, text);
    },
    [onChangeSubject]
  );

  return (
    <HStack
      key={id}
      w="100%"
      bg="gray.200"
      p={4}
      borderRadius={4}
      alignItems="center"
      // justifyContent="space-between"
      space={2}
    >
      <Checkbox
        isChecked={isDone}
        accessibilityLabel="taskCheck"
        onChange={() => onChangeCheckBox(id)}
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
            maxW={200}
            // px={1}
            // py={0}
            autoFocus
            blurOnSubmit
            onChangeText={handleChangeSubject}
            onBlur={() => onFinishEditing(id)}
          ></Input>
        ) : (
          <Text
            fontSize={19}
            // flex={1}
            onPress={() => onPressText(id)}
            strikeThrough={isDone}
          >
            {subject}
          </Text>
        )}

        <HStack alignItems="center" >
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

          <AntDesign
            onPress={() =>
              navigation.dispatch(StackActions.push("Detail", data))
            }
            name="edit"
            size={24}
            color="black"
          />
        </HStack>
      </VStack>
    </HStack>
  );
};

export default TaskItem;

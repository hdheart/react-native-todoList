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
import AnimatedCheckBox from "../animated-checkbox";
import { StackActions } from "@react-navigation/native";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import TaskDetailModal from "./task-detail-modal";

interface Props {
  item: object | any;
  onChangeSubject: (id: string, text: string) => void;
  onFinishEditing: (id: string) => void;
  onChangeCheckBox: (id: string) => void;
  onPressText: (id: string) => void;
  onDeleted: (id: string) => void;
  onSaveItem: (item: object)=> void
  navigation: any;
  route: any;
}

const TaskItem = (props: Props) => {
  const {
    onChangeSubject,
    onFinishEditing,
    onDeleted,
    onChangeCheckBox,
    onPressText,
    onSaveItem,
    navigation,
    route,
    item,
  } = props;
  const { id, content, isCompleted, isEditing, priority, title } = item;

  const [editOpen, setEditOpen] = useState(false);
  const handleChangeSubject = useCallback(
    (text) => {
      onChangeSubject && onChangeSubject(id, text);
    },
    [onChangeSubject]
  );
  const onEditModal = () => {
    setEditOpen(false);
  };
  const onEditCancelModal = () => {
    setEditOpen(false);
  };
  const onEditSaveModal = useCallback(data => {
    onSaveItem(data)
    setEditOpen(false);
  },[]);

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
        isChecked={isCompleted}
        accessibilityLabel="taskCheck"
        onChange={() => onChangeCheckBox(id)}
        value={title}
      ></Checkbox>
      <VStack flex={1}>
        {isEditing ? (
          <Input
            placeholder="task"
            value={title}
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
            strikeThrough={isCompleted}
          >
            {title}
          </Text>
        )}

        <HStack alignItems="center" space={3}>
          <Text flex={1}>today At 16:30</Text>
            <Button
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
              onPress={() => setEditOpen(true)}
              name="edit"
              size={24}
              color="black"
            />
            <AntDesign
              name="delete"
              size={24}
              color="black"
              onPress={() => onDeleted(id)}
            />
        </HStack>
      </VStack>
      <TaskDetailModal
        item={item}
        editOpen={editOpen}
        handleEditModal={onEditModal}
        handelEditCancelModal={onEditCancelModal}
        handelEditSaveModal={onEditSaveModal}
        handleDeleted={()=>onDeleted(id)}
      ></TaskDetailModal>
    </HStack>
  );
};

export default TaskItem;

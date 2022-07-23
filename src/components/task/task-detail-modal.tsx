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
  Modal,
} from "native-base";
import { StackActions } from "@react-navigation/native";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import TaskItem from "./task-item";
import { storeData, getData } from "../../utils/asyncStorage";


interface Props {
  item: object | any
  editOpen: boolean;
  handleEditModal: () => void;
  handelEditCancelModal: () => void;
  handelEditSaveModal: () => void;
}
const TaskDetailModal = (props: Props) => {
  const {
    item,
    editOpen,
    handleEditModal,
    handelEditCancelModal,
    handelEditSaveModal,
  } = props;
  return (
    <Modal
      isOpen={editOpen}
      onClose={() => handleEditModal()}
      safeAreaTop={true}
    >
      <Modal.Content size="full" h="100%">
        <Modal.CloseButton />
        <Modal.Header>task detail</Modal.Header>
        <Modal.Body>
          <VStack h="100%" minH={700}>
            <HStack
              mt={8}
              mx={4}
              p={4}
              key={item.id}
              // w="100%"
              bg="gray.200"
              // p={4}
              borderRadius={4}
              alignItems="center"
              // justifyContent="space-between"
              space={4}
            >
              <Checkbox
                isChecked={item.isCompleted}
                accessibilityLabel="taskCheck"
                // onChange={onChangeCheckBox}
                value={"subject"}
              ></Checkbox>
              <VStack flex={1}>
                {item.isEditing ? (
                  <Input
                    placeholder="task"
                    value={item.title}
                    variant="unstyled"
                    fontSize={14}
                    size="xs"
                    // maxW={200}
                    // px={1}
                    // py={0}
                    autoFocus
                    blurOnSubmit
                    // onChangeText={handleChangeSubject}
                    // onBlur={onFinishEditing}
                  ></Input>
                ) : (
                  <Text
                    fontSize={19}
                    // flex={1}
                    // onPress={onPressText}
                    // strikeThrough={isChecked}
                  >
                    {item.title}
                  </Text>
                )}
                <Text>do something else</Text>
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
                    <Icon
                      as={Ionicons}
                      name="flag-outline"
                      size="sm"
                      opacity={1}
                    />
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
                    <Icon
                      as={Ionicons}
                      name="flag-outline"
                      size="sm"
                      opacity={1}
                    />
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
                    <Icon
                      as={Ionicons}
                      name="flag-outline"
                      size="sm"
                      opacity={1}
                    />
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
            {/* <Button
              alignSelf="center"
              position="absolute"
              w="90%"
              bottom={10}
              onPress={handleSave}
            >
              Edit Task
            </Button>  */}
          </VStack>
        </Modal.Body>

        <Button.Group >
          <Button
          flex={1}
            variant="ghost"
            colorScheme="blueGray"
            onPress={() => {
              handelEditCancelModal();
            }}
          >
            Cancel
          </Button>
          <Button
          flex={1}
            onPress={() => {
              handelEditSaveModal();
            }}
          >
            Save
          </Button>
        </Button.Group>
      </Modal.Content>
    </Modal>
  );
};
export default TaskDetailModal;

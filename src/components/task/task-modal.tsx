//@ts-nocheck

import { Modal, FormControl, Input, Button, HStack,VStack, Text } from "native-base";
import { useCallback, useState } from "react";
import shortid from "shortid";
import { Ionicons } from "@expo/vector-icons";
import TaskpriorityModal from "./task-priotity-modal";
import TaskCategoryModal from "./task-category-modal";

interface Props {
  isOpen: boolean;
  onSaveModal: (data: array) => void;
  onCancelModal: () => void;
  data: array | any;
}

const TaskModal = (props: Props) => {
  const { isOpen, onSaveModal, onCancelModal, data } = props;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority,setPriority] = useState(1)
  const [cate, setCate] = useState('')
  const [isCateOpen, setCateOpen] = useState(false)
  const [isPirorityOpen, setPriOpen] = useState(false)


  const handleTitlechange = (text) => {
    setTitle(text);
  };
  const handleContentchange = (text) => {
    setContent(text);
  };

  const handleSaveModal = () => {
    const newData = {
      id: shortid.generate(),
      title,
      content,
      priority,
      cateGory:cate,
      isCompleted: false,
      isEditing: false,
    };
    if (Object.keys(data).length !== 0) {
      const newList = [...data, newData];
      onSaveModal(newList);
    } else if (Object.keys(data).length === 0) {
      const newList = [];
      newList.push(newData);
      onSaveModal(newList);
    }
  };
  const handleCateModalOpen=() =>{
    setCateOpen(true)
  }
  const handleCateSave=useCallback((category) => {
    setCate(category)
    setCateOpen(false)
  },[])
  const handleCateCancel=() => {
    setCateOpen(false)
  }
  //priority 
  const handlePriModalOpen=() =>{
    setPriOpen(true)
  }
  const handlePriSave=useCallback((_priority) => {
    setPriority(_priority)
    setPriOpen(false)
  },[])
  const handlePriCancel=() => {
    setPriOpen(false)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onCancelModal(false)}
      safeAreaTop={true}
    >
      <Modal.Content maxWidth="350" {...styles["center"]}>
        <Modal.CloseButton />
        <Modal.Header>Add Task</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>Title</FormControl.Label>
            <Input placeholder="" onChangeText={handleTitlechange} />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Content</FormControl.Label>
            <Input onChangeText={handleContentchange} />
          </FormControl>
          <VStack mt={4} space={5}>
            <HStack space={4}>
            <Ionicons name="ios-time-outline" size={24} color="black" />
            <Text>{new Date().getTime()}</Text>
            </HStack>

            <HStack space={4}>
            <Ionicons onPress={() => handleCateModalOpen()} name="pricetag-outline" size={24} color="black" />
            <Text>{cate}</Text>
            </HStack>
            <HStack space={4} >
            <Ionicons onPress={() => handlePriModalOpen()}  name="flag-outline" size={24} color="black" />
            <Text>proirity {priority}</Text>
            </HStack>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                onCancelModal(false);
              }}
            >
              Cancel
            </Button>
            <Button onPress={handleSaveModal}>Save</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
      <TaskCategoryModal
        isOpen={isCateOpen}
        onSaveModal={handleCateSave}
        onCancelModal={handleCateCancel}
      >

      </TaskCategoryModal>
      <TaskpriorityModal
      isOpen={isPirorityOpen}
      onSaveModal={handlePriSave}
      onCancelModal={handlePriCancel}
      >

      </TaskpriorityModal>
    </Modal>
  );
};

const styles = {
  top: {
    marginBottom: "auto",
    marginTop: 0,
  },
  bottom: {
    marginBottom: 0,
    marginTop: "auto",
  },
  left: {
    marginLeft: 0,
    marginRight: "auto",
  },
  right: {
    marginLeft: "auto",
    marginRight: 0,
  },
  center: {},
};

export default TaskModal;

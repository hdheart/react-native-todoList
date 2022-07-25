import * as React from "react";
import { useState, useCallback } from "react";
import { Button, Modal, HStack, VStack, Text } from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

interface Props {
  isOpen: boolean;
  onCancelModal: () => void;
  onSaveModal: (category: string) => void;
}

const TaskCategoryModal = (props: Props) => {
  const { isOpen, onCancelModal, onSaveModal } = props;
  const [category, setCategory] = useState("");
  const categorys = [
    {
      name: "Grocery",
      icon: "local-grocery-store",
      variant: "ghost",
    },
    {
      name: "Work",
      icon: "work-outline",
      variant: "ghost",
    },
  ];
  const [initCates, setInitCates] = useState(categorys);

  const handlePressCate = useCallback((name,index) => {
    setInitCates(prevList => {
        const newList = [...prevList]
        newList.forEach(item => {
            item.variant = 'ghost'
        })
        newList[index].variant = 'solid'
        return newList
    })
    setCategory(name);
  }, []);
  return (
    <Modal isOpen={isOpen} onClose={() => onCancelModal()} safeAreaTop={true}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Add Task</Modal.Header>
        <Modal.Body>
          <HStack flexWrap="wrap" justifyContent="flex-start" space={4}>
            {initCates.map((item, index) => (
              <VStack key={item.name}>
                <Button
                  //   w={70}
                  //   ml={4}
                  //   mb={4}
                  variant={item.variant}
                  size="sm"
                  onPress={() => {
                    handlePressCate(item.name,index);
                  }}
                  leftIcon={
                    // <Ionicons name={item.icon} size={24} color="white" />
                    <MaterialIcons name={item.icon} size={24} color="black" />
                  }
                ></Button>
                <Text alignSelf="center">{item.name}</Text>
              </VStack>
            ))}
          </HStack>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                onCancelModal();
              }}
            >
              Cancel
            </Button>
            <Button onPress={() => onSaveModal(category)}>Save</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default TaskCategoryModal;

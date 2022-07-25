import * as React from "react";
import { useState, useCallback } from "react";
import { Button, Modal, HStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  isOpen: boolean;
  onCancelModal: () => void;
  onSaveModal: (priority: number) => void;
}

const TaskpriorityModal = (props: Props) => {
  const { isOpen, onCancelModal, onSaveModal } = props;
  const [priority, setPriority] = useState(1);
  const [initPriority,setInitPri] = useState([
    {
      id: 1,
      variant: "outline",
    },
    {
      id: 2,
      variant: "outline",
    },
    {
      id: 3,
      variant: "outline",
    },
    {
      id: 4,
      variant: "outline",
    },
    {
      id: 5,
      variant: "outline",
    },
    {
      id: 6,
      variant: "outline",
    },
    {
      id: 7,
      variant: "outline",
    },
    {
      id: 8,
      variant: "outline",
    },
    {
      id: 9,
      variant: "outline",
    },
    {
      id: 10,
      variant: "outline",
    },
  ]);

  const handlePressPri = useCallback((index) => {
    setInitPri(prevList => {
        const newList = [...prevList]
        newList.forEach(item => {
            item.variant = 'outline'
        });
        newList[index].variant = 'solid'
        return newList
    })
    setPriority(initPriority[index].id);
  }, []);
  return (
    <Modal isOpen={isOpen} onClose={() => onCancelModal()} safeAreaTop={true}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Add Task</Modal.Header>
        <Modal.Body>
          <HStack flexWrap="wrap" justifyContent="flex-start">
            {initPriority.map((item, index) => (
              <Button
                w={70}
                ml={4}
                mb={4}
                key={item.id}
                size="sm"
                onPress={() => {
                  handlePressPri(index);
                }}
                variant={item.variant}
                leftIcon={
                  <Ionicons name="flag-outline" size={20} color="black" />
                }
              >
                {item.id}
              </Button>
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
            <Button onPress={() => onSaveModal(priority)}>Save</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default TaskpriorityModal;

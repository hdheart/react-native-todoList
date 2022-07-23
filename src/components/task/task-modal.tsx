//@ts-nocheck

import { Modal,FormControl,Input,Button } from "native-base";
import { useCallback, useEffect, useState } from "react";
import { getData, storeData } from "../../utils/asyncStorage";
import shortid from "shortid";

interface Props {
  isOpen: boolean;
  onSaveModal: (data: array) => void;
  onCancelModal: () => void;
  data: array
}

const TaskModal = (props: Props) => {
  const { isOpen,onSaveModal,onCancelModal,data } = props;
  const [ title, setTitle ]= useState('')
  const [ content, setContent ] =useState('')


  const handleTitlechange = (text) => {
    setTitle(text)

  }
  const handleContentchange = (text) => {
    setContent(text)

  }

  const handleSaveModal =()=> {
    const newData = {
        id:shortid.generate(),
        title:title,
        content: content,
        priorty: 1,
        isCompleted: false,
        isEditing: false
    }
    const newList = [...data, newData]
    onSaveModal(newList)
  
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={() => onCancelModal(false)} safeAreaTop={true}>
        <Modal.Content maxWidth="350" {...styles["center"]}>
          <Modal.CloseButton />
          <Modal.Header>Add Task</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Title</FormControl.Label>
              <Input placeholder="" onChangeText={handleTitlechange}/>
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Content</FormControl.Label>
              <Input  onChangeText={handleContentchange}/>
            </FormControl>
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
              <Button
                onPress={handleSaveModal}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
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

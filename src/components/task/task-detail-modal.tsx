import * as React from "react";
import { useState,useCallback } from "react";
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
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import TaskpriorityModal from "./task-priotity-modal";
import TaskCategoryModal from "./task-category-modal";

interface Props {
  item: object | any;
  editOpen: boolean;
  handleEditModal: () => void;
  handelEditCancelModal: () => void;
  handelEditSaveModal: (item: object) => void;
  handleDeleted: () => void;

}

const TaskDetailModal = (props: Props) => {
  const {
    item,
    editOpen,
    handleEditModal,
    handelEditCancelModal,
    handelEditSaveModal,
    handleDeleted,
  
  } = props;
  const { id, content, isCompleted, isEditing, title, priority,category } = item;
  const [_title, setTitle] =useState(title)
  const [_content, setContent] =useState(content)
  const [_isCompleted, setCompleted] = useState(isCompleted)
  const [_isEditing, setEditng] = useState(isEditing)
  const [_priority,setPriority] =useState(priority)
  const [_cate,setCate] = useState(category? category: '')
 
  const [date, setDate] = useState(new Date());
  const [month, setMonth] =useState('')
  const [time, setTime] = useState('');
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const [isPriOpen, setPriOpen] = useState(false)
  const [isCateOpen, setCateOpen] = useState(false)
  

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    if (mode == "date") {
      let date = new Date(currentDate)
      let months = date.getMonth()
      let days = date.getDate()
      setMonth(months + '/'+ days)
      setDate(currentDate)
    } else if (mode == "time") {
      let date = new Date(currentDate)
      let hours = date.getHours()
      let minutes = date.getMinutes()
      setTime(hours+ ':' + minutes);
    }
  };

  const showMode = (currentMode: React.SetStateAction<string>) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const handleChangeCheckBox = () => {
    setCompleted(!_isCompleted)
  }
  const handlePressText = () => {
    setEditng(!_isEditing)
  }
  const handleChangeSubject = useCallback((text)=>{
    setTitle(text)
  },[])
  const onFinishEditing = () => {
    setEditng(false)
  }
  const onEditSaveModal =() =>{
    const item = {
      id,
      title: _title,
      content: _content,
      priority: _priority,
      category: _cate,
      isEditing: _isEditing,
      isCompleted: _isCompleted,
    }
    handelEditSaveModal(item)
  }
  // priority handle
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

    // category handle
    const handleCateModalOpen=() =>{
      setCateOpen(true)
    }
    const handleCateSave=useCallback((_cate) => {
      setCate(_cate)
      setCateOpen(false)
    },[])
    const handleCateCancel=() => {
      setCateOpen(false)
    }

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
                isChecked={_isCompleted}
                accessibilityLabel="taskCheck"
                onChange={handleChangeCheckBox}
                value={"subject"}
              ></Checkbox>
              <VStack flex={1}>
                {_isEditing ? (
                  <Input
                    placeholder="task"
                    value={_title}
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
                    onPress={handlePressText}
                    strikeThrough={_isCompleted}
                  >
                    {_title}
                  </Text>
                )}
                <Text>{_content}</Text>
              </VStack>
            </HStack>

            <VStack mt={1} p={8} space={8}>
              <HStack space={4} alignItems="center" justifyContent="flex-start">
                <AntDesign name="edit" size={24} color="black" />
                <Text flex={1}>Task Time</Text>
                <VStack flex={2} space={2}>
                  <Button
                    mr={2}
                    size="sm"
                    onPress={showDatepicker}
                    leftIcon={
                      <Ionicons
                        name="ios-time-outline"
                        size={20}
                        color="white"
                      />
                    }
                  >
                    {month}
                  </Button>
                  <Button
                    mr={2}
                    size="sm"
                    onPress={showTimepicker}
                    leftIcon={
                      <Ionicons
                        name="ios-time-outline"
                        size={20}
                        color="white"
                      />
                    }
                  >
                    {time}
                  </Button>
                </VStack>
              </HStack>

              <HStack space={4} alignItems="center" justifyContent="flex-start">
                <AntDesign name="edit" size={24} color="black" />
                <Text flex={1}>Task Category</Text>
                <Button
                  mr={2}
                  onPress={()=> {handleCateModalOpen()}}
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
                  {_cate}
                </Button>
              </HStack>
              <HStack  space={4} alignItems="center" justifyContent="flex-start">
                <AntDesign name="edit" size={24} color="black" />
                <Text flex={1}>Task priority</Text>
                <Button
                  mr={2}
                  size="sm"
                  onPress={() => handlePriModalOpen()}
                  leftIcon={
                    <Icon
                      as={Ionicons}
                      name="flag-outline"
                      size="sm"
                      opacity={1}
                    />
                  }
                >
                  {_priority}
                </Button>
              </HStack>
              <HStack space={4} alignItems="center" justifyContent="flex-start">
                <AntDesign name="delete" size={24} color="black" />
                <Text onPress={() => handleDeleted()} color="red.500" flex={1}>
                  Delete Task
                </Text>
              </HStack>
            </VStack>
          </VStack>
        </Modal.Body>

        <Button.Group>
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
              onEditSaveModal();
            }}
          >
            Save
          </Button>
        </Button.Group>
      </Modal.Content>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
      <TaskpriorityModal
        isOpen={isPriOpen}
        onCancelModal={handlePriCancel}
        onSaveModal={handlePriSave}
      ></TaskpriorityModal>
      <TaskCategoryModal
      isOpen={isCateOpen}
      onCancelModal={handleCateCancel}
      onSaveModal={handleCateSave}
      >

      </TaskCategoryModal>
    </Modal>
  );
};
export default TaskDetailModal;

/* eslint-disable @typescript-eslint/no-unused-vars */
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import {
  VStack,
  HStack,
  Checkbox,
  Box,
  ButtonGroup,
  IconButton,
  Flex,
  Input,
  Editable,
  EditableInput,
  EditablePreview,
  useEditableControls,
} from '@chakra-ui/react';
import React, { useState, ChangeEvent, Dispatch, SetStateAction } from 'react';

import CustomDisplayTodoItem from './CustomDisplayTodoItem';

type Props = {
  todoItems: string[];
  todoStatus: boolean[];
  setTodoStatus: Dispatch<SetStateAction<boolean[]>>;
};

const TodoList = (props: Props) => {
  const handleTodoStatus = (event: ChangeEvent<HTMLInputElement>) => {
    const newTodoStatus = [...props.todoStatus];
    const elementNumber = +event.target.value;
    newTodoStatus[elementNumber] = !newTodoStatus[elementNumber];
    props.setTodoStatus(newTodoStatus);
  };

  const EditableControls = () => {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } =
      useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="xs">
        <IconButton aria-label="Check" icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton aria-label="Close" icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton aria-label="Edit" size="xs" icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  };

  return (
    <VStack>
      {props.todoItems.map((todoItem, index) => (
        <Box key={todoItem} w="500px" h="60px" p={5} shadow="md" borderWidth="1px">
          <HStack w="100%" h="100%" justifyContent="space-between">
            <Checkbox value={index} onChange={handleTodoStatus} />
            <Editable defaultValue={todoItem} isPreviewFocusable={false}>
              {props.todoStatus[index] === false ? (
                <EditablePreview />
              ) : (
                <EditablePreview as="del" />
              )}
              <EditableInput />
              <EditableControls />
            </Editable>
            <Box bg="blue.100">削除</Box>
          </HStack>
        </Box>
      ))}
    </VStack>
  );
};

export default TodoList;

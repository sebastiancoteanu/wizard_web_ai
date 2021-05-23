import React from 'react';
import { useSelector } from "react-redux";
import { IRootState } from "app/shared/reducers";
import { IPage } from "app/shared/model/page.model";

interface ReturnData {
  page: IPage;
  isEditing: boolean;
}

type Hook = (pageId: IPage['id']) => ReturnData;

const useEditingPage: Hook = (pageId) => {
  const editingPage = useSelector<IRootState, IPage>(state => state.page.entity);
  return {
    page: editingPage,
    isEditing: editingPage.id === pageId,
  };
}

export default useEditingPage;

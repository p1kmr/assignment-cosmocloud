import React from "react";
import { formAction } from "../store/formAction";
import { v4 as uuidv4 } from 'uuid';

export const initialFormState = {
  forms: []
};

export const boxReducer = (state, action) => {
  switch (action.type) {
    case formAction.GENERATE_PARENT:
      const clonedState = JSON.parse(
        JSON.stringify(state)
      );
      const newForms = { fieldId: state.forms.length + 1, fieldName: "", fieldTypeDropdown: "" };
      clonedState.forms.push(newForms);
      return clonedState;

    case formAction.GENERATE_CHILD:
      const clonedStateF = JSON.parse(JSON.stringify(state));
      const parentIndex = clonedStateF.forms.findIndex(form => form.fieldId === action.payload.parentId);
      if (parentIndex !== -1) {
        const newChild = {
          fieldId: state.forms[parentIndex]?.child?.length + 1,
          fieldName: "",
          fieldTypeDropdown: "",
        };
        if (!clonedStateF.forms[parentIndex].child) {
          clonedStateF.forms[parentIndex].child = []; // Create an empty child array if it doesn't exist
        }
        clonedStateF.forms[parentIndex].child.push(newChild);
      }
      return clonedStateF;


    case formAction.UPDATE_FORM_FIELD:
      const clonedStateForm = JSON.parse(JSON.stringify(state));
      const formIndex = state.forms.findIndex(form => form.fieldId === action.payload.fieldId);
      if (formIndex !== -1) {
        clonedStateForm.forms[formIndex].fieldTypeDropdown = action.payload.value;
      }
      return clonedStateForm;

    case formAction.UPDATE_FORM_TEXT_FIELD:
      const clonedStateFormData = JSON.parse(JSON.stringify(state));
      console.log("action.payload.value", action.payload.fieldId);
      const formIndx = state.forms.findIndex(form => form.fieldId === action.payload.fieldId);
      if (formIndx !== -1) {
        clonedStateFormData.forms[formIndx].fieldName = action.payload.value;
      }
      return clonedStateFormData;

    case formAction.DELETE_PARENT:
      const clonedFrm = JSON.parse(JSON.stringify(state));
      const parentIndx = clonedFrm.forms.findIndex(form => form.fieldId === action.payload.parentId);
      if (parentIndx !== -1) {
        clonedFrm.forms.splice(parentIndx, 1);
      }
      return clonedFrm;
    default:
      return state;
  }
};


export const FormContext = React.createContext(null);

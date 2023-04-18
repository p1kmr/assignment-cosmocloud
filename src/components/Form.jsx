import { Grid, IconButton, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';
import { formAction } from '../store/formAction';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
  },
  formContainer:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dropDown:{
    height: "36px",
    width: "88px"
  },
  icons:{
    display: 'flex',
    justifyContent: 'flex-end'
  },
});

export const Form = (props) => {
  const classes = useStyles();

  const { deleteParent, generateChild, forms, formDispatch } = props;

  const handleFieldChange = (singleForm, value, fieldPath) => {
    if (fieldPath === "fieldName") {
      const fieldId = singleForm.fieldId;
      formDispatch({ type: formAction.UPDATE_FORM_TEXT_FIELD, payload: { fieldId: fieldId, fieldName: "fieldName", value: value } })
    }
    if (fieldPath === "fieldTypeDropdown") {
      const fieldId = singleForm.fieldId;
      formDispatch({ type: formAction.UPDATE_FORM_FIELD, payload: { fieldId: fieldId, fieldTypeDropdown: "fieldTypeDropdown", value: value } })
    }
  }

  return (
    <>
      {forms.map((singleForm, index) => {
        return (
          <Grid item xs={12} className={classes.formContainer}>
            <Grid item xs="auto" sx={{marginRight: "5px" }}>
              {index + 1}.
            </Grid>
            <Grid item xs={6} sx={{marginRight: "5px" }}>
              <TextField
                value={singleForm.fieldName}
                inputProps={{
                  style: { height: '3px' }
                }}
                sx={{
                  marginRight: '10px'
                }}
                onChange={(event) => handleFieldChange(singleForm, event.target.value, "fieldName")}
              />
              <Select
                value={singleForm.fieldTypeDropdown}
                onChange={(event) => handleFieldChange(singleForm, event.target.value, "fieldTypeDropdown")}
                className={classes.dropDown}
              >
                <MenuItem value="string">String</MenuItem>
                <MenuItem value="int">Int</MenuItem>
                <MenuItem value="object">Object</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6} className={ classes.icons}>
              <IconButton
                onClick={(event) => generateChild(singleForm)}
              >
                <AddIcon />
              </IconButton>
              <IconButton onClick={(event) => deleteParent(singleForm)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
            {singleForm.child && singleForm.child.length > 0 && (
              <Grid item xs={12} sx={{ marginLeft: `${singleForm.parentId ? "30" : "0"}px` }}>
                <Form
                  forms={singleForm.child}
                  handleFieldChange={handleFieldChange}
                  generateChild={generateChild}
                  deleteParent={deleteParent}
                  parentId={singleForm.fieldId}
                />
              </Grid>
            )}

          </Grid>
        )
      })}
    </>
  )
}


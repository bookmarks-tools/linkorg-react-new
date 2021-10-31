import React, { useEffect, useState } from 'react';

import { TextField } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

import { httpClient } from '../../app/httpClient';
import { selectTags, setTags } from './tagSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const filter = createFilterOptions();

// type TagSelectProps = {
//   onTagsChange: (tags: TagType[]) => void
//   selected: TagType[]
// }

export const TagSelect = ({ onTagsChange, selected }) => {
  const [selectedValue, setSelectedValue] = useState([]);
  const availableTags = useAppSelector(selectTags);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selected.length) {
      setSelectedValue(selected);
    } else {
      setSelectedValue([]);
    }
  }, [selected]);

  const handleTagCreate = (tagName) => {
    httpClient
      .post('/tag', {
        name: tagName,
      })
      .then(({ data }) => {
        const newSelectedTags = [...selectedValue, data];
        setSelectedValue(newSelectedTags);
        onTagsChange(newSelectedTags);
        dispatch(setTags([...availableTags, data]));
      });
  };

  return (
    <Autocomplete
      value={selectedValue}
      onChange={(event, newValue) => {
        const newOption = newValue.find((opt) => opt.inputValue);
        if (newOption) {
          handleTagCreate(newOption.inputValue);
        } else {
          setSelectedValue(newValue);
          onTagsChange(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.name);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            name: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      multiple
      size="small"
      options={availableTags}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.defaultMuiPrevented = true;
          handleTagCreate(event.target.value);
        }
      }}
      getOptionLabel={(option) => {
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name;
      }}
      renderOption={(props, option) => <li {...props}>{option.name}</li>}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => <TextField {...params} label="Select tag" />}
    />
  );
};

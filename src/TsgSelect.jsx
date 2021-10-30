import { useEffect, useState } from 'react';

import { TextField } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

import { httpClient } from './httpClient';

const filter = createFilterOptions();

export const TagSelect = ({ onTagsChange }) => {
  const [selectedValue, setSelectedValue] = useState([]);

  const [tags, setTags] = useState([]);

  useEffect(() => {
    httpClient.get('/tag').then(({ data }) => {
      setTags(data);
    });
  }, []);

  const handleTagCreate = (tagName) => {
    httpClient
      .post('/tag', {
        name: tagName,
      })
      .then(({ data }) => {
        setSelectedValue([...selectedValue, data]);
        setTags([...tags, data]);
      });
  };

  useEffect(() => {
    onTagsChange(selectedValue);
  }, [selectedValue]);

  return (
    <Autocomplete
      value={selectedValue}
      onChange={(event, newValue) => {
        const newOption = newValue.find((opt) => opt.inputValue);
        if (newOption) {
          handleTagCreate(newOption.inputValue);
        } else {
          setSelectedValue(newValue);
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
      id="free-solo-with-text-demo"
      options={tags}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          // Prevent's default 'Enter' behavior.
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

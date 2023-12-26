/* eslint-disable react/prop-types */
import React from 'react';
import TextField from "@mui/material/TextField";

const SearchByName = ({ value, onChange }) => {
    return (
        <TextField
            label="Search by name"
            value={value}
            onChange={onChange}
            margin="normal"
            fullWidth
        />
    );
};

export default SearchByName;

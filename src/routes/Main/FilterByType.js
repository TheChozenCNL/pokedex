/* eslint-disable react/prop-types */
import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const FiltertByType = ({ value, onChange, options }) => {
    return (
        <FormControl fullWidth>
            <InputLabel id='type-select-label'>Filter by type</InputLabel>
            <Select
                labelId='type-select-label'
                id='type-select'
                value={value}
                label='Filter by type'
                onChange={onChange}
            >
                <MenuItem value=''>All</MenuItem>
                {options.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default FiltertByType;

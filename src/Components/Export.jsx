import React from 'react'

import { Checkbox } from 'monday-ui-react-core';

const Export = () => {
    return (
        <div>
            <h1>Export to PDF</h1>
            <Checkbox
                defaultChecked
                label="Include Updates"
            />
            <Checkbox
                defaultChecked
                label="Include SubItems"
            />
            <Checkbox
                defaultChecked
                label="Send a copy to my email"
            />

            <button>Export</button>
        </div>
    )
}

export default Export

import React from 'react'

import { Checkbox } from 'monday-ui-react-core';
import "monday-ui-react-core/tokens";
import { Text } from 'monday-ui-react-core';

const Export = () => {
    return (
        <div className='flex flex-col items-start justify-between h-[50%] w-[50%]'>
            <h1 className='font-bold text-4xl text-white'>Export to PDF</h1>
            <div>
                <Checkbox
                    labelClassName='text-color-on-inverted'
                    label={<Text color='onPrimary'>Include Updates</Text>}
                />
                <Checkbox
                    labelClassName='text-color-on-inverted'
                    label={<Text color='onPrimary'>Include SubItems</Text>}
                />
                <Checkbox
                    labelClassName='text-color-on-inverted'
                    label={<Text color='onPrimary'>Send a copy to my email</Text>}
                />
            </div>

            <button className='bg-blue-500 px-4 py-2 rounded-lg hover:text-blue-500 hover:bg-transparent border-2 border-blue-500 box-border'>Export</button>
        </div>
    )
}

export default Export

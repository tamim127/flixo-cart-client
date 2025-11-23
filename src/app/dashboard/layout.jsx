import React from 'react';

const layout = ({children}) => {
    return (
        <div>
            <h1>hello</h1>
            <div>
            {children}
            </div>
            <h1>Hi</h1>
        </div>
    );
};

export default layout;
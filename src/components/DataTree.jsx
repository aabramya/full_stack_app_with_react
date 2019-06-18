/**
 * Component allowing to preview objects with nested elements
 */
import React from 'react';
import PropTypes from 'prop-types';

const DataTree = ({ data }) => {
    if (typeof (data) == 'object') {
        return (
            <ul>
                {
                    Object.keys(data).map((key, i) =>
                        <li key={i} ><b>{key}</b>: <DataTree data={data[key]}/></li>
                    )
                }
            </ul>
        )
    } else {
        return (
            <span dangerouslySetInnerHTML={{ __html: data }} />
        )
    }
};

DataTree.propTypes = {
    data: PropTypes.any.isRequired
};

export default DataTree;
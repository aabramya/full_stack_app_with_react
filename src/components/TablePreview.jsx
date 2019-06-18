/**
 * Component previewing 1 level nested object as a HTML table
 */
import React from 'react';
import PropTypes from 'prop-types';
import DataTree from './DataTree';
const TablePreview = ({ title = '', data }) => {
    if (Object.keys(data).length > 0) {
        return (
            <table>
                <thead><tr><th colSpan="2">{title}</th></tr></thead>
                <tbody>
                    {
                        Object.keys(data).map((key, i) =>
                            <tr key={i}>
                                <th>{key}</th>
                                <td>
                                    <DataTree data={data[key]} />
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        )
    } else {
        return null;
    }
}

TablePreview.propTypes = {
    data: PropTypes.object.isRequired
};

export default TablePreview;

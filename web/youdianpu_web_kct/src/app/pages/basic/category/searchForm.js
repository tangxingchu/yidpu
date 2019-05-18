import React, { PureComponent, Fragment, Component } from 'react';

import { Form } from 'antd';

class SearchFrom extends PureComponent {

    render() {
        return (
            <Form>
                
            </Form>
        );
    }

}

export default Form.create({
    onFieldsChange(props, changedFields) {
        props.fieldChangeValue(changedFields);
    },
    mapPropsToFields(props) {
        return {
            name: Form.createFormField({
                value: props.name.value,
            }),
        }
    }
})(SearchFrom);
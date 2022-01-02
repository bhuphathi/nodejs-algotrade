import CheckboxGroup from "./FormElement/CheckboxGroup"

const FormComponent = props => {
    const {control, ...rest} = props
    switch (control) {
        case 'input':
            return <Input {...rest} />
        case 'textarea':
            return <Textarea {...rest} />
        case 'select':
            return <Select {...rest} />
        case 'radio':
            return <RadioButtons {...rest} />
        case 'checkbox':
            return <CheckboxGroup {...rest} />
        case 'date':
            return <DatePicker {...rest} />
        default:
            return null
    }
}

export default FormComponent

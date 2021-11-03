import { Field } from 'react-final-form'
import { OnChange } from 'react-final-form-listeners'

interface Props {
    field: string;
    becomes?: any;
    set: any;
    to: any;
}

const WhenFieldChanges = ({
    becomes = null,
    field,
    set,
    to
}: Props) => (
    <Field name={set} subscription={{}}>
        {(
            { input: { onChange } }
        ) => (
            <OnChange name={field}>
                {value => {
                    if(becomes === null) {
                        return onChange(to)
                    }
                    if (value === becomes) {
                        onChange(to)
                    }
                }}
            </OnChange>
        )}
    </Field>
)

export default WhenFieldChanges;
import {Block, Notification} from "react-bulma-components";

function WarningAlert(props: {
    message: string;
}) {
    return <Block>
        <Notification color={'danger'}>
            {
                props.message
            }
        </Notification>
    </Block>
}

export {WarningAlert}

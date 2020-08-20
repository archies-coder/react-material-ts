import React, {FunctionComponent} from 'react';
import {SvgIcon} from "@material-ui/core";
import { ReactComponent as UserIcon } from "./user.svg";

interface OwnProps {
    className: string;
}

type Props = OwnProps;

const OrganizationIcon: FunctionComponent<Props> = (props) => {

    return (
        <SvgIcon {...props} component={UserIcon} viewBox="-5 -5 100 100">
        </SvgIcon>
    )
};

export default OrganizationIcon;

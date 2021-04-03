import { Checkbox } from "@material-ui/core"
import React, { ChangeEvent } from "react"
import { Notification } from "./NotificationSlice"

interface IHeadConfigObj {
    key: string,
    label: string,
    breakPoint: boolean | 1 | 2 | "auto" | 5 | 4 | 3 | 8 | 6 | 7 | 9 | 10 | 11 | 12,
    render?: (value: Notification, onChangeHandle: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void, name: any) => JSX.Element
}

// interface IHeadConfigObj {
//     key: string
//     label: string
//     breakPoint: Number
// }
const chechBoxRenderer = (value: Notification, onChangeHandle: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void, name: any) => {
    // debugger
    const key = name.split('-')

    return <Checkbox checked={key[1] === "email" ? value.email : value.sms} onChange={onChangeHandle} name={name} />
}

export const headConfig: IHeadConfigObj[] = [{
    key: 'event',
    label: 'Event',
    breakPoint: 8
}, {
    key: 'email',
    label: 'Email',
    breakPoint: 2,
    render: chechBoxRenderer

}, {
    key: 'sms',
    label: 'SMS',
    breakPoint: 2,
    render: chechBoxRenderer
}]

export const dataConfig = [{
    event: 'New Invite',
    email: true,
    sms: false
}, {
    event: 'Host receive message when invitee reaches campus',
    email: false,
    sms: false
}, {
    event: 'Host receive message when invitee leaves campus',
    email: false,
    sms: false
}, {
    event: 'Invitee receives feedback',
    email: false,
    sms: false
}, {
    event: 'New role assigned',
    email: false,
    sms: false
}, {
    event: 'New user created',
    email: false,
    sms: false
}, {
    event: 'New Employee created',
    email: false,
    sms: false
}]
import React from 'react'
import { CustomAutoComplete } from 'components/CustomAutoComplete';
export const config = [{
    name: 'Mobile Number',
    id: 'mobile',
    section: 'VI',
    seq: 3
}, {
    name: 'Visitor Name',
    id: 'name',
    section: 'VI',
    seq: 1
}, {
    name: 'Gender',
    id: 'gender',
    section: 'VI',
    seq: 2
}, {
    name: 'Photo',
    id: 'profilepic',
    section: '',
    seq: 1
}, {
    name: 'Email',
    id: 'email',
    section: 'VI',
    seq: 4
}, {
    name: 'Address/Locality/City',
    isChecked: false,
    id: 'city',
    section: 'VI',
    seq: 9
}, {
    name: 'Country/Nationality',
    id: 'country',
    section: 'VI',
    seq: 10
}, {
    name: 'Visitor\'s Company',
    id: 'company',
    section: 'VI',
    seq: 8
}, {
    name: 'Scan Id',
    id: 'scan',
    section: '',
    seq: 0
}, {
    name: 'No. Of visitors',
    id: 'noofvisitor',
    section: 'VI',
    seq: 7
}, {
    name: 'Vehicle Number',
    id: 'vehicle',
    section: '',
    seq: 0
}, {
    name: 'Choose Your Belongings',
    id: 'belongings',
    section: '',
    seq: 0
}, {
    name: 'Host/Organizations',
    id: 'organisation',
    section: 'AR',
    seq: 2
}, {
    name: 'Person to visit',
    id: 'tomeet',
    section: 'AR',
    seq: 1
}, {
    name: 'Purpose of visit',
    id: 'purpose',
    section: 'VI',
    seq: 6,
    component: ({ purpose, style }: any) => <CustomAutoComplete
        style={style}
        required
        options={purpose.options}
        label="Purpose to visit"
        name="purpose"
        onChange={(value: any) => purpose.onChange({
            purpose: value
        })}
        value={purpose.value} />
}, {
    name: 'Expected Time Out',
    id: 'expectedtimeout',
    section: '',
    seq: 0
}, {
    name: 'Remark',
    id: 'remark',
    section: '',
    seq: 0
}, {
    name: 'Visitor Agreement',
    id: 'agreement',
    section: '',
    seq: 0
}, {
    name: 'Agreement signature',
    id: 'signature',
    section: '',
    seq: 0
},
{
    name: 'Visitor Type',
    section: 'VI',
    seq: 5,
    id: 'usertype'
},
{
    name: 'Site',
    section: 'AR',
    seq: 3,
    id: 'site',
    component: ({ site, style }: any) => <CustomAutoComplete
        style={style}
        required
        options={site.options}
        label="Site"
        name="site"
        onChange={(value: any) => site.onChange({
            site: value
        })}
        value={site.value} />
}]
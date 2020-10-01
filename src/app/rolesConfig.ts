
export const roles = {

    admin:{
        Home:true,
        Invites:true,
        Contractor:false,
        Employees:true,
        Master:true,
        Reports:true,
        'User Management':true,
        Settings:true
    },
    hr:{
        Home:false,
        Invites:true,
        Contractor:false,
        Employees:true,
        Master:false,
        Reports:true,
        'User Management':false,
        Settings:false
    },
    reception:{
        Home:true,
        Invites:true,
        Contractor: true,
        Employees:true,
        Master:false,
        Reports:true,
        'User Management':false,
        Settings:false
    }
}
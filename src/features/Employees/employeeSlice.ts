import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Links } from 'parse-link-header'

import { createEmployee, getEmployeesData } from 'api/Apis'
import { AppThunk } from 'app/store'
import { getBackdropStart, getBackdropStop } from 'app/BackdropSlice'

export interface Employee {
    createdOn: any,//2020-09-30 13: 14: 38,
    designation: any,//developer,
    email: any,//arjunp@gmail.com,
    empid: any,//002,
    fname: any,//arjun,
    lname: any,//pan,
    mname: any,//test,
    mobile: any,//1any,//2345678,
    profilepicpath: any,//uploads/images/arj_pic_1601471678_arjun_pass.JPG,
    updatedOn: any,//2020-09-30 13: 14: 38
    name:any
}
export interface EmployeesResult {
    //pageLinks: Links | null
    pageCount: number
    employees: Employee[]
}

export interface EmployeeInputState {
    fname: string,
    mname: string,
    lname: string,
    mobile: string,
    email: string,
    empid: string,
    designation: string,
}

export const defaultInputState: EmployeeInputState = {
    fname: '',
    mname: '',
    lname: '',
    mobile: '',
    email: '',
    empid: '',
    designation: '',
}
interface EmployeeState {
    employees: Employee[]
    employeesById: Record<string, Employee>
    currentPageEmployees: number[]
    pageCount: number
    pageLinks: Links | null
    isLoading: boolean
    error: string | null
    currentEmployee: EmployeeInputState
}

const employeesInitialState: EmployeeState = {
    employees: [],
    employeesById: {},
    currentPageEmployees: [],
    pageCount: 0,
    pageLinks: {},
    isLoading: false,
    error: null,
    currentEmployee: defaultInputState
}

function startLoading(state: EmployeeState) {
    state.isLoading = true
}

function loadingFailed(state: EmployeeState, action: PayloadAction<string>) {
    state.isLoading = false
    state.error = action.payload
}

const employees = createSlice({
    name: 'employees',
    initialState: employeesInitialState,
    reducers: {

        getEmployeesStart: startLoading,
        getEmployeesSuccess(state, { payload }: PayloadAction<EmployeesResult>) {
            const { pageCount, employees } = payload
            state.pageCount = pageCount
            state.isLoading = false
            state.error = null
            state.employees = employees.map(e=>({...e,name:e.fname+' '+e.mname+' '+e.lname}))
            // @ts-ignore
            state.employees.map(employee => (state.employeesById[employee.empid]=employee))
        },
        getEmployeesFailure: loadingFailed,
        setCurrentEmployee(state, { payload }: PayloadAction<any>) {
            state.currentEmployee = payload
        }
    }
})

export const {
    getEmployeesStart,
    getEmployeesSuccess,
    getEmployeesFailure,
    setCurrentEmployee
} = employees.actions

export default employees.reducer

export const fetchEmployees = (
    page?: number
    , count?: number
): AppThunk => async dispatch => {
    try {
        dispatch(getEmployeesStart())
        const employees = await getEmployeesData(page,count)

        dispatch(getEmployeesSuccess(employees))
    } catch (err) {
        dispatch(getEmployeesFailure(err.toString()))
    }
}

export const saveEmployee = (
    employeeFormData: any,
    callback?: (() => void)
): AppThunk => async dispatch => {
    try {
        dispatch(getBackdropStart())
        await createEmployee(employeeFormData)
            .then(() => dispatch(getBackdropStop())).catch(() => dispatch(getBackdropStop()))
        //return setInputState(defaultInputState)
        callback && callback();
        //dispatch(saveInvitesSuccess(invites))
    } catch (err) {
        dispatch(getBackdropStop())
    }
}


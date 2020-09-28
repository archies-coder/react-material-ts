import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Links } from 'parse-link-header'

import { getEmployeesData } from 'api/Apis'
import { AppThunk } from 'app/store'


export interface Employee {
    email: any //"admin@gmail.com",
    intime: any //"2020-09-14 20:28:34",
    employee_id: any //"arj1600095514",
    mobileno: any //"123456789",
    name: any //"arjunp",
    purpose: any //"tomeet",
    scheduletime: any //"2020-09-12 15:00"
    tomeet: any //"arjun2"
}
export interface EmployeesResult {
    //pageLinks: Links | null
    pageCount: number
    employees: Employee[]
}

interface EmployeeState {
    employees: Employee[]
    employeesById: Record<string, Employee>
    currentPageEmployees: number[]
    pageCount: number
    pageLinks: Links | null
    isLoading: boolean
    error: string | null
}

const employeesInitialState: EmployeeState = {
    employees: [],
    employeesById: {},
    currentPageEmployees: [],
    pageCount: 0,
    pageLinks: {},
    isLoading: false,
    error: null
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
            state.employees = employees
            // @ts-ignore
            state.employees.map(employee => (state.employeesById[employee.employee_id]=employee))
        },
        getEmployeesFailure: loadingFailed,
    }
})

export const {
    getEmployeesStart,
    getEmployeesSuccess,
    getEmployeesFailure
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


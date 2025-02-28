import { createSlice, current } from '@reduxjs/toolkit'

const initialState  = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationChange(state, action) {
      return action.payload
    }
  }
})


export const setNotification = (message, timeout) => {
  return async dispatch => {
    await dispatch(notificationChange(message))
    setTimeout(() => dispatch(notificationChange('')), timeout)
  }
}

export const { notificationChange } = notificationSlice.actions
export default notificationSlice.reducer
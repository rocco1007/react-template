import { SYNC_CLICK, ASYNC_CLICK } from '../constants/actionTypes'

const initialState = {}

export default function (state = initialState, action) {
  switch (action.type) {
    case SYNC_CLICK:
      return action.payload
    case ASYNC_CLICK:
      return action.payload
    default:
      return state
  }
}

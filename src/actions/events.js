import request from 'superagent'
export const EVENTS_FETCHED = 'EVENTS_FETCHED'
export const EVENT_CREATE_SUCCESS = 'EVENT_CREATE_SUCCESS'
export const EVENT_FETCHED = 'EVENT_FETCHED'
export const EVENT_DELETE_SUCCESS = 'EVENT_DELETE_SUCCESS'
export const EVENT_UPDATED = 'EVENT_UPDATED'

const baseUrl = 'http://localhost:4000'

const eventsFetched = events => ({
  type: EVENTS_FETCHED,
  events
})

export const loadEvents = () => (dispatch, getState) => {
  if (getState().events) return
  request(`${baseUrl}/events`)
    .then(response => {
      dispatch(eventsFetched(response.body))
    })
    .catch(console.error)
}

const eventCreateSuccess = event => ({
  type: EVENT_CREATE_SUCCESS,
  event
})

export const createEvent = (data) => dispatch => {
  request
    .post(`${baseUrl}/events`)
    .send(data)
    .then(response => {
      dispatch(eventCreateSuccess(response.body))
    })
    .catch(console.error)
}

const eventFetched = event => ({
  type: EVENT_FETCHED,
  event
})

export const loadEvent = (id) => dispatch => {
  request(`${baseUrl}/events/${id}`)
    .then(response => {
      dispatch(eventFetched(response.body))
    })
    .catch(console.error)
}
const eventDeleteSuccess = id => ({
  type: EVENT_DELETE_SUCCESS,
  id
})

export const deleteEvent = (id) => dispatch => {
  request
    .delete(`${baseUrl}/events/${id}`)
    .then(response => {
      dispatch(eventDeleteSuccess(id))
    })
    .catch(console.error)
}

const eventUpdated = event => ({
  type: EVENT_UPDATED,
  event
})

export const updateEvent = (id, data) => dispatch => {
  const url = `${baseUrl}/events/${id}`

  request
    .patch(url)
    .send(data)
    .then(response => {
      const action = eventUpdated(response.body)
      dispatch(action)
    })
    .catch(console.error)
}

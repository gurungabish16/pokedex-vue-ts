export interface BaseApiResponse<T> {
  count: number
  next: string
  previous: string
  results: Array<T>
}

export interface BaseApiError {
  errorMsg: string
}

export interface BaseQueryParam {
  limit: number
  offset: number
}

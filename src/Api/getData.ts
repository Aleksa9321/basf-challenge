import { mockResponse } from "../Mock/response.mock"
import { ResponseData } from "../Types/types"

export const getData: () => ResponseData = () => {
  return mockResponse
}

// response data

export interface Author {
  name: string
  picture: string
}

export interface Comment {
  id: string
  parent_id?: string
  author: Author
  text: string
  timestamp: number
}

export interface Data {
  comments: Comment[]
}

export interface ResponseData {
  data: Data
}

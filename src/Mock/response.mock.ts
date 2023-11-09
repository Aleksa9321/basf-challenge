import { ResponseData } from "../Types/types"

export const mockResponse: ResponseData = {
  data: {
    comments: [
      {
        id: "1",
        author: {
          name: "Ivan Martic",
          picture: "img/ivan.jpg",
        },
        text: "Hello guys! How's everyone doing?",
        timestamp: 1607862300000,
      },
      {
        id: "2",
        author: {
          name: "Stjepan Liovic",
          picture: "img/stjepan.jpg",
        },
        text: "i would suggest having a a look at this new tool! https://www.unitconverters.net/length/miles-to-km.htm",
        timestamp: 1607871660000,
      },
      {
        id: "3",
        parent_id: "2",
        author: {
          name: "Martin Durkovic",
          picture: "img/martin.jpg",
        },
        text: "Thanks! Will have a look.",
        timestamp: 1607872200000,
      },
    ],
  },
}

export const emptyMockResponse: ResponseData = {
  data: {
    comments: [
      {
        id: "",
        author: {
          name: "",
          picture: "",
        },
        text: "",
        timestamp: 0,
      },
    ],
  },
}

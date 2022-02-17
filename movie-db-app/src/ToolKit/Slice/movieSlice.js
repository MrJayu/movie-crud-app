import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  movieList: [],
}

export const movieSlice = createSlice({
  name: 'movieList',
  initialState,
  reducers: {
    getMovieList: (state) => {
      return state.movieList
    },

    storeMovieList: (state, action) => {
      let data = []
      for (let index = 0; index < action.payload.length; index++) {
        const element = action.payload[index];
        element.isFavorite = false
        data.push(element)
      }
      state.movieList = [...state.movieList, ...data]
    },

    changeFavorite: (state, action) => {
      let data = []
      for (let index = 0; index < state.movieList.length; index++) {
        const element = state.movieList[index];
        if (index === action.payload) {
          element.isFavorite = !element.isFavorite
        }
        data.push(element)
      }
      state.movieList = [...data]
    },

    updateMovieList: (state, action) => {
      state.movieList = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { getMovieList, storeMovieList, updateMovieList,changeFavorite } = movieSlice.actions

export default movieSlice.reducer
const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
  name: "user",
  initialState: false,
  reducers: {
    changeUserState: (state, action) => {
      return action.payload;
    },
  },
});
export const { changeUserState } = userSlice.actions;
export default userSlice.reducer;

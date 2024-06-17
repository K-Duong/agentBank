import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.append('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["api"], 

  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/user/login",
        method: "POST",
        body: { email, password },
      }),
    }),

    getUserProfile: builder.mutation({
      query: () => ({
        url: '/user/profile',
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useGetUserProfileMutation } = apiSlice;

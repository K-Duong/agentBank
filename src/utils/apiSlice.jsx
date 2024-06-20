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
      query: (payload) => ({
        url: "/user/login",
        method: "POST",
        body: { email: payload.email, password: payload.password },
      }),
    }),

    getUserProfile: builder.mutation({
      query: () => ({
        url: '/user/profile',
        method: 'POST',
      }),
    }),

    updateUserProfile: builder.mutation({
      query: (fullName) => ({
        url: '/user/profile',
        method: 'PUT',
        body :{
          firstName : fullName.firstName, 
          lastName:fullName.lastName
        }

      })
    })
  }),
});

export const { useLoginMutation, useGetUserProfileMutation, useUpdateUserProfileMutation } = apiSlice;

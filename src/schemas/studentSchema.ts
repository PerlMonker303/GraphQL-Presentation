import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} from "graphql";
import { GroupType } from "./groupSchema";
import {
  deleteStudentAPI,
  getGroupAPI,
  getStudentAPI,
  getStudentsAPI,
  postStudentAPI,
  updateStudentAPI,
} from "../api";
import { StudentModel } from "../models/Student";

export type StudentType = {
  id: { type: typeof GraphQLInt };
  firstName: { type: typeof GraphQLString };
  lastName: { type: typeof GraphQLString };
  email: { type: typeof GraphQLString };
  groupId: { type: typeof GraphQLInt };
  phoneNumber: { type: typeof GraphQLString };
  group?: { type: typeof GroupType; resolve: (student: StudentModel) => {} };
};

// define types
export const StudentType = new GraphQLObjectType({
  name: "Student",
  description: "A Student Type",
  fields: (): StudentType => ({
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    groupId: { type: GraphQLInt },
    phoneNumber: { type: GraphQLString },
    group: {
      type: GroupType,
      resolve: (student) => {
        return getGroupAPI(student.groupId);
      },
    },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    student: {
      type: StudentType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parentValue, args) => {
        return getStudentAPI(args.id);
      },
    },
    students: {
      type: new GraphQLList(StudentType),
      resolve: () => {
        return getStudentsAPI();
      },
    },
  },
});

// mutations - form modifying the data
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addStudent: {
      type: StudentType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        groupId: { type: new GraphQLNonNull(GraphQLInt) },
        phoneNumber: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (parentValue, args) => {
        return postStudentAPI(
          args.firstName,
          args.lastName,
          args.email,
          args.groupId,
          args.phoneNumber
        );
      },
    },
    deleteStudent: {
      type: StudentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parentValue, args) => {
        return deleteStudentAPI(args.id);
      },
    },
    updateStudent: {
      type: StudentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        groupId: { type: GraphQLInt },
        phoneNumber: { type: GraphQLString },
      },
      resolve: (parentValue, args) => {
        return updateStudentAPI(args.id, args);
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation,
});

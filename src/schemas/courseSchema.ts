import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} from "graphql";
import {
  deleteCourseAPI,
  getCourseAPI,
  getCoursesAPI,
  postCourseAPI,
  updateCourseAPI,
} from "../api";

export type CourseType = {
  id: { type: typeof GraphQLInt };
  name: { type: typeof GraphQLString };
  lecturer: { type: typeof GraphQLString };
  credits: { type: typeof GraphQLInt };
};

// define types
export const CourseType = new GraphQLObjectType({
  name: "Course",
  fields: (): CourseType => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    lecturer: { type: GraphQLString },
    credits: { type: GraphQLInt },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "A Course Type",
  fields: {
    course: {
      type: CourseType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parentValue, args) => {
        return getCourseAPI(args.id);
      },
    },
    courses: {
      type: new GraphQLList(CourseType),
      resolve: () => {
        return getCoursesAPI();
      },
    },
  },
});

// mutations - form modifying the data
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addCourse: {
      type: CourseType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        lecturer: { type: new GraphQLNonNull(GraphQLString) },
        credits: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parentValue, args) => {
        return postCourseAPI(args.name, args.lecturer, args.credits);
      },
    },
    deleteCourse: {
      type: CourseType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parentValue, args) => {
        return deleteCourseAPI(args.id);
      },
    },
    updateCourse: {
      type: CourseType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
        lecturer: { type: GraphQLString },
        credits: { type: GraphQLInt },
      },
      resolve: (parentValue, args) => {
        return updateCourseAPI(args.id, args);
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation,
});

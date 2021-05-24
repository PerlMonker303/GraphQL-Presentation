import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
} from "graphql";
import {
  getCourseAPI,
  getCoursesAPI,
  getGroupAPI,
  getGroupsAPI,
  getStudentAPI,
} from "../api";
import { GroupModel } from "../models/Group";
import { CourseType } from "./courseSchema";

export type GroupType = {
  id: { type: typeof GraphQLInt };
  year: { type: typeof GraphQLInt };
  leaderId: { type: typeof GraphQLInt };
  noStudents: { type: typeof GraphQLInt };
  courseIds: { type: any };
  courses?: {
    type: any;
    args: any;
    resolve: (
      group: GroupModel,
      args: {
        first: { type: typeof GraphQLInt };
      }
    ) => {};
  };
  leader?: { type: any; resolve: any };
};

// define types
export const GroupType = new GraphQLObjectType({
  name: "Group",
  description: "A Group Type",
  fields: (): GroupType => ({
    id: { type: GraphQLInt },
    year: { type: GraphQLInt },
    leaderId: { type: GraphQLInt },
    noStudents: { type: GraphQLInt },
    courseIds: { type: GraphQLList(GraphQLInt) },
    courses: {
      type: GraphQLList(CourseType),
      args: {
        first: { type: GraphQLInt },
      },
      resolve: (group, args) => {
        return getCoursesAPI().then((res) => {
          const result = res.filter(
            (course) =>
              group.courseIds.find((id) => id === course.id) !== undefined
          );

          if (args.first) {
            return result.slice(0, args.first);
          }
          return result;
        });
      },
    },
    leader: {
      type: new GraphQLObjectType({
        name: "GroupLeader",
        fields: () => ({
          id: { type: GraphQLInt },
          firstName: { type: GraphQLString },
          lastName: { type: GraphQLString },
          email: { type: GraphQLString },
          groupId: { type: GraphQLInt },
          phoneNumber: { type: GraphQLString },
        }),
      }),
      resolve: (group) => getStudentAPI(group.leaderId),
    },
    // Read:
    // https://stackoverflow.com/questions/53863934/is-graphql-schema-circular-reference-an-anti-pattern
    // https://docs.github.com/en/graphql/overview/resource-limitations
    // leader: {
    //   type: StudentType,
    // },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    group: {
      type: GroupType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parentValue, args) => {
        return getGroupAPI(args.id);
      },
    },
    groups: {
      type: new GraphQLList(GroupType),
      resolve: () => {
        return getGroupsAPI();
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});

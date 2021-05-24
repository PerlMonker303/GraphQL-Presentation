import express from "express";
import { graphqlHTTP } from "express-graphql";
import studentSchema from "./schemas/studentSchema";
import courseSchema from "./schemas/courseSchema";
import groupSchema from "./schemas/groupSchema";
import depthLimit from "graphql-depth-limit";

import { stitchSchemas } from "@graphql-tools/stitch";

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: stitchSchemas({
      subschemas: [studentSchema, courseSchema, groupSchema],
    }),
    graphiql: true,
    validationRules: [depthLimit(10)],
  })
);

app.listen(4000, () => {
  console.log("The server is running on http://localhost:4000/graphql");
});

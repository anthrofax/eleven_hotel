import { createClient } from "next-sanity";

const sanityClient = createClient({
  projectId: "5x9vlanc",
  dataset: "production",
  useCdn: true,
  token: "skYGTck9wUnuFTOcsJN2IHFUL8YsgLVwXA0gjYIkdQXOQ9HZIYPXi0WVUr4AzW9vA6v8Rc06vMxDlHElv7BJyOl3ABC150hCnA7CUCA5XmnIEzbXApMRloNXD6Ga6a3EcxV3FDMj9B3YvDWH8j9z6aJ76LC2FBwH48pczA8LyO7RfKJToyKn",
  apiVersion: "2021-10-21",
});

export default sanityClient;

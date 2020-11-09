import mongoose from "mongoose";

const SearchResultSchema = new mongoose.Schema(
  {
    searchresult: [Object],
    filterID: {
      type: mongoose.Schema.ObjectId,
      ref: "SearchFilter",
      required: true,
    },
  },
  {
    // virtuals true => it displays virtual schema
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default mongoose.model("SearchResult", SearchResultSchema);

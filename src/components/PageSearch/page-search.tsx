"use client";

import { useState } from "react";
import Search from "../Search/search";

function PageSearch() {
  const [roomType, setRoomType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Search
      roomType={roomType}
      searchQuery={searchQuery}
      setRoomType={setRoomType}
      setSearchQuery={setSearchQuery}
    />
  );
}

export default PageSearch;

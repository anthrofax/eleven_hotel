import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";

type SearchComponent = {
  roomType: string;
  searchQuery: string;
  setRoomType(value: string): void;
  setSearchQuery(value: string): void;
};

function Search({
  roomType,
  searchQuery,
  setRoomType,
  setSearchQuery,
}: SearchComponent) {
  const router = useRouter();

  function handleRoomTypeChange(e: ChangeEvent<HTMLSelectElement>) {
    setRoomType(e.target.value);
  }

  function handleSearchQueryChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  function handleFilterClick() {
    router.push(`/rooms?roomType=${roomType}&searchQuery=${searchQuery}`);
  }

  return (
    <section className="bg-tertiary-light px-4 py-6 rounded-lg">
      <div className="container mx-auto flex gap-4 flex-wrap justify-between items-center">
        <div className="w-full md:1/3 lg:w-auto mb-4 md:mb-0">
          <label
            htmlFor=""
            className="block text-sm font-medium mb-2 text-black"
          >
            Room Type
          </label>

          <div className="relative">
            <select
              name=""
              id=""
              className="w-full px-4 py-2 capitalize rounded leading-tight dark:bg-black focus:outline-none"
              onChange={handleRoomTypeChange}
              value={roomType}
            >
              <option value="All">All</option>
              <option value="Basic">Basic</option>
              <option value="Luxury">Luxury</option>
              <option value="Suite">Suite</option>
            </select>
          </div>
        </div>

        <div className="w-full md:1/3 lg:w-auto mb-4 md:mb-0">
          <label
            htmlFor=""
            className="block text-sm font-medium mb-2 text-black"
          >
            Search
          </label>

          <input
            type="search"
            id="search"
            placeholder="Search..."
            className="w-full px-4 py-3 rounded leading-tight dark:bg-black focus-outline-none placeholder:text-black dark:placeholder:text-white"
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
        </div>

        <button
          className="btn-tertiary"
          type="button"
          onClick={handleFilterClick}
        >
          Search
        </button>
      </div>
    </section>
  );
}

export default Search;

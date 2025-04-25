import { useEffect, useState } from "react";
import { ItemCard } from "../components/ItemCard";
import { getPosts } from "../../api";
import Navbar from '../components/Navbar';
import LostItemModal from "../components/FoundItemModal"

export default function FoundItems() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getPosts();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const filteredItems =
  searchTerm.trim() === ""
    ? items
    : items.filter((item) =>
        `${item?.Name?.toLowerCase()} ${item?.Location?.toLowerCase()}`.includes(
          searchTerm.toLowerCase()
        )
      );


  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4">
      <Navbar />
      <div className="max-w-6xl mt-14 mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
          Found Items
        </h1>

        <div className="mb-10 flex justify-center">
          <input
            type="text"
            placeholder="Search by name or location..."
            className="w-full max-w-md px-4 py-2 rounded-lg bg-zinc-800 text-white placeholder-zinc-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => <ItemCard key={item._id} item={item} onClick={() => setSelectedItem(item)} />)
          ) : (
            <p className="text-center col-span-full text-zinc-400">
              No items match your search.
            </p>
          )}
        </div>
      </div>

      {selectedItem && (
        <LostItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}

    </div>
  );
}

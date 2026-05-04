{
  /* ================= STATS ================= */
}
<div className="px-6 md:px-20 py-14 grid md:grid-cols-4 gap-6">
  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
    <h2 className="text-3xl font-bold text-blue-400">{books.length}</h2>
    <p className="text-gray-400 mt-2">Total Books</p>
  </div>

  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
    <h2 className="text-3xl font-bold text-purple-400">
      {books.filter((b) => b.category === "magazine").length}
    </h2>
    <p className="text-gray-400 mt-2">Magazines</p>
  </div>

  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
    <h2 className="text-3xl font-bold text-green-400">
      {books.filter((b) => b.category === "journal").length}
    </h2>
    <p className="text-gray-400 mt-2">Journals</p>
  </div>

  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
    <h2 className="text-3xl font-bold text-yellow-400">24/7</h2>
    <p className="text-gray-400 mt-2">Access Available</p>
  </div>
</div>;

import React, { useEffect, useRef } from "react";

function Slider({ title, items }) {
  const scrollRef = useRef();

  // AUTO SCROLL
  useEffect(() => {
    const slider = scrollRef.current;

    let scrollAmount = 0;

    const slide = setInterval(() => {
      if (!slider) return;

      slider.scrollLeft += 1;
      scrollAmount += 1;

      // LOOP BACK
      if (scrollAmount >= slider.scrollWidth / 2) {
        slider.scrollLeft = 0;
        scrollAmount = 0;
      }
    }, 20);

    return () => clearInterval(slide);
  }, []);

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4 text-blue-400">{title}</h2>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide"
      >
        {[...items, ...items].map((item, index) => (
          <div
            key={index}
            className="min-w-[200px] bg-white/5 rounded-xl p-3 hover:scale-105 transition"
          >
            {/* IMAGE */}
            <img
              src={
                item.image
                  ? `http://127.0.0.1:5000/uploads/${item.image}`
                  : "https://via.placeholder.com/200x250"
              }
              alt={item.title}
              className="w-full h-56 object-cover rounded-lg"
            />

            {/* TITLE */}
            <h3 className="mt-2 text-sm font-semibold">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slider;

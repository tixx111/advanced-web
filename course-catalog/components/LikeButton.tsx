"use client";

import { useState } from "react";

type LikeButtonProps = {
  initialLikes: number;
};

export default function LikeButton({ initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState<number>(initialLikes);

  return (
    <button
      type="button"
      onClick={() => setLikes((currentLikes) => currentLikes + 1)}
      className="rounded-lg bg-rose-50 px-5 py-3 font-semibold text-rose-600 transition-colors hover:bg-rose-100"
    >
      ❤ {likes}
    </button>
  );
}

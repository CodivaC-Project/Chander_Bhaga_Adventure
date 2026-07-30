"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const Scene3D = dynamic(
  () => import("./Scene3D").then((mod) => ({ default: mod.Scene3D })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white/30 text-sm">Loading 3D scene...</div>
      </div>
    ),
  }
);

export function Scene3DWrapper() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-white/30 text-sm">Loading...</div>
        </div>
      }
    >
      <Scene3D />
    </Suspense>
  );
}

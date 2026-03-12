import React, { useState, useEffect } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";

export default function ExcalidrawViewer({ src }: { src: string }) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load file");
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => {
        console.error("Failed to load Excalidraw data", err);
        setError("Failed to load diagram data.");
      });
  }, [src]);

  if (error) {
    return (
      <div className="bg-surface/50 rounded-2xl h-[500px] w-full flex items-center justify-center text-red-500 border border-border">
        {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="animate-pulse bg-surface/50 rounded-2xl h-[500px] w-full flex items-center justify-center text-foreground/50 border border-border">
        Loading diagram...
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-2xl overflow-hidden border border-border" style={{ height: "600px", width: "100%" }}>
      <Excalidraw
        initialData={{
          elements: data.elements,
          appState: {
            ...data.appState,
            viewBackgroundColor: "transparent",
            theme: "light",
          },
        }}
        viewModeEnabled={true}
        zenModeEnabled={true}
      />
    </div>
  );
}

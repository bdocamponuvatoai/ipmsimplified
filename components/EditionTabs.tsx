"use client";
import { useState, useId, useRef } from "react";
import type { Product } from "@/content/products";
import { ProductMockup } from "@/components/mockups";
export function EditionTabs({ product }: { product: Product }) {
  const [index, setIndex] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const editions = product.editions;
  if (!editions) return null;
  return (
    <div>
      <div
        role="tablist"
        aria-label={`${product.name} editions`}
        className="tabs"
      >
        {editions.map((e, i) => (
          <button
            key={e.name}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            id={`${id}-tab-${i}`}
            aria-controls={`${id}-panel-${i}`}
            aria-selected={index === i}
            tabIndex={index === i ? 0 : -1}
            onClick={() => setIndex(i)}
            onKeyDown={(event) => {
              let target: number;
              if (event.key === "ArrowRight")
                target = (i + 1) % editions.length;
              else if (event.key === "ArrowLeft")
                target = (i + editions.length - 1) % editions.length;
              else if (event.key === "Home") target = 0;
              else if (event.key === "End") target = editions.length - 1;
              else return;
              event.preventDefault();
              setIndex(target);
              tabs.current[target]?.focus();
            }}
          >
            {e.name}
          </button>
        ))}
      </div>
      {editions.map((e, i) => (
        <div
          key={e.name}
          role="tabpanel"
          tabIndex={0}
          id={`${id}-panel-${i}`}
          aria-labelledby={`${id}-tab-${i}`}
          hidden={index !== i}
        >
          <div className="tab-panel">
            <div>
              <h3>{e.name} edition</h3>
              <p>{e.copy}</p>
            </div>
            <ProductMockup product={product.slug} />
          </div>
        </div>
      ))}
    </div>
  );
}

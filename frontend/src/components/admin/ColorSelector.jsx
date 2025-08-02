import { useEffect, useState } from "react";

const primaryColors = [
  { name: "Emerald", hex: "#10b981" },
  { name: "Yellow", hex: "#facc15" },
  { name: "Blue", hex: "#3b82f6" },
  { name: "Red", hex: "#ef4444" },
];

const secondaryColors = [
  { name: "Orange", hex: "#f97316" },
  { name: "Purple", hex: "#8b5cf6" },
  { name: "Green", hex: "#22c55e" },
  { name: "Blue", hex: "#0ea5e9" },
];

export default function ColorSelector({setThemeColors}) {
  const [primary, setPrimary] = useState("#10b981");
  const [secondary, setSecondary] = useState("#f97316");

  useEffect(()=>{
    setThemeColors(primary, secondary)
  }, [primary, secondary])
  return (
    <div className="space-y-6 text-white">
      <div>
        <h3 className="mb-2 font-semibold">Primary Color</h3>
        <div className="flex gap-4">
          {primaryColors.map((color) => (
            <label key={color.hex} className="flex flex-col items-center cursor-pointer">
              <input
                type="radio"
                name="primary"
                value={color.hex}
                checked={primary === color.hex}
                onChange={() => setPrimary(color.hex)}
                className="sr-only"
              />
              <div
                className={`w-10 h-10 rounded-full border-4 ${
                  primary === color.hex ? "border-white" : "border-transparent"
                }`}
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-xs mt-1">{color.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-semibold">Secondary Color</h3>
        <div className="flex gap-4">
          {secondaryColors.map((color) => (
            <label key={color.hex} className="flex flex-col items-center cursor-pointer">
              <input
                type="radio"
                name="secondary"
                value={color.hex}
                checked={secondary === color.hex}
                onChange={() => setSecondary(color.hex)}
                className="sr-only"
              />
              <div
                className={`w-10 h-10 rounded-full border-4 ${
                  secondary === color.hex ? "border-white" : "border-transparent"
                }`}
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-xs mt-1">{color.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

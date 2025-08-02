import React, { useState } from 'react'
import tinycolor from "tinycolor2"
import ColorSelector from './ColorSelector';
import LogoUploader from './LogoUploader';

export const Settings = () => {
    const [logo, setLogo] = useState(null);
    
    function setThemeColors(primaryHex, secondaryHex) {
    const root = document.documentElement;

    // Generate shades from 100 to 900
    for (let i = 1; i <= 9; i++) {
        const lightPct = 100 - i * 10;
        const darkPct = i * 10;

        const primaryShade = tinycolor(primaryHex).lighten(lightPct - 50).toHexString();
        const secondaryShade = tinycolor(secondaryHex).lighten(lightPct - 50).toHexString();

        root.style.setProperty(`--color-primary-${i}00`, primaryShade);
        root.style.setProperty(`--color-secondary-${i}00`, secondaryShade);
    }
    }
    

  return (
    <div>
        <h1 className='bg-primary-600 text-secondary-600 font-semibold text-3xl'>Settings</h1>
        <ColorSelector setThemeColors={setThemeColors}/>
        <LogoUploader setLogo={setLogo} />

        {logo && (
            <div>
            <h3 className="text-white mt-4">Live Brand Preview:</h3>
            <img src={logo} alt="Brand Logo" className="w-32 h-32 object-contain bg-white rounded" />
            </div>
        )}
    </div>
  )
}


export interface SpectrumBand {
  id: string;
  name: string;
  wavelengthMin: number; // in nanometers (use nm for visible, convert for others)
  wavelengthMax: number;
  frequencyRange: string;
  color: string; // CSS color for the band
  description: string;
  isVisible: boolean;
}

export const spectrumBands: SpectrumBand[] = [
  { id: "radio", name: "Radio Waves", wavelengthMin: 1e9, wavelengthMax: 1e12, frequencyRange: "3 kHz – 300 GHz", color: "#94a3b8", description: "WiFi, FM radio, TV signals", isVisible: false },
  { id: "microwave", name: "Microwaves", wavelengthMin: 1e6, wavelengthMax: 1e9, frequencyRange: "300 MHz – 300 GHz", color: "#64748b", description: "Microwave ovens, radar, 5G", isVisible: false },
  { id: "infrared", name: "Infrared", wavelengthMin: 700, wavelengthMax: 1e6, frequencyRange: "300 GHz – 430 THz", color: "#dc2626", description: "TV remotes, heat lamps, thermal cameras", isVisible: false },
  { id: "visible", name: "Visible Light", wavelengthMin: 380, wavelengthMax: 700, frequencyRange: "430 – 790 THz", color: "linear-gradient(90deg, #8b00ff, #0000ff, #00ff00, #ffff00, #ff7f00, #ff0000)", description: "The only light your eyes can detect", isVisible: true },
  { id: "ultraviolet", name: "Ultraviolet", wavelengthMin: 10, wavelengthMax: 380, frequencyRange: "790 THz – 30 PHz", color: "#7c3aed", description: "Sunburns, black lights, bee vision", isVisible: false },
  { id: "xray", name: "X-Rays", wavelengthMin: 0.01, wavelengthMax: 10, frequencyRange: "30 PHz – 30 EHz", color: "#06b6d4", description: "Medical imaging, airport security", isVisible: false },
  { id: "gamma", name: "Gamma Rays", wavelengthMin: 0.0001, wavelengthMax: 0.01, frequencyRange: "> 30 EHz", color: "#14b8a6", description: "Nuclear reactions, cancer treatment", isVisible: false },
];

// Visible light colors mapped to wavelength ranges (for the rainbow gradient)
export const visibleSpectrum: { wavelength: number; color: string }[] = [
  { wavelength: 380, color: "#8b00ff" }, // violet
  { wavelength: 420, color: "#4b0082" }, // indigo
  { wavelength: 450, color: "#0000ff" }, // blue
  { wavelength: 495, color: "#00ff00" }, // green
  { wavelength: 570, color: "#ffff00" }, // yellow
  { wavelength: 590, color: "#ff7f00" }, // orange
  { wavelength: 620, color: "#ff4500" }, // red-orange
  { wavelength: 700, color: "#ff0000" }, // red
];

// The "whoa" stat: visible light as percentage of EM spectrum
export const visibleFraction = 0.0035; // < 0.0035% of the full spectrum

export type SimulationMode = "field" | "demo";

export type BioGTelemetryPayload = {
  device_id: string;
  timestamp: string;
  air_temp_c: number;
  air_humidity_pct: number;
  soil_moisture_pct: number;
  soil_temp_c: number;
  ph: number;
  ec: number;
  resistance: number;
  n: number;
  p: number;
  k: number;
  battery_pct: number;
  signal_rssi: number;
};
import type { BioGTelemetryPayload, SimulationMode } from "./types.js";

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function round(value: number, decimals = 2): number {
  return Number(value.toFixed(decimals));
}

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function calculateDayCurve(date: Date): number {
  const hour = date.getUTCHours() + date.getUTCMinutes() / 60;

  // Pico aproximado a medio día/tarde.
  const radians = ((hour - 6) / 24) * Math.PI * 2;
  return Math.max(0, Math.sin(radians));
}

export function generateTelemetry(
  deviceId: string,
  mode: SimulationMode
): BioGTelemetryPayload {
  const now = new Date();
  const dayCurve = calculateDayCurve(now);

  const demoBoost = mode === "demo" ? 1.8 : 1;

  const airTemp = 19 + dayCurve * 11 + randomBetween(-1.2, 1.2) * demoBoost;
  const soilTemp = 17 + dayCurve * 8 + randomBetween(-0.8, 0.8) * demoBoost;

  const soilMoisture =
    58 - dayCurve * 18 + randomBetween(-2.5, 2.5) * demoBoost;

  const airHumidity =
    72 - dayCurve * 28 + randomBetween(-4, 4) * demoBoost;

  const ec =
    1.1 +
    (60 - soilMoisture) * 0.015 +
    randomBetween(-0.08, 0.08) * demoBoost;

  const resistance =
    0.85 +
    (60 - soilMoisture) * 0.025 +
    randomBetween(-0.08, 0.08) * demoBoost;

  const ph = 6.45 + randomBetween(-0.08, 0.08) * demoBoost;

  const n = 70 + randomBetween(-4, 4) * demoBoost;
  const p = 32 + randomBetween(-2, 2) * demoBoost;
  const k = 88 + randomBetween(-5, 5) * demoBoost;

  const batteryPct = 96 + randomBetween(-1.5, 0);
  const signalRssi = Math.round(randomBetween(-67, -48));

  return {
    device_id: deviceId,
    timestamp: now.toISOString(),
    air_temp_c: round(clamp(airTemp, 18, 34)),
    air_humidity_pct: round(clamp(airHumidity, 35, 80)),
    soil_moisture_pct: round(clamp(soilMoisture, 25, 65)),
    soil_temp_c: round(clamp(soilTemp, 16, 30)),
    ph: round(clamp(ph, 5.8, 7.2), 2),
    ec: round(clamp(ec, 0.8, 2.0), 2),
    resistance: round(clamp(resistance, 0.7, 1.8), 2),
    n: round(clamp(n, 8, 120), 1),
    p: round(clamp(p, 4, 80), 1),
    k: round(clamp(k, 8, 140), 1),
    battery_pct: round(clamp(batteryPct, 0, 100), 1),
    signal_rssi: signalRssi,
  };
}
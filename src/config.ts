import "dotenv/config";
import type { SimulationMode } from "./types.js";

function requiredEnv(name: string): string {
  const value = process.env[name];

  if (!value || value.trim().length === 0) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value.trim();
}

function readSimulationMode(): SimulationMode {
  const value = process.env.SIMULATION_MODE?.trim() ?? "field";

  if (value !== "field" && value !== "demo") {
    throw new Error(`Invalid SIMULATION_MODE: ${value}. Use "field" or "demo".`);
  }

  return value;
}

export const config = {
  supabaseUrl: requiredEnv("SUPABASE_URL"),
  supabaseServiceRoleKey: requiredEnv("SUPABASE_SERVICE_ROLE_KEY"),
  deviceId: requiredEnv("DEVICE_ID"),
  simulationMode: readSimulationMode(),
};
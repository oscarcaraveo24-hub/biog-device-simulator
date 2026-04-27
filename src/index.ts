import { config } from "./config.js";
import { supabase } from "./supabaseClient.js";
import { generateTelemetry } from "./telemetryGenerator.js";

async function main(): Promise<void> {
  const payload = generateTelemetry(config.deviceId, config.simulationMode);

  console.log("BioG simulator sending telemetry...");
  console.log(JSON.stringify(payload, null, 2));

  const { error } = await supabase
    .from("telemetry")
    .insert(payload);

  if (error) {
    console.error("Failed to send telemetry to Supabase:");
    console.error(error);
    process.exit(1);
  }

  console.log("Telemetry sent successfully.");
}

main().catch((error) => {
  console.error("Unexpected simulator error:");
  console.error(error);
  process.exit(1);
});
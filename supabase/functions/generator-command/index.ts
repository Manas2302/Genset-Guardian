
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CommandRequest {
  generatorId: string;
  command: 'start' | 'stop' | 'restart' | 'maintenance_mode';
  metadata?: any;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get the authenticated user
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    
    if (authError || !user) {
      console.error("Authentication error:", authError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized', details: authError?.message }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const requestData = await req.json();
    const { generatorId, command, metadata }: CommandRequest = requestData;

    console.log(`Processing command: ${command} for generator: ${generatorId} by user: ${user.id}`);
    console.log("Request data:", JSON.stringify(requestData));

    // Get generator details
    const { data: generator, error: genError } = await supabaseClient
      .from('generators')
      .select('*')
      .eq('id', generatorId)
      .single();

    if (genError || !generator) {
      console.error("Generator not found error:", genError);
      return new Response(
        JSON.stringify({ error: 'Generator not found', details: genError?.message }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Create command record
    const { data: commandRecord, error: cmdError } = await supabaseClient
      .from('generator_commands')
      .insert({
        generator_id: generatorId,
        user_id: user.id,
        command_type: command,
        command_status: 'executing',
        metadata: metadata || {}
      })
      .select()
      .single();

    if (cmdError) {
      console.error("Command creation error:", cmdError);
      throw cmdError;
    }

    // Simulate command execution delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Determine new status based on command
    let newStatus = generator.status;
    let newPowerKw = generator.current_power_kw;
    let newEfficiency = generator.efficiency_percent;

    switch (command) {
      case 'start':
        if (generator.status === "Standby" || generator.status === "Off") {
          newStatus = "Running";
          newPowerKw = Math.floor(generator.max_power_kw * 0.7);
          newEfficiency = Math.floor(Math.random() * 10 + 85);
        }
        break;
      case 'stop':
        if (generator.status === "Running") {
          newStatus = "Standby";
          newPowerKw = 0;
          newEfficiency = 0;
        }
        break;
      case 'restart':
        newStatus = "Running";
        newPowerKw = Math.floor(generator.max_power_kw * 0.7);
        newEfficiency = Math.floor(Math.random() * 10 + 85);
        break;
      case 'maintenance_mode':
        newStatus = "Maintenance";
        newPowerKw = 0;
        newEfficiency = 0;
        break;
    }

    console.log(`Changing generator status from ${generator.status} to ${newStatus}`);

    // Update generator status
    const { error: updateError } = await supabaseClient
      .from('generators')
      .update({
        status: newStatus,
        current_power_kw: newPowerKw,
        efficiency_percent: newEfficiency,
        updated_at: new Date().toISOString()
      })
      .eq('id', generatorId);

    if (updateError) {
      console.error("Generator update error:", updateError);
      throw updateError;
    }

    // Update command status to completed
    await supabaseClient
      .from('generator_commands')
      .update({
        command_status: 'completed',
        completed_at: new Date().toISOString()
      })
      .eq('id', commandRecord.id);

    // Log the action
    await supabaseClient
      .from('generator_logs')
      .insert({
        generator_id: generatorId,
        user_id: user.id,
        event_type: 'remote_command',
        message: `Remote command '${command}' executed successfully. Generator status changed to '${newStatus}'`,
        severity: 'info',
        metadata: {
          command_id: commandRecord.id,
          old_status: generator.status,
          new_status: newStatus,
          command_type: command
        }
      });

    console.log(`Command ${command} completed successfully for generator ${generatorId}. New status: ${newStatus}`);

    return new Response(
      JSON.stringify({
        success: true,
        commandId: commandRecord.id,
        oldStatus: generator.status,
        newStatus: newStatus,
        message: `Generator ${command} command executed successfully`
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error processing generator command:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

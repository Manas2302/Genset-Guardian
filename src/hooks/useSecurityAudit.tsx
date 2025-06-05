
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export const useSecurityAudit = () => {
  const { user } = useAuth();

  const logSecurityEvent = async (
    action: string,
    resourceType: string,
    resourceId?: string,
    success: boolean = true,
    errorMessage?: string,
    metadata?: any
  ) => {
    if (!user) return;

    try {
      const { error } = await supabase.rpc('log_security_event', {
        _action: action,
        _resource_type: resourceType,
        _resource_id: resourceId || null,
        _success: success,
        _error_message: errorMessage || null,
        _metadata: metadata ? JSON.stringify(metadata) : null
      });

      if (error) {
        console.warn('Failed to log security event:', error);
      }
    } catch (error) {
      console.warn('Security audit logging failed:', error);
    }
  };

  const logGeneratorAccess = (generatorId: string, action: string) => {
    logSecurityEvent(action, 'generator', generatorId);
  };

  const logGeneratorCommand = (generatorId: string, command: string, success: boolean, error?: string) => {
    logSecurityEvent(`generator_${command}`, 'generator_command', generatorId, success, error);
  };

  const logAuthenticationEvent = (action: string, success: boolean, error?: string) => {
    logSecurityEvent(action, 'authentication', undefined, success, error);
  };

  return {
    logSecurityEvent,
    logGeneratorAccess,
    logGeneratorCommand,
    logAuthenticationEvent
  };
};

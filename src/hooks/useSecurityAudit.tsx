
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
    metadata?: Record<string, any>
  ) => {
    if (!user) return;

    try {
      // For now, just log to console since the RPC function doesn't exist
      console.log('Security Event:', {
        action,
        resourceType,
        resourceId,
        success,
        errorMessage,
        metadata,
        userId: user.id,
        timestamp: new Date().toISOString()
      });
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

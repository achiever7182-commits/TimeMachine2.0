import { supabase } from "@/lib/supabase";

export const incidentService = {
  async getIncidents(organizationId: string) {
    const { data, error } = await supabase
      .from("incidents")
      .select("*")
      .eq("organization_id", organizationId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async getIncident(id: string) {
    const { data, error } = await supabase.from("incidents").select("*").eq("id", id).single();

    if (error) throw error;
    return data;
  },

  async updateIncidentStatus(id: string, status: string) {
    const { data, error } = await supabase
      .from("incidents")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

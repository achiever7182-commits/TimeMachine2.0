import { supabase } from "@/lib/supabase";

export const assetService = {
  async getAssets(organizationId: string) {
    const { data, error } = await supabase
      .from("assets")
      .select("*")
      .eq("organization_id", organizationId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async getAsset(id: string) {
    const { data, error } = await supabase.from("assets").select("*").eq("id", id).single();

    if (error) throw error;
    return data;
  },
};

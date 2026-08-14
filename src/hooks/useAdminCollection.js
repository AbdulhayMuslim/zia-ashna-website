"use client";

import { useEffect, useState } from "react";
import { toast } from "@/components/admin/ui/Toast";

export function useAdminCollection(resource) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch(`/api/admin/${resource}`)
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || `Unable to load ${resource}.`);
        return result.data ?? [];
      })
      .then((data) => { if (active) setItems(data); })
      .catch((error) => toast.error(error.message))
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [resource]);

  const remove = async (id) => {
    const response = await fetch(`/api/admin/${resource}/${id}`, { method: "DELETE" });
    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      throw new Error(result.message || `Unable to delete ${resource}.`);
    }
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const replace = (nextItem) => {
    setItems((current) => current.map((item) => item.id === nextItem.id ? nextItem : item));
  };

  return { items, loading, remove, replace };
}

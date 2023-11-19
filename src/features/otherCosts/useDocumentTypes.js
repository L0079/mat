import { useQuery } from "@tanstack/react-query";

import { getDocumentTypes } from "../../services/apiDocumentTypes";

export function useDocumentTypes() {
  const {
    isLoading,
    data: documentTypes,
    error,
  } = useQuery({
    queryKey: ["otherCostsDocTypes"],
    queryFn: () => getDocumentTypes(),
  });

  return { isLoading, error, documentTypes };
}

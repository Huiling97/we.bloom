const PROTECTED_SERVICE_IDS_PROPS = {
  Body: [],
  face: [],
  hair: [],
  'hair removal': [],
  nail: [],
} as const;

export type ProtectedService = keyof typeof PROTECTED_SERVICE_IDS_PROPS;

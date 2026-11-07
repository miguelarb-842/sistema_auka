import type {
  AgrupacionInvitada,
  Personaje,
} from "@/modules/museo/types/museo.types";

export type {
  AgrupacionInvitada,
  Personaje,
} from "@/modules/museo/types/museo.types";

/** Unión de fichas que tienen un chat propio. */
export type FichaConChat = Personaje | AgrupacionInvitada;

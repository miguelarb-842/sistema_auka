import type { PromptChat } from "./prompt.types";

import { agenteSalaMusicaPrompt } from "./agente-sala-musica.prompt";
import { agenteSalaObjetosPrompt } from "./agente-sala-objetos.prompt";
import { agenteSalaRinconPrompt } from "./agente-sala-rincon.prompt";
import { alejandroVegaMatusPrompt } from "./alejandro-vega-matus.prompt";
import { bandaMunicipalPrompt } from "./banda-municipal.prompt";
import { guiaGeneralPrompt } from "./guia-general.prompt";
import { lolitaSorianoPrompt } from "./lolita-soriano.prompt";
import { orquestaSupremosPoderesPrompt } from "./orquesta-supremos-poderes.prompt";

export type { FuentePrompt, PromptChat } from "./prompt.types";
export {
  ETIQUETAS_PERFIL,
  REGLAS_COMUNES,
  formatearFuentes,
  formatearLista,
} from "./prompt.shared";

const PROMPTS: readonly PromptChat[] = [
  guiaGeneralPrompt,
  agenteSalaMusicaPrompt,
  agenteSalaObjetosPrompt,
  agenteSalaRinconPrompt,
  lolitaSorianoPrompt,
  alejandroVegaMatusPrompt,
  orquestaSupremosPoderesPrompt,
  bandaMunicipalPrompt,
];

const registro = new Map(PROMPTS.map((prompt) => [prompt.id, prompt]));

export function obtenerPromptChat(id: string): PromptChat | undefined {
  return registro.get(id);
}

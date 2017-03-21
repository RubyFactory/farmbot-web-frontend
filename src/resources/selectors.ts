import { ResourceIndex } from "./interfaces";
import { joinKindAndId } from "./reducer";
import {
  ResourceName,
  TaggedFarmEvent,
  TaggedResource,
  TaggedPoint,
  TaggedPlant,
  TaggedTool,
  TaggedToolSlot,
  TaggedImage,
  TaggedRegimen,
  TaggedSequence,
  isTaggedSequence,
  isTaggedRegimen,
  TaggedToolBay
} from "./tagged_resources";
import { selectAll } from "./util";
import { CowardlyDictionary } from "../util";

export let findUuid = (index: ResourceIndex, kind: ResourceName, id: number) => {
  return index.byKindAndId[joinKindAndId(kind, id)];
}

export function findResourceById(index: ResourceIndex, kind: ResourceName,
  id: number) {
  let uuid = findUuid(index, kind, id);
  return uuid && index.references[uuid];
}

export let isKind = (name: ResourceName) =>
  (tr: TaggedResource) => tr.kind === name;

function findAll(index: ResourceIndex, name: ResourceName) {
  return selectAll(index, name).filter(isKind(name));
}

export function selectAllFarmEvents(index: ResourceIndex) {
  return findAll(index, "farm_events") as TaggedFarmEvent[];
}

export function selectAllPoints(index: ResourceIndex) {
  return findAll(index, "points") as TaggedPoint[];
}

export function selectAllPlants(index: ResourceIndex) {
  return findAll(index, "plants") as TaggedPlant[];
}

export function selectAllTools(index: ResourceIndex) {
  return findAll(index, "tools") as TaggedTool[];
}

export function selectAllToolSlots(index: ResourceIndex) {
  return findAll(index, "tool_slots") as TaggedToolSlot[];
}

export function findToolSlot(index: ResourceIndex, toolSlotId: string) {
  if (!toolSlotId.startsWith("tool_slot")) {
    console.log("This is bad news. - March 21st");
  }
  return index.references[toolSlotId];
}

export function selectCurrentToolSlot(index: ResourceIndex, toolSlotId: number) {
  return index.references[toolSlotId];
}

export function selectAllToolBays(index: ResourceIndex) {
  return findAll(index, "tool_bays") as TaggedToolBay[];
}

export function selectAllImages(index: ResourceIndex) {
  return findAll(index, "images") as TaggedImage[];
}

export function selectAllRegimens(index: ResourceIndex) {
  return findAll(index, "regimens") as TaggedRegimen[];
}

export function selectAllSequences(index: ResourceIndex) {
  return findAll(index, "sequences") as TaggedSequence[];
}

export function indexBySequenceId(index: ResourceIndex) {
  let output: CowardlyDictionary<TaggedSequence> = {};
  let uuids = index.byKind.sequences;
  uuids.map(uuid => {
    let sequence = index.references[uuid];
    if (isTaggedSequence(sequence) && sequence.body.id) {
      output[sequence.body.id] = sequence;
    }
  });
  return output;
}

export function indexByRegimenId(index: ResourceIndex) {
  let output: CowardlyDictionary<TaggedRegimen> = {};
  let uuids = index.byKind.sequences;
  uuids.map(uuid => {
    let regimen = index.references[uuid];
    if (isTaggedRegimen(regimen) && regimen.body.id) {
      output[regimen.body.id] = regimen;
    }
  });
  return output;
}
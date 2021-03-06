import { Everything } from "../interfaces";
import { Props } from "./interfaces";
import { TaggedPlantPointer } from "../resources/tagged_resources";
import {
  selectAllGenericPointers,
  selectAllPlantPointers,
  selectAllCrops,
  joinToolsAndSlot,
  findPlant
} from "../resources/selectors";

// ehhh...
export interface TPPWithDispatch extends TaggedPlantPointer {
  dispatch: Function;
}

export function mapStateToProps(props: Everything): Props {

  let plants = selectAllPlantPointers(props.resources.index);
  let selectedPlant = plants
    .filter(x => x.uuid === props
      .resources
      .consumers
      .farm_designer
      .selectedPlant)[0];
  let { plantUUID } = props.resources.consumers.farm_designer.hoveredPlant;
  let hoveredPlant = plantUUID ?
    findPlant(props.resources.index, plantUUID) : undefined;
  return {
    crops: selectAllCrops(props.resources.index),
    dispatch: props.dispatch,
    selectedPlant,
    designer: props.resources.consumers.farm_designer,
    points: selectAllGenericPointers(props.resources.index),
    toolSlots: joinToolsAndSlot(props.resources.index),
    hoveredPlant,
    plants
  };
}

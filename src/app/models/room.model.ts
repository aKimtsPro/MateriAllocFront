import {MaterialDTO} from "./request.model";

export interface RoomDTO {
  id: number,
  number: number,
  capacity: number,
  studentAccess: boolean,
  materials: MaterialDTO[]
}

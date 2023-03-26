

export interface ReducedRequestDTO {
  id: number;
  date: string;
  beginTime: string;
  endTime: string;
  neededCapacity: number;
  currentStatus: RequestStatus;
  madeBy: string;
  roomNumber?: number;
  materials: MaterialDTO[];
}

export interface MaterialDTO {
  id: number;
  name: string;
}

export enum RequestStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  RELOCATING = "RELOCATING",
  REFUSED = "REFUSED"
}

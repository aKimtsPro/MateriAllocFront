
export class Request {

  private constructor(
    private _id: number,
    private _begin: Date,
    private _end: Date,
    private _neededCapacity: number,
    private _currentStatus: RequestStatus,
    private _madeBy: string,
    private _materials: MaterialDTO[],
    private _roomNumber?: number
  ){
  }

  static from(request: ReducedRequestDTO) {
    return new Request(
      request.id,
      new Date( request.date + 'T'+ request.beginTime ),
      new Date( request.date + 'T'+ request.endTime ),
      request.neededCapacity,
      request.currentStatus,
      request.madeBy,
      request.materials,
      request.roomNumber
    )
  }


  get id(): number {
    return this._id;
  }

  get begin(): Date {
    return this._begin;
  }

  get end(): Date {
    return this._end;
  }

  get neededCapacity(): number {
    return this._neededCapacity;
  }

  get currentStatus(): RequestStatus {
    return this._currentStatus;
  }

  get madeBy(): string {
    return this._madeBy;
  }

  get materials(): MaterialDTO[] {
    return this._materials;
  }

  get roomNumber(): number | undefined {
    return this._roomNumber;
  }
}

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



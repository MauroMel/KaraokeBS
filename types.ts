
export enum RequestStatus {
  IN_ATTESA = "IN_ATTESA",
  PROSSIMO = "PROSSIMO",
  SUL_PALCO = "SUL_PALCO"
}

export interface KaraokeEvent {
  id: string;
  name: string;
  eventCode: string;
  isActive: boolean;
  createdAt: any;
  songMinutes: number;
}

export interface SongRequest {
  id: string;
  nickname: string;
  songTitle: string;
  keyShift: number;
  status: RequestStatus;
  createdAt: any;
}

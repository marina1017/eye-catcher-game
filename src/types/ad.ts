export type AdType = 'popup' | 'inline' | 'overlay' | 'floating';

export interface Ad {
  id: number;
  type: AdType;
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
}

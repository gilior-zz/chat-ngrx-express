export interface Uistate {
  userId: number;
  threadId: number;
  currentError?: string;
}

export const INIT_UI_STATE: Uistate = {
  userId: undefined,
  threadId: undefined
};

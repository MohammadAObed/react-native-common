export type ActionType<ActionName extends string, Param = {}> = DispatchActionFor<ActionName> & Param;

type DispatchActionFor<ActionName extends string> = { type: ActionName } & Record<string, unknown>;

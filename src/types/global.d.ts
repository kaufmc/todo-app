export type Todo = {
  created_at: Date;
  text: any; //TODO: figure out async handling to be able to set this to type string
  done: boolean;
};

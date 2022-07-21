import type { RequestEvent, RequestHandler } from "@sveltejs/kit";
import {api} from './_api';

export let DELETE: RequestHandler = (event: RequestEvent) =>{
  return api(event)
}


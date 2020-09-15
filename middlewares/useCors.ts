import { NowRequest, NowResponse } from '@vercel/node';
import Cors from 'cors';

type Options = {
  methods?: Array<string>
}

export default function useCors(req: NowRequest, res: NowResponse, options: Options = {}): void {
  const {
    methods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  } = options;

  Cors({ methods })(req, res, (result) => {
    if (result instanceof Error) {
      throw result;
    }
  });
}

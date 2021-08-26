// Next.js API route support: https://nextjs.org/docs/basic-features/typescript#api-routes
import type { NextApiRequest, NextApiResponse } from 'next'

export default function hello (req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ name: 'John Doe' })
}

import type { NextApiRequest, NextApiResponse } from 'next'

import { tmdbService } from '../../../../services/tmdb'

export default async function getGenres (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { type } = req.query
    const response = await tmdbService.getGenres({ type: String(type) })

    return res.status(200).json({ ...response.data })
  } catch (error) {
    const code = error?.response?.status

    return res.status(code).json({
      code,
      statusText: error?.response?.statusText || '',
      error: error?.response?.data?.status_message || ''
    })
  }
}
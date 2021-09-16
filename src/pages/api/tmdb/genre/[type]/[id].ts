import type { NextApiRequest, NextApiResponse } from 'next'

import { tmdbService } from '../../../../../services/tmdb'

export default async function getGenreById (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { type, id, page = 1 } = req.query

    const response = await tmdbService.getGenreById({
      type: String(type),
      id: String(id),
      page: Number(page)
    })

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

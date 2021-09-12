import type { NextApiRequest, NextApiResponse } from 'next'

import { tmdbService } from '../../../services/tmdb'

export default async function multiSearch (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { query, page = 1 } = req.query

    if (!query) {
      return res.status(400).json({
        code: 400,
        statusText: 'Bad Request',
        error: 'query param is required'
      })
    }

    const response = await tmdbService.search({
      query: String(query),
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

export const movies = Array.from({ length: 20 }).map((_, index) => {
  return {
    id: index + 1,
    title: 'Movie title',
    image: 'https://occ-0-626-1123.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABQ1n7nMsHQU4eAT8s7OtRNBTkRt8KcVP9M0q5ZnZRppX0WwulOFBD6wHx0U4pOga86psNHvwzBvJah7ey3BpIgbMOeE.webp?r=252'
  }
})

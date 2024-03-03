const ROLES = {
  admin: ['admin'], 
  author: ['author'],
  participant: ['participant'],
  atp: ['admin', 'author', 'participant'],
  tp: ['author', 'participant'],
  at: ['admin', 'author'],
}

export default ROLES
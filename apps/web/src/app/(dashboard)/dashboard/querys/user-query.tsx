export async function getUser() {
  const response = localStorage.getItem('@dabliw:user')

  return response
}

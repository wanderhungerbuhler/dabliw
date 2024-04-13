export async function getPostalCodeMutation(postalCode: string) {
  const response = await fetch(`https://viacep.com.br/ws/${postalCode}/json/`)

  return response
}

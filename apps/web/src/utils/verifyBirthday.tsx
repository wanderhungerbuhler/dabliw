export function verifyBirthday(birthdayDate: Date) {
  const today = new Date()

  const birthday = new Date(birthdayDate)

  const nextBirthday = new Date(
    today.getFullYear(),
    birthday.getMonth(),
    birthday.getDate(),
  )

  if (today > nextBirthday) {
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1)
  }

  const difference = nextBirthday.getTime() - today.getTime()

  const restDay = Math.ceil(difference / (1000 * 60 * 60 * 24))

  if (
    nextBirthday.getMonth() === today.getMonth() &&
    nextBirthday.getDate() === today.getDate()
  ) {
    return 'Happy Birthday! 🎉'
  } else if (restDay === 1) {
    return 'Your birthday is tomorrow!'
  } else {
    const mesesFaltando =
      nextBirthday.getMonth() -
      today.getMonth() +
      12 * (nextBirthday.getFullYear() - today.getFullYear())

    if (mesesFaltando === 0) {
      return `${restDay} days left for your birthday!`
    }

    return `${mesesFaltando} months left for your birthday!`
  }
}

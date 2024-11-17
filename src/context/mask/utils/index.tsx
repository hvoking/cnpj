export const getColor: any = (cnpjProperties: any, labelName: any) => {
  const currentKey: any = Object.keys(cnpjProperties).find(
    key => cnpjProperties[key].label === labelName
  )
  if (cnpjProperties[currentKey]) {
    return cnpjProperties[currentKey].color
  }
  return "rgba(255, 255, 255, 0)"
}

export const getLabel: any = (cnpjProperties: any, labelName: any) => {
  const currentKey: any = Object.keys(cnpjProperties).find(
    key => cnpjProperties[key].label === labelName
  )
  if (cnpjProperties[currentKey]) {
    return currentKey
  }
  return false
}